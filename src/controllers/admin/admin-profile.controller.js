async function renderAdminProfile(req, res, next) {
  try {
    return res.render("pages/admin/profile", {
      pageTitle: "Perfil de administrador",
      admin: req.currentUser,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  renderAdminProfile,
};
