const prisma = require("../../config/prisma");
const createEvent = require("../../services/events/create-event.service");
const getEventDetail = require("../../services/events/get-event-detail.service");
const listPublishedEvents = require("../../services/events/list-published-events.service");
const { getCurrentEntityId } = require("./event-management.controller");
const {
  assertEntityCanPublishEvents,
} = require("../../services/entities/entity-publication-access.service");
const { validateEventFilters } = require("../../validators/events/event-filters.validator");
const { validateEventInput } = require("../../validators/events/event.validator");

function buildCreateViewModel(overrides = {}) {
  return {
    pageTitle: "Publicar evento",
    formData: {
      title: "",
      description: "",
      city: "",
      address: "",
      eventDate: "",
      eventTime: "",
      totalSlots: "",
    },
    errors: {},
    blockedReason: null,
    entity: null,
    ...overrides,
  };
}

async function renderEventCreationForm(req, res, next) {
  try {
    const entity = await prisma.entity.findUnique({
      where: {
        requestedByUserId: req.currentUser.id,
      },
    });

    try {
      assertEntityCanPublishEvents(entity);
    } catch (error) {
      if (error.code === "ENTITY_NOT_VERIFIED_FOR_PUBLISHING") {
        return res.status(403).render(
          "pages/events/create",
          buildCreateViewModel({
            entity,
            blockedReason:
              "Solo las entidades verificadas pueden publicar eventos. Revisa el estado actual de validacion en tu area de entidad.",
          }),
        );
      }

      throw error;
    }

    return res.render(
      "pages/events/create",
      buildCreateViewModel({
        entity,
      }),
    );
  } catch (error) {
    return next(error);
  }
}

async function publishEvent(req, res, next) {
  const { sanitizedData, errors } = validateEventInput(req.body);

  try {
    const entity = await prisma.entity.findUnique({
      where: {
        requestedByUserId: req.currentUser.id,
      },
    });

    try {
      assertEntityCanPublishEvents(entity);
    } catch (error) {
      if (error.code === "ENTITY_NOT_VERIFIED_FOR_PUBLISHING") {
        return res.status(403).render(
          "pages/events/create",
          buildCreateViewModel({
            entity,
            formData: sanitizedData,
            blockedReason:
              "Solo las entidades verificadas pueden publicar eventos. Revisa el estado actual de validacion antes de volver a intentarlo.",
          }),
        );
      }

      throw error;
    }

    if (Object.keys(errors).length > 0) {
      return res.status(422).render(
        "pages/events/create",
        buildCreateViewModel({
          entity,
          formData: sanitizedData,
          errors,
        }),
      );
    }

    await createEvent({
      userId: req.currentUser.id,
      title: sanitizedData.title,
      description: sanitizedData.description,
      city: sanitizedData.city,
      address: sanitizedData.address,
      eventDate: sanitizedData.eventDate,
      eventTime: sanitizedData.eventTime,
      totalSlots: sanitizedData.totalSlots,
    });

    return res.redirect("/eventos?created=1");
  } catch (error) {
    return next(error);
  }
}

async function renderPublicEventsList(req, res, next) {
  try {
    const requestedPage = Number.parseInt(req.query.page, 10);
    const page = Number.isNaN(requestedPage) ? 1 : requestedPage;
    const filters = validateEventFilters(req.query);
    const result = await listPublishedEvents({
      page,
      pageSize: 6,
      filters,
    });
    const currentEntityId = await getCurrentEntityId(req);

    return res.render("pages/events/index", {
      pageTitle: "Eventos",
      events: result.events,
      pagination: result.pagination,
      currentEntityId,
      filters,
      hasActiveFilters: Object.values(filters).some(Boolean),
      infoMessage:
        req.query.created === "1"
          ? "El evento se ha publicado correctamente y ya aparece en el listado general."
          : req.query.updated === "1"
            ? "El evento se ha actualizado correctamente."
            : req.query.deleted === "1"
              ? "El evento se ha eliminado correctamente."
          : null,
    });
  } catch (error) {
    return next(error);
  }
}

async function renderEventDetail(req, res, next) {
  try {
    const event = await getEventDetail(Number(req.params.eventId));

    if (!event) {
      return res.status(404).render("pages/errors/404", {
        pageTitle: "Evento no encontrado",
      });
    }

    return res.render("pages/events/detail", {
      pageTitle: event.title,
      event,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  publishEvent,
  renderEventDetail,
  renderEventCreationForm,
  renderPublicEventsList,
};
