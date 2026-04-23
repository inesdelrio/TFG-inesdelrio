const { getVolunteerCalendar } = require("../../services/volunteers/get-volunteer-calendar.service");

async function renderVolunteerCalendar(req, res, next) {
  try {
    const calendar = await getVolunteerCalendar({
      volunteerUserId: req.currentUser.id,
      month: req.query.month,
    });

    return res.render("pages/volunteers/calendar", {
      pageTitle: "Calendario personal",
      calendar,
      infoMessage:
        req.query.registered === "1"
          ? "El calendario ya refleja tu nueva inscripcion."
          : req.query.cancelled === "1"
            ? "El calendario se ha actualizado tras cancelar la actividad."
            : null,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  renderVolunteerCalendar,
};
