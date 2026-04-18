const express = require("express");
const path = require("path");

const indexRouter = require("./routes");
const { notFoundHandler, errorHandler } = require("./middlewares/error.middleware");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use((req, res, next) => {
  res.locals.appName = "TFG Voluntariado";
  res.locals.currentPath = req.path;
  next();
});

app.use("/", indexRouter);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
