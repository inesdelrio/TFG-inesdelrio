function notFoundHandler(req, res) {
  res.status(404).render("pages/errors/404", {
    pageTitle: "Pagina no encontrada",
  });
}

function errorHandler(err, req, res, next) {
  console.error(err);

  res.status(500).render("pages/errors/500", {
    pageTitle: "Error interno",
    errorMessage:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Se ha producido un error interno inesperado.",
  });
}

module.exports = {
  errorHandler,
  notFoundHandler,
};
