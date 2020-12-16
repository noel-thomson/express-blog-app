const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

// express app
const app = express();

const dbURI =
  "mongodb+srv://johnsmith:mongo1234@cluster0.p9iyl.mongodb.net/blog-db";

// connect to DB and listen to requests
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(3000))
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// set directory for assets
app.use(express.static("public"));
// parse form post from url into an object
app.use(express.urlencoded({ extended: true }));
// logger middleware
app.use(morgan("dev"));

// routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

// blog routes
app.use("/blogs", blogRoutes);

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
