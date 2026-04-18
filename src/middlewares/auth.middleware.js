const { getRedirectPathForRole } = require("../utils/auth-redirect");

function requireAuth(req, res, next) {
  if (!req.currentUser) {
    return res.redirect("/login");
  }

  return next();
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

module.exports = {
  requireAuth,
  requireRole,
};
