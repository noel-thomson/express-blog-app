const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
// test

// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI =
  "mongodb+srv://johnsmith:mongo1234@cluster0.p9iyl.mongodb.net/blogs-db?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(3000);
    console.log("mongodb connected");
  })
  .catch((err) => console.log(err));

// set view engine
app.set("view engine", "ejs");

// set directory for static files (css, assets)
app.use(express.static("public"));

// logger middleware
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/blogs", (req, res) => {
  Blog.find()
    // sort by mongoose timestamps
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { blogs: result, title: "All Blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// add a blog
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "new blog 2",
    snippet: "about my new blog",
    body: "more about my new blog",
  });
  // save 'blog' as instance of Blog model
  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// find all blogs
app.get("/all-blogs", (req, res) => {
  // find all instances of Blog model
  Blog.find()
    .then((result) => {
      // returns JSON
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// find instance of Blog by id
app.get("/single-blog", (req, res) => {
  Blog.findById("5fd839f082cfaf220f572d2a")
    .then((result) => {
      // returns JSON
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
