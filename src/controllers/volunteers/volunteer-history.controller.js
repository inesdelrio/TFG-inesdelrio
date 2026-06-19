const getVolunteerHistory = require("../../services/volunteers/get-volunteer-history.service");

async function renderVolunteerHistory(req, res, next) {
  try {
    const history = await getVolunteerHistory({
      volunteerUserId: req.currentUser.id,
    });

    return res.render("pages/volunteers/history", {
      pageTitle: "Historial de participacion",
      history,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  renderVolunteerHistory,
};
