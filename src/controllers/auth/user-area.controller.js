function renderVolunteerArea(req, res) {
  return res.render("pages/volunteers/area", {
    pageTitle: "Area del voluntario",
  });
}

function renderEntityArea(req, res) {
  return res.render("pages/auth/role-area", {
    pageTitle: "Area de entidad",
    areaTitle: "Area de entidad",
    areaDescription: "Zona reservada para cuentas con rol ENTIDAD.",
  });
}

function renderAdminArea(req, res) {
  return res.render("pages/auth/role-area", {
    pageTitle: "Area de administracion",
    areaTitle: "Area de administracion",
    areaDescription: "Zona reservada para cuentas con rol ADMIN.",
  });
}

module.exports = {
  renderAdminArea,
  renderEntityArea,
  renderVolunteerArea,
};
