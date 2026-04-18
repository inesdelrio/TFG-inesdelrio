const prisma = require("../../config/prisma");

function renderVolunteerArea(req, res) {
  return res.render("pages/volunteers/area", {
    pageTitle: "Area del voluntario",
  });
}

async function renderEntityArea(req, res, next) {
  try {
    const entity = await prisma.entity.findUnique({
      where: {
        requestedByUserId: req.currentUser.id,
      },
    });

    return res.render("pages/entities/area", {
      pageTitle: "Area de entidad",
      entity,
      requestCreated: req.query.requested === "1",
    });
  } catch (error) {
    return next(error);
  }
}

function renderAdminArea(req, res) {
  return res.redirect("/admin/area");
}

module.exports = {
  renderAdminArea,
  renderEntityArea,
  renderVolunteerArea,
};
