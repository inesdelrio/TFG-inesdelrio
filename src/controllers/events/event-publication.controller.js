const prisma = require("../../config/prisma");
const createEvent = require("../../services/events/create-event.service");
const getEventDetail = require("../../services/events/get-event-detail.service");
const getEventRegistrationStatus = require("../../services/events/get-event-registration-status.service");
const listOwnedEventRegistrations = require("../../services/events/list-owned-event-registrations.service");
const getEntitySubscriptionStatus = require("../../services/entities/get-entity-subscription-status.service");
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
      if (
        error.code === "ENTITY_NOT_VERIFIED_FOR_PUBLISHING" ||
        error.code === "ENTITY_SUSPENDED_FOR_PUBLISHING"
      ) {
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
      if (
        error.code === "ENTITY_NOT_VERIFIED_FOR_PUBLISHING" ||
        error.code === "ENTITY_SUSPENDED_FOR_PUBLISHING"
      ) {
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
        infoTitle:
          req.query.created === "1"
            ? "Evento publicado."
            : req.query.updated === "1" || req.query.deleted === "1"
              ? "Evento actualizado."
              : req.query.registered === "1" || req.query.cancelled === "1"
                ? "Inscripcion actualizada."
                : null,
        infoMessage:
          req.query.created === "1"
            ? "El evento se ha publicado correctamente y ya aparece en el listado general."
          : req.query.updated === "1"
            ? "El evento se ha actualizado correctamente."
            : req.query.deleted === "1"
              ? "El evento se ha eliminado correctamente."
              : req.query.registered === "1"
                ? "Te has inscrito correctamente."
                : req.query.cancelled === "1"
                  ? "Has cancelado tu inscripcion."
            : null,
    });
  } catch (error) {
    return next(error);
  }
}

async function renderEventDetail(req, res, next, dependencies = {}) {
  const loadEventDetail = dependencies.getEventDetail || getEventDetail;
  const loadOwnedEventRegistrations =
    dependencies.listOwnedEventRegistrations || listOwnedEventRegistrations;
  const loadEntitySubscriptionStatus =
    dependencies.getEntitySubscriptionStatus || getEntitySubscriptionStatus;
  const loadEventRegistrationStatus =
    dependencies.getEventRegistrationStatus || getEventRegistrationStatus;

  try {
    const event = await loadEventDetail(Number(req.params.eventId));

    if (!event) {
      return res.status(404).render("pages/errors/404", {
        pageTitle: "Evento no encontrado",
      });
    }

    const isVolunteer = req.currentUser && req.currentUser.role === "VOLUNTARIO";
    const isEntity = req.currentUser && req.currentUser.role === "ENTIDAD";
    let registrations = null;

    if (isEntity) {
      try {
        const result = await loadOwnedEventRegistrations({
          userId: req.currentUser.id,
          eventId: event.id,
        });
        registrations = result.registrations;
      } catch (error) {
        if (error.code !== "EVENT_NOT_OWNED_BY_ENTITY") {
          throw error;
        }
      }
    }

    const isSubscribed = isVolunteer
      ? await loadEntitySubscriptionStatus({
          volunteerUserId: req.currentUser.id,
          entityId: event.entity.id,
        })
      : false;
    const isRegistered = isVolunteer
      ? await loadEventRegistrationStatus({
          volunteerUserId: req.currentUser.id,
          eventId: event.id,
        })
      : false;
    const availableSlots = Math.max(0, event.totalSlots - event._count.registrations);

    return res.render("pages/events/detail", {
      pageTitle: event.title,
      event,
      availableSlots,
      registrations,
      canSubscribe: isVolunteer,
      isSubscribed,
        canRegister: isVolunteer,
        isRegistered,
        redirectBackToEventsOnBack: req.query.backToEvents === "1",
        redirectBackToNotificationsOnBack:
          req.query.backToNotifications === "1",
        infoMessage:
        req.query.subscribed === "1"
          ? "Te has suscrito correctamente a esta entidad."
          : req.query.alreadySubscribed === "1"
            ? "Ya estabas suscrito a esta entidad."
            : req.query.unsubscribed === "1"
              ? "Has dejado de seguir a esta entidad."
              : req.query.registered === "1"
                ? "Te has inscrito correctamente en esta actividad."
                : req.query.alreadyRegistered === "1"
                  ? "Ya estabas inscrito en esta actividad."
                  : req.query.cancelled === "1"
                    ? "Has cancelado tu inscripcion correctamente."
                    : req.query.notRegistered === "1"
                      ? "No existia una inscripcion activa para cancelar."
                      : req.query.full === "1"
                        ? "No quedan plazas disponibles para esta actividad."
                        : req.query.inactive === "1"
                          ? "La actividad ya no admite nuevas inscripciones."
            : null,
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
