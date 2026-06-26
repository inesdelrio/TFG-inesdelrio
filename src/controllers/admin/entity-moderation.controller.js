const getAdminDashboardSummary = require("../../services/admin/get-admin-dashboard-summary.service");
const listAdminEntities = require("../../services/admin/list-admin-entities.service");
const listAdminPublications = require("../../services/admin/list-admin-publications.service");
const listAdminUsers = require("../../services/admin/list-admin-users.service");
const getEntityReviewDetail = require("../../services/admin/get-entity-review-detail.service");
const updateEntityValidationStatus = require("../../services/admin/update-entity-validation-status.service");
const withdrawEventPublication = require("../../services/admin/withdraw-event-publication.service");

async function renderAdminDashboard(req, res, next) {
  try {
    const summary = await getAdminDashboardSummary();

    return res.render("pages/admin/dashboard", {
      pageTitle: "Panel de administracion",
      summary,
      infoMessage:
        req.query.updated === "1"
          ? "El estado de la entidad se ha actualizado correctamente."
          : null,
    });
  } catch (error) {
    return next(error);
  }
}

async function renderAdminEntitiesList(req, res, next, dependencies = {}) {
  const loadAdminEntities = dependencies.listAdminEntities || listAdminEntities;

  try {
    const result = await loadAdminEntities({
      status: req.query.status,
    });

    return res.render("pages/admin/entities-list", {
      pageTitle: "Entidades",
      entities: result.entities,
      selectedStatus: result.selectedStatus,
      statusOptions: result.statusOptions,
      infoMessage:
        req.query.updated === "1"
          ? "El estado de la entidad se ha actualizado correctamente."
          : null,
    });
  } catch (error) {
    return next(error);
  }
}

async function renderAdminUsersList(req, res, next) {
  try {
    const users = await listAdminUsers();

    return res.render("pages/admin/users-list", {
      pageTitle: "Usuarios registrados",
      users,
    });
  } catch (error) {
    return next(error);
  }
}

async function renderAdminPublicationsList(req, res, next) {
  try {
    const publications = await listAdminPublications();

    return res.render("pages/admin/publications-list", {
      pageTitle: "Publicaciones",
      publications,
      infoMessage:
        req.query.withdrawn === "1"
          ? "La publicacion se ha retirado correctamente."
          : null,
    });
  } catch (error) {
    return next(error);
  }
}

async function renderEntityReviewDetail(req, res, next, dependencies = {}) {
  const loadEntityReviewDetail =
    dependencies.getEntityReviewDetail || getEntityReviewDetail;

  try {
    const entity = await loadEntityReviewDetail(Number(req.params.entityId));

    if (!entity) {
      return res.status(404).render("pages/errors/404", {
        pageTitle: "Entidad no encontrada",
      });
    }

    return res.render("pages/admin/entity-detail", {
      pageTitle: `Revision de ${entity.organizationName}`,
      entity,
      errors: {},
      infoMessage:
        req.query.updated === "1"
          ? "El estado de la entidad se ha actualizado correctamente."
          : null,
    });
  } catch (error) {
    return next(error);
  }
}

async function updateEntityStatus(req, res, next, dependencies = {}) {
  const updateEntityStatusService =
    dependencies.updateEntityValidationStatus || updateEntityValidationStatus;
  const loadEntityReviewDetail =
    dependencies.getEntityReviewDetail || getEntityReviewDetail;
  const entityId = Number(req.params.entityId);
  const nextStatus = typeof req.body.nextStatus === "string" ? req.body.nextStatus : "";
  const notes = typeof req.body.notes === "string" ? req.body.notes.trim() : "";

  try {
    await updateEntityStatusService({
      adminUserId: req.currentUser.id,
      entityId,
      nextStatus,
      notes,
    });

    return res.redirect(`/admin/entidades/${entityId}?updated=1`);
  } catch (error) {
    if (error.code === "INVALID_ENTITY_STATUS_TRANSITION") {
      try {
        const entity = await loadEntityReviewDetail(entityId);

        return res.status(422).render("pages/admin/entity-detail", {
          pageTitle: entity ? `Revision de ${entity.organizationName}` : "Revision de entidad",
          entity,
          errors: {
            nextStatus: "Selecciona un estado valido para la revision administrativa.",
          },
          infoMessage: null,
        });
      } catch (detailError) {
        return next(detailError);
      }
    }

    if (error.code === "ENTITY_NOT_FOUND") {
      return res.status(404).render("pages/errors/404", {
        pageTitle: "Entidad no encontrada",
      });
    }

    return next(error);
  }
}

async function withdrawEventPublicationAction(req, res, next) {
  try {
    await withdrawEventPublication({
      adminUserId: req.currentUser.id,
      eventId: Number(req.params.eventId),
      notes: typeof req.body.notes === "string" ? req.body.notes.trim() : "",
    });

    return res.redirect("/admin/publicaciones?withdrawn=1");
  } catch (error) {
    if (error.code === "EVENT_NOT_FOUND") {
      return res.status(404).render("pages/errors/404", {
        pageTitle: "Evento no encontrado",
      });
    }

    return next(error);
  }
}

module.exports = {
  renderAdminEntitiesList,
  renderAdminDashboard,
  renderAdminPublicationsList,
  renderAdminUsersList,
  renderEntityReviewDetail,
  updateEntityStatus,
  withdrawEventPublicationAction,
};
