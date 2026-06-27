function getRedirectPathForRole(role) {
  switch (role) {
    case "ADMIN":
      return "/admin/perfil";
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
