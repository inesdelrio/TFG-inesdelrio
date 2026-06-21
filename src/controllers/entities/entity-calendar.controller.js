const {
  getEntityCalendar,
} = require("../../services/entities/get-entity-calendar.service");

async function renderEntityCalendar(req, res, next) {
  try {
    const calendar = await getEntityCalendar({
      userId: req.currentUser.id,
      month: req.query.month,
    });

    return res.render("pages/entities/calendar", {
      pageTitle: "Calendario de eventos",
      calendar,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  renderEntityCalendar,
};
