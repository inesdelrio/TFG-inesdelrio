function destroyUserSession(req, callback) {
  if (!req.session) {
    callback(null);
    return;
  }

  req.session.destroy((error) => {
    if (error) {
      callback(error);
      return;
    }

    callback(null);
  });
}

module.exports = {
  destroyUserSession,
};
