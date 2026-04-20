const assert = require("node:assert/strict");

const getEventRegistrationStatus = require("../../../../src/services/events/get-event-registration-status.service");

async function testGetEventRegistrationStatusReturnsTrueWhenRegistrationExists() {
  const prismaMock = {
    eventRegistration: {
      findUnique: async () => ({ id: 10 }),
    },
  };

  const isRegistered = await getEventRegistrationStatus(
    {
      volunteerUserId: 3,
      eventId: 11,
    },
    {
      prisma: prismaMock,
    },
  );

  assert.equal(isRegistered, true);
}

module.exports = {
  testGetEventRegistrationStatusReturnsTrueWhenRegistrationExists,
};
