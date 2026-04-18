const listPendingEntities = require("../../services/admin/list-pending-entities.service");
const getEntityReviewDetail = require("../../services/admin/get-entity-review-detail.service");
const updateEntityValidationStatus = require("../../services/admin/update-entity-validation-status.service");

async function renderPendingEntitiesList(req, res, next) {
  try {
    const entities = await listPendingEntities();

    return res.render("pages/admin/entities-list", {
      pageTitle: "Entidades pendientes",
      entities,
      infoMessage:
        req.query.updated === "1"
          ? "El estado de la entidad se ha actualizado correctamente."
          : null,
    });
  } catch (error) {
    return next(error);
  }
}

async function renderEntityReviewDetail(req, res, next) {
  try {
    const entity = await getEntityReviewDetail(Number(req.params.entityId));

    if (!entity) {
      return res.status(404).render("pages/errors/404", {
        pageTitle: "Entidad no encontrada",
      });
    }

    return res.render("pages/admin/entity-detail", {
      pageTitle: `Revision de ${entity.organizationName}`,
      entity,
      errors: {},
    });
  } catch (error) {
    return next(error);
  }
}

async function updateEntityStatus(req, res, next) {
  const entityId = Number(req.params.entityId);
  const nextStatus = typeof req.body.nextStatus === "string" ? req.body.nextStatus : "";
  const notes = typeof req.body.notes === "string" ? req.body.notes.trim() : "";

  try {
    await updateEntityValidationStatus({
      adminUserId: req.currentUser.id,
      entityId,
      nextStatus,
      notes,
    });

    return res.redirect("/admin/area?updated=1");
  } catch (error) {
    if (error.code === "INVALID_ENTITY_STATUS_TRANSITION") {
      try {
        const entity = await getEntityReviewDetail(entityId);

        return res.status(422).render("pages/admin/entity-detail", {
          pageTitle: entity ? `Revision de ${entity.organizationName}` : "Revision de entidad",
          entity,
          errors: {
            nextStatus: "Selecciona un estado valido para la revision administrativa.",
          },
        });
      } catch (detailError) {
        return next(detailError);
      }
    }

    return next(error);
  }
}

module.exports = {
  renderEntityReviewDetail,
  renderPendingEntitiesList,
  updateEntityStatus,
};
