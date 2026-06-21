const setNotificationReadStatus = require("./set-notification-read-status.service");

async function markNotificationAsRead(input, dependencies = {}) {
  return setNotificationReadStatus(
    {
      ...input,
      isRead: true,
    },
    dependencies,
  );
}

module.exports = markNotificationAsRead;
