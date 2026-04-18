const assert = require("node:assert/strict");

const { destroyUserSession } = require("../../../../src/services/auth/session.service");

async function testDestroyUserSessionDestroysSessionWithoutError() {
  await new Promise((resolve, reject) => {
    destroyUserSession(
      {
        session: {
          destroy(callback) {
            callback(null);
          },
        },
      },
      (error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      },
    );
  });

  assert.ok(true);
}

module.exports = {
  testDestroyUserSessionDestroysSessionWithoutError,
};
