function getRedirectPathForRole(role) {
  switch (role) {
    case "ADMIN":
      return "/admin/area";
    case "ENTIDAD":
      return "/entidad/area";
    case "VOLUNTARIO":
    default:
      return "/voluntariado/area";
  }
}

module.exports = {
  getRedirectPathForRole,
};
