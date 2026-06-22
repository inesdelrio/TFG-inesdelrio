const deleteNotification = require("../../services/notifications/delete-notification.service");
const listUserNotifications = require("../../services/notifications/list-user-notifications.service");
const getNotificationDetail = require("../../services/notifications/get-notification-detail.service");
const markNotificationAsRead = require("../../services/notifications/mark-notification-as-read.service");
const setNotificationReadStatus = require("../../services/notifications/set-notification-read-status.service");

function handleNotificationError(error, res, next) {
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

async function renderNotifications(req, res, next) {
  try {
    const notifications = await listUserNotifications(req.currentUser.id);

    return res.render("pages/notifications/index", {
      pageTitle: "Notificaciones",
      notifications,
      infoMessage:
        req.query.deleted === "1"
          ? "La notificacion se ha eliminado."
          : req.query.read === "1"
          ? "La notificacion se ha marcado como leida."
          : req.query.unread === "1"
            ? "La notificacion se ha marcado como no leida."
            : null,
    });
  } catch (error) {
    return next(error);
  }
}

async function markNotificationAsReadAction(req, res, next) {
  try {
    await markNotificationAsRead({
      notificationId: Number(req.params.notificationId),
      recipientUserId: req.currentUser.id,
    });

    return res.redirect("/notificaciones?read=1");
  } catch (error) {
    return handleNotificationError(error, res, next);
  }
}

async function markNotificationAsUnreadAction(req, res, next) {
  try {
    await setNotificationReadStatus({
      notificationId: Number(req.params.notificationId),
      recipientUserId: req.currentUser.id,
      isRead: false,
    });

    return res.redirect("/notificaciones?unread=1");
  } catch (error) {
    return handleNotificationError(error, res, next);
  }
}

async function openNotificationEvent(req, res, next, dependencies = {}) {
  const markAsRead =
    dependencies.markNotificationAsRead || markNotificationAsRead;

  try {
    const notification = await markAsRead({
      notificationId: Number(req.params.notificationId),
      recipientUserId: req.currentUser.id,
    });

    return res.redirect(`/notificaciones/${notification.id}`);
  } catch (error) {
    return handleNotificationError(error, res, next);
  }
}

async function renderNotificationDetail(req, res, next, dependencies = {}) {
  const loadNotification =
    dependencies.getNotificationDetail || getNotificationDetail;
  const markAsRead =
    dependencies.markNotificationAsRead || markNotificationAsRead;

  try {
    await markAsRead({
      notificationId: Number(req.params.notificationId),
      recipientUserId: req.currentUser.id,
    });

    const notification = await loadNotification({
      notificationId: Number(req.params.notificationId),
      recipientUserId: req.currentUser.id,
    });

    return res.render("pages/notifications/detail", {
      pageTitle: notification.title,
      notification,
    });
  } catch (error) {
    return handleNotificationError(error, res, next);
  }
}

async function deleteNotificationAction(req, res, next, dependencies = {}) {
  const removeNotification =
    dependencies.deleteNotification || deleteNotification;

  try {
    await removeNotification({
      notificationId: Number(req.params.notificationId),
      recipientUserId: req.currentUser.id,
    });

    return res.redirect("/notificaciones?deleted=1");
  } catch (error) {
    return handleNotificationError(error, res, next);
  }
}

module.exports = {
  deleteNotificationAction,
  markNotificationAsReadAction,
  markNotificationAsUnreadAction,
  openNotificationEvent,
  renderNotificationDetail,
  renderNotifications,
};
