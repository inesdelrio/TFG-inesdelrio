const assert = require("node:assert/strict");

const {
  deleteNotificationAction,
  openNotificationEvent,
  renderNotificationDetail,
} = require("../../../../src/controllers/notifications/notification.controller");

async function testOpenNotificationEventUsesStoredEventAndRedirects() {
  let receivedInput = null;
  let redirectedTo = null;

  await openNotificationEvent(
    {
      currentUser: { id: 4, role: "VOLUNTARIO" },
      params: {
        notificationId: "7",
      },
    },
    {
      redirect(path) {
        redirectedTo = path;
      },
    },
    (error) => {
      throw error;
    },
    {
      markNotificationAsRead: async (input) => {
        receivedInput = input;
        return {
          id: 7,
          eventId: 15,
        };
      },
    },
  );

  assert.deepEqual(receivedInput, {
    notificationId: 7,
    recipientUserId: 4,
  });
  assert.equal(redirectedTo, "/notificaciones/7");
}

async function testRenderNotificationDetailShowsStoredActorOnly() {
  let renderedView = null;
  let renderedModel = null;
  let markedInput = null;

  await renderNotificationDetail(
    {
      currentUser: { id: 12, role: "ENTIDAD" },
      params: { notificationId: "7" },
    },
    {
      render(view, model) {
        renderedView = view;
        renderedModel = model;
      },
    },
    (error) => {
      throw error;
    },
    {
      markNotificationAsRead: async (input) => {
        markedInput = input;
        return { id: 7 };
      },
      getNotificationDetail: async () => ({
        id: 7,
        type: "EVENT_REGISTRATION_CREATED",
        actorUser: {
          id: 4,
          firstName: "Ana",
          lastName: "Lopez",
          email: "ana@example.com",
          phone: null,
        },
        event: {
          id: 5,
          title: "Banco de alimentos",
        },
      }),
    },
  );

  assert.equal(renderedView, "pages/notifications/detail");
  assert.deepEqual(markedInput, {
    notificationId: 7,
    recipientUserId: 12,
  });
  assert.equal(renderedModel.notification.actorUser.id, 4);
  assert.equal(renderedModel.notification.event.id, 5);
  assert.equal(renderedModel.registrations, undefined);
}

async function testDeleteNotificationActionRedirectsAfterDeletingOwnNotification() {
  let receivedInput = null;
  let redirectedTo = null;

  await deleteNotificationAction(
    {
      currentUser: { id: 12, role: "ENTIDAD" },
      params: { notificationId: "7" },
    },
    {
      redirect(path) {
        redirectedTo = path;
      },
    },
    (error) => {
      throw error;
    },
    {
      deleteNotification: async (input) => {
        receivedInput = input;
      },
    },
  );

  assert.deepEqual(receivedInput, {
    notificationId: 7,
    recipientUserId: 12,
  });
  assert.equal(redirectedTo, "/notificaciones?deleted=1");
}

module.exports = {
  testDeleteNotificationActionRedirectsAfterDeletingOwnNotification,
  testOpenNotificationEventUsesStoredEventAndRedirects,
  testRenderNotificationDetailShowsStoredActorOnly,
};
