const STATIC_ASSET_PATTERN = /\.(?:css|js|mjs|png|jpe?g|gif|webp|svg|ico|woff2?|ttf|map)$/i;

function noCacheHtmlMiddleware(req, res, next) {
  if (STATIC_ASSET_PATTERN.test(req.path || "")) {
    return next();
  }

  const acceptedType = typeof req.accepts === "function" ? req.accepts(["html", "json"]) : "html";

  if (acceptedType === "html") {
    res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
    res.set("Pragma", "no-cache");
    res.set("Expires", "0");
  }

  return next();
}

module.exports = noCacheHtmlMiddleware;
