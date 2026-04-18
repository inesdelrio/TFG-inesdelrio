const assert = require("node:assert/strict");

const updateVolunteerProfile = require("../../../../src/services/volunteers/update-volunteer-profile.service");

async function testUpdateVolunteerProfileUpdatesAllowedFields() {
  let updatedPayload = null;
  const prismaMock = {
    user: {
      findUnique: async ({ where }) => (where.id === 7 ? { id: 7, email: "vol@example.com" } : null),
      update: async ({ data }) => {
        updatedPayload = data;
        return {
          id: 7,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
        };
      },
    },
  };

  const updatedVolunteer = await updateVolunteerProfile(
    {
      userId: 7,
      firstName: "Ines Maria",
      lastName: "Del Rio Lopez",
      phone: "611223344",
    },
    {
      prisma: prismaMock,
    },
  );

  assert.deepEqual(updatedPayload, {
    firstName: "Ines Maria",
    lastName: "Del Rio Lopez",
    phone: "611223344",
  });
  assert.equal(updatedVolunteer.firstName, "Ines Maria");
}

module.exports = {
  testUpdateVolunteerProfileUpdatesAllowedFields,
};
