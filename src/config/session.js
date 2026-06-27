const DEVELOPMENT_SESSION_SECRET = "change-this-session-secret";

function resolveSessionSecret(env = process.env) {
  const configuredSecret =
    typeof env.SESSION_SECRET === "string" ? env.SESSION_SECRET.trim() : "";

  if (configuredSecret) {
    return configuredSecret;
  }

  if (env.NODE_ENV === "production") {
    throw new Error(
      "SESSION_SECRET is required when NODE_ENV is production.",
    );
  }

  return DEVELOPMENT_SESSION_SECRET;
}

module.exports = {
  resolveSessionSecret,
};
