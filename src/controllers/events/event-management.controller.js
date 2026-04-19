const prisma = require("../../config/prisma");
const getOwnedEventById = require("../../services/events/get-owned-event-by-id.service");
const updateOwnedEvent = require("../../services/events/update-owned-event.service");
const deleteOwnedEvent = require("../../services/events/delete-owned-event.service");
const { validateEventInput } = require("../../validators/events/event.validator");

function buildEditViewModel(overrides = {}) {
  return {
    pageTitle: "Editar evento",
    formData: {
      id: null,
      title: "",
      description: "",
      city: "",
      address: "",
      eventDate: "",
      eventTime: "",
      totalSlots: "",
    },
    errors: {},
    entity: null,
    ...overrides,
  };
}

function mapEventToFormData(event) {
  const startsAt = new Date(event.startsAt);

  return {
    id: event.id,
    title: event.title,
    description: event.description,
    city: event.city,
    address: event.address,
    eventDate: startsAt.toISOString().slice(0, 10),
    eventTime: startsAt.toISOString().slice(11, 16),
    totalSlots: String(event.totalSlots),
  };
}

async function renderEventEditForm(req, res, next) {
  try {
    const result = await getOwnedEventById({
      userId: req.currentUser.id,
      eventId: Number(req.params.eventId),
    });

    return res.render(
      "pages/events/edit",
      buildEditViewModel({
        entity: result.entity,
        formData: mapEventToFormData(result.event),
      }),
    );
  } catch (error) {
    if (error.code === "EVENT_NOT_FOUND") {
      return res.status(404).render("pages/errors/404", {
        pageTitle: "Evento no encontrado",
      });
    }

    if (error.code === "EVENT_NOT_OWNED_BY_ENTITY") {
      return res.status(403).render("pages/errors/500", {
        pageTitle: "Acceso denegado",
        errorMessage: "Solo la entidad autora puede editar este evento.",
      });
    }

    return next(error);
  }
}

async function updateEvent(req, res, next) {
  const eventId = Number(req.params.eventId);
  const { sanitizedData, errors } = validateEventInput(req.body);

  try {
    const result = await getOwnedEventById({
      userId: req.currentUser.id,
      eventId,
    });

    if (Object.keys(errors).length > 0) {
      return res.status(422).render(
        "pages/events/edit",
        buildEditViewModel({
          entity: result.entity,
          formData: {
            id: eventId,
            ...sanitizedData,
          },
          errors,
        }),
      );
    }

    await updateOwnedEvent({
      userId: req.currentUser.id,
      eventId,
      title: sanitizedData.title,
      description: sanitizedData.description,
      city: sanitizedData.city,
      address: sanitizedData.address,
      eventDate: sanitizedData.eventDate,
      eventTime: sanitizedData.eventTime,
      totalSlots: sanitizedData.totalSlots,
    });

    return res.redirect("/eventos?updated=1");
  } catch (error) {
    if (error.code === "EVENT_NOT_FOUND") {
      return res.status(404).render("pages/errors/404", {
        pageTitle: "Evento no encontrado",
      });
    }

    if (error.code === "EVENT_NOT_OWNED_BY_ENTITY") {
      return res.status(403).render("pages/errors/500", {
        pageTitle: "Acceso denegado",
        errorMessage: "Solo la entidad autora puede actualizar este evento.",
      });
    }

    return next(error);
  }
}

async function deleteEvent(req, res, next) {
  const eventId = Number(req.params.eventId);

  try {
    await deleteOwnedEvent({
      userId: req.currentUser.id,
      eventId,
    });

    return res.redirect("/eventos?deleted=1");
  } catch (error) {
    if (error.code === "EVENT_NOT_FOUND") {
      return res.status(404).render("pages/errors/404", {
        pageTitle: "Evento no encontrado",
      });
    }

    if (error.code === "EVENT_NOT_OWNED_BY_ENTITY") {
      return res.status(403).render("pages/errors/500", {
        pageTitle: "Acceso denegado",
        errorMessage: "Solo la entidad autora puede eliminar este evento.",
      });
    }

    return next(error);
  }
}

async function getCurrentEntityId(req) {
  if (!req.currentUser || req.currentUser.role !== "ENTIDAD") {
    return null;
  }

  const entity = await prisma.entity.findUnique({
    where: {
      requestedByUserId: req.currentUser.id,
    },
    select: {
      id: true,
    },
  });

  return entity ? entity.id : null;
}

module.exports = {
  deleteEvent,
  getCurrentEntityId,
  renderEventEditForm,
  updateEvent,
};
