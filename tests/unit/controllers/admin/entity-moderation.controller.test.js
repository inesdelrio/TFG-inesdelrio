const assert = require("node:assert/strict");

const {
  renderAdminEntitiesList,
  renderEntityReviewDetail,
  updateEntityStatus,
} = require("../../../../src/controllers/admin/entity-moderation.controller");

function createResponseRecorder() {
  return {
    redirectedTo: null,
    renderedModel: null,
    renderedView: null,
    statusCode: 200,
    redirect(path) {
      this.redirectedTo = path;
      return this;
    },
    render(view, model) {
      this.renderedView = view;
      this.renderedModel = model;
      return this;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
  };
}

async function testRenderAdminEntitiesListPassesStatusFilterToService() {
  const res = createResponseRecorder();
  let receivedInput = null;

  await renderAdminEntitiesList(
    {
      query: { status: "VERIFICADA" },
    },
    res,
    (error) => {
      throw error;
    },
    {
      listAdminEntities: async (input) => {
        receivedInput = input;
        return {
          entities: [{ id: 1, organizationName: "Entidad" }],
          selectedStatus: "VERIFICADA",
          statusOptions: ["TODAS", "PENDIENTE", "VERIFICADA", "RECHAZADA", "SUSPENDIDA"],
        };
      },
    },
  );

  assert.deepEqual(receivedInput, { status: "VERIFICADA" });
  assert.equal(res.renderedView, "pages/admin/entities-list");
  assert.equal(res.renderedModel.selectedStatus, "VERIFICADA");
}

async function testRenderEntityReviewDetailRendersExistingEntity() {
  const res = createResponseRecorder();

  await renderEntityReviewDetail(
    {
      params: { entityId: "8" },
      query: { updated: "1" },
    },
    res,
    (error) => {
      throw error;
    },
    {
      getEntityReviewDetail: async (entityId) => ({
        id: entityId,
        organizationName: "Entidad revisada",
      }),
    },
  );

  assert.equal(res.renderedView, "pages/admin/entity-detail");
  assert.equal(res.renderedModel.entity.id, 8);
  assert.equal(res.renderedModel.infoMessage, "El estado de la entidad se ha actualizado correctamente.");
}

async function testRenderEntityReviewDetailShows404ForMissingEntity() {
  const res = createResponseRecorder();

  await renderEntityReviewDetail(
    {
      params: { entityId: "999" },
      query: {},
    },
    res,
    (error) => {
      throw error;
    },
    {
      getEntityReviewDetail: async () => null,
    },
  );

  assert.equal(res.statusCode, 404);
  assert.equal(res.renderedView, "pages/errors/404");
}

async function testUpdateEntityStatusRedirectsToDetailAfterChange() {
  const res = createResponseRecorder();
  let receivedInput = null;

  await updateEntityStatus(
    {
      currentUser: { id: 2, role: "ADMIN" },
      params: { entityId: "8" },
      body: {
        nextStatus: "PENDIENTE",
        notes: "Reabrir revision",
      },
    },
    res,
    (error) => {
      throw error;
    },
    {
      updateEntityValidationStatus: async (input) => {
        receivedInput = input;
      },
    },
  );

  assert.deepEqual(receivedInput, {
    adminUserId: 2,
    entityId: 8,
    nextStatus: "PENDIENTE",
    notes: "Reabrir revision",
  });
  assert.equal(res.redirectedTo, "/admin/entidades/8?updated=1");
}

module.exports = {
  testRenderAdminEntitiesListPassesStatusFilterToService,
  testRenderEntityReviewDetailRendersExistingEntity,
  testRenderEntityReviewDetailShows404ForMissingEntity,
  testUpdateEntityStatusRedirectsToDetailAfterChange,
};
