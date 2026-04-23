const listVolunteerNotifications = require("../../services/notifications/list-volunteer-notifications.service");
const markNotificationAsRead = require("../../services/notifications/mark-notification-as-read.service");

async function renderVolunteerNotifications(req, res, next) {
  try {
    const notifications = await listVolunteerNotifications(req.currentUser.id);

    return res.render("pages/notifications/index", {
      pageTitle: "Notificaciones",
      notifications,
      infoMessage:
        req.query.read === "1"
          ? "La notificacion se ha marcado como leida."
          : null,
    });
  } catch (error) {
    return next(error);
  }
}

async function markVolunteerNotificationAsRead(req, res, next) {
  try {
    await markNotificationAsRead({
      notificationId: Number(req.params.notificationId),
      volunteerUserId: req.currentUser.id,
    });

    return res.redirect("/notificaciones?read=1");
  } catch (error) {
    if (error.code === "NOTIFICATION_NOT_FOUND") {
      return res.status(404).render("pages/errors/404", {
        pageTitle: "Notificacion no encontrada",
      });
    }

    if (error.code === "NOTIFICATION_FORBIDDEN") {
      return res.status(403).render("pages/errors/403", {
        pageTitle: "Acceso denegado",
      });
    }

    return next(error);
  }
}

module.exports = {
  markVolunteerNotificationAsRead,
  renderVolunteerNotifications,
};
