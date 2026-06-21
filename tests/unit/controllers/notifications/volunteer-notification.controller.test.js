const assert = require("node:assert/strict");

const {
  openVolunteerNotificationEvent,
} = require("../../../../src/controllers/notifications/volunteer-notification.controller");

async function testOpenVolunteerNotificationEventMarksAsReadAndRedirects() {
  let receivedInput = null;
  let redirectedTo = null;

  await openVolunteerNotificationEvent(
    {
      currentUser: { id: 4, role: "VOLUNTARIO" },
      params: {
        notificationId: "7",
        eventId: "15",
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
      },
    },
  );

  assert.deepEqual(receivedInput, {
    notificationId: 7,
    volunteerUserId: 4,
  });
  assert.equal(redirectedTo, "/eventos/15?backToNotifications=1");
}

module.exports = {
  testOpenVolunteerNotificationEventMarksAsReadAndRedirects,
};
