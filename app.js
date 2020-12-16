const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI =
  "mongodb+srv://johnsmith:mongo1234@cluster0.p9iyl.mongodb.net/blog-db";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(3000))
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// set directory for static files
app.use(express.static("public"));
// parses form post body from url into an object
app.use(express.urlencoded({ extended: true }));
// logger
app.use(morgan("dev"));
// ??
// app.use((req, res, next) => {
//   res.locals.path = req.path;
//   next();
// });

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

app.get("/blogs", (req, res) => {
  // find all instances of Blog
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { blogs: result, title: "All blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
});

// post request
app.post("/blogs", (req, res) => {
  // req.body is the form submission object
  const blog = new Blog(req.body);

  blog
    .save()
    .then(() => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => {
      console.log(err);
    });
});

// delete route
app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    // after deleting from db
    .then(() => {
      // send redirect route to view as json
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
