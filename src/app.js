const express = require("express");
const session = require("express-session");
const path = require("path");

const indexRouter = require("./routes");
const { resolveSessionSecret } = require("./config/session");
const { notFoundHandler, errorHandler } = require("./middlewares/error.middleware");

const app = express();

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    name: "tfg.sid",
    secret: resolveSessionSecret(),
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 8,
    },
  }),
);
app.use(express.static(path.join(__dirname, "..", "public")));

app.use((req, res, next) => {
  req.currentUser = req.session.user || null;
  res.locals.appName = "TFG Voluntariado";
  res.locals.currentPath = req.path;
  res.locals.currentUser = req.currentUser;
  next();
});

app.use("/", indexRouter);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
