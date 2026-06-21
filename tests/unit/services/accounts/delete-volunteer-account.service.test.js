const assert = require("node:assert/strict");

const deleteVolunteerAccount = require("../../../../src/services/accounts/delete-volunteer-account.service");

async function testDeleteVolunteerAccountAnonymizesAndRemovesFutureRelations() {
  const calls = [];
  const now = new Date("2099-05-01T10:00:00Z");
  const transaction = {
    user: {
      findUnique: async (query) => {
        calls.push({ operation: "findUser", query });
        return { id: 8, role: "VOLUNTARIO" };
      },
      update: async (query) => {
        calls.push({ operation: "updateUser", query });
        return query.data;
      },
    },
    eventRegistration: {
      deleteMany: async (query) => {
        calls.push({ operation: "deleteRegistrations", query });
        return { count: 2 };
      },
    },
    entitySubscription: {
      deleteMany: async (query) => {
        calls.push({ operation: "deleteSubscriptions", query });
        return { count: 1 };
      },
    },
  };

  await deleteVolunteerAccount(
    { userId: 8, now },
    {
      prisma: {
        $transaction: async (callback) => callback(transaction),
      },
      createAnonymizedUserData: async () => ({
        firstName: "Usuario",
        lastName: "eliminado",
        email: "deleted-user-8@volunred.local",
        phone: null,
        passwordHash: "unusable-hash",
      }),
    },
  );

  const registrationsCall = calls.find(
    (call) => call.operation === "deleteRegistrations",
  );
  assert.equal(registrationsCall.query.where.volunteerUserId, 8);
  assert.equal(
    registrationsCall.query.where.event.startsAt.gte.getTime(),
    now.getTime(),
  );

  const subscriptionsCall = calls.find(
    (call) => call.operation === "deleteSubscriptions",
  );
  assert.deepEqual(subscriptionsCall.query.where, { volunteerUserId: 8 });

  const updateCall = calls.find((call) => call.operation === "updateUser");
  assert.equal(updateCall.query.data.email, "deleted-user-8@volunred.local");
  assert.equal(updateCall.query.data.phone, null);
  assert.equal(updateCall.query.data.passwordHash, "unusable-hash");
}

async function testDeleteVolunteerAccountRejectsWrongRole() {
  await assert.rejects(
    () =>
      deleteVolunteerAccount(
        { userId: 8 },
        {
          prisma: {
            $transaction: async (callback) =>
              callback({
                user: {
                  findUnique: async () => ({ id: 8, role: "ENTIDAD" }),
                },
              }),
          },
          createAnonymizedUserData: async () => ({}),
        },
      ),
    (error) => error && error.code === "VOLUNTEER_ACCOUNT_NOT_FOUND",
  );
}

module.exports = {
  testDeleteVolunteerAccountAnonymizesAndRemovesFutureRelations,
  testDeleteVolunteerAccountRejectsWrongRole,
};
