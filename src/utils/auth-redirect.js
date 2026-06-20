function getRedirectPathForRole(role) {
  switch (role) {
    case "ADMIN":
      return "/admin/area";
    case "ENTIDAD":
      return "/entidad/perfil";
    case "VOLUNTARIO":
    default:
      return "/voluntariado/perfil";
  }
}

module.exports = {
  getRedirectPathForRole,
};
