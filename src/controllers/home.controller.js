const prisma = require("../config/prisma");

function renderHome(req, res) {
  res.render("pages/home/index", {
    pageTitle: "Inicio",
    dbStatus: null,
  });
}

async function renderDbCheck(req, res) {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.render("pages/home/index", {
      pageTitle: "Inicio",
      dbStatus: {
        ok: true,
        message: "Conexion con PostgreSQL y Prisma operativa.",
      },
    });
  } catch (error) {
    res.status(503).render("pages/home/index", {
      pageTitle: "Inicio",
      dbStatus: {
        ok: false,
        message: `No se ha podido conectar con la base de datos: ${error.message}`,
      },
    });
  }
}

function getHealth(req, res) {
  res.status(200).json({
    ok: true,
    service: "tfg-voluntariado",
    timestamp: new Date().toISOString(),
  });
}

module.exports = {
  getHealth,
  renderDbCheck,
  renderHome,
};
