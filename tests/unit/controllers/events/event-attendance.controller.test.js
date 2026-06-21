const assert = require("node:assert/strict");

const {
  renderEventAttendees,
} = require("../../../../src/controllers/events/event-attendance.controller");

function createResponseRecorder() {
  return {
    redirectedTo: null,
    renderedView: null,
    statusCode: 200,
    redirect(path) {
      this.redirectedTo = path;
      return this;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    render(view) {
      this.renderedView = view;
      return this;
    },
  };
}

async function testRenderEventAttendeesRedirectsOwnedEventToDetail() {
  const res = createResponseRecorder();

  await renderEventAttendees(
    {
      params: { eventId: "9" },
      currentUser: { id: 3, role: "ENTIDAD" },
    },
    res,
    (error) => {
      throw error;
    },
    {
      listOwnedEventRegistrations: async () => ({
        event: { id: 9 },
        registrations: [],
      }),
    },
  );

  assert.equal(res.redirectedTo, "/eventos/9");
  assert.equal(res.renderedView, null);
}

async function testRenderEventAttendeesKeepsOwnershipControl() {
  const res = createResponseRecorder();

  await renderEventAttendees(
    {
      params: { eventId: "9" },
      currentUser: { id: 3, role: "ENTIDAD" },
    },
    res,
    (error) => {
      throw error;
    },
    {
      listOwnedEventRegistrations: async () => {
        const error = new Error("Event does not belong to current entity.");
        error.code = "EVENT_NOT_OWNED_BY_ENTITY";
        throw error;
      },
    },
  );

  assert.equal(res.statusCode, 403);
  assert.equal(res.renderedView, "pages/errors/500");
  assert.equal(res.redirectedTo, null);
}

module.exports = {
  testRenderEventAttendeesKeepsOwnershipControl,
  testRenderEventAttendeesRedirectsOwnedEventToDetail,
};
