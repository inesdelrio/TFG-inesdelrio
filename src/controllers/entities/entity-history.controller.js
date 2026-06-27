const getEntityHistory = require("../../services/entities/get-entity-history.service");

async function renderEntityHistory(req, res, next) {
  try {
    const history = await getEntityHistory({
      userId: req.currentUser.id,
    });

    return res.render("pages/entities/history", {
      pageTitle: "Historial de eventos",
      history,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  renderEntityHistory,
};
