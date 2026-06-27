const prisma = require("../config/prisma");
const { destroyUserSession } = require("../services/auth/session.service");
const {
  isDeletedUserAccount,
} = require("../services/accounts/account-anonymization");
const { getRedirectPathForRole } = require("../utils/auth-redirect");

async function requireAuth(req, res, next, dependencies = {}) {
  if (!req.currentUser) {
    return res.redirect("/login");
  }

  const prismaClient = dependencies.prisma || prisma;
  const destroySession =
    dependencies.destroyUserSession || destroyUserSession;

  try {
    const currentUser = await prismaClient.user.findUnique({
      where: {
        id: req.currentUser.id,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
      },
    });

    if (!currentUser || isDeletedUserAccount(currentUser)) {
      return destroySession(req, (error) => {
        if (error) {
          return next(error);
        }

        return res.redirect("/login");
      });
    }

    req.currentUser = currentUser;
    req.session.user = currentUser;
    res.locals.currentUser = currentUser;
    return next();
  } catch (error) {
    return next(error);
  }
}

function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.currentUser) {
      return res.redirect("/login");
    }

    if (!allowedRoles.includes(req.currentUser.role)) {
      return res.redirect(getRedirectPathForRole(req.currentUser.role));
    }

    return next();
  };
}

function requireVerifiedEntity(dependencies = {}) {
  return async (req, res, next) => {
    if (!req.currentUser) {
      return res.redirect("/login");
    }

    if (req.currentUser.role !== "ENTIDAD") {
      return res.redirect(getRedirectPathForRole(req.currentUser.role));
    }

    const prismaClient = dependencies.prisma || prisma;

    try {
      const entity = await prismaClient.entity.findUnique({
        where: {
          requestedByUserId: req.currentUser.id,
        },
        select: {
          validationStatus: true,
        },
      });

      if (!entity || entity.validationStatus !== "VERIFICADA") {
        return res.redirect("/entidad/estado");
      }

      return next();
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = {
  requireAuth,
  requireRole,
  requireVerifiedEntity,
};
