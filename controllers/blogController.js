// const { rest } = require("lodash");
const Blog = require("../models/blog");

const blogs_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("blogs/index", { blogs: result, title: "All blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const blogs_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("blogs/details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).render("404", { title: "Blog not found" });
    });
};

const blogs_create = (req, res) => {
  res.render("blogs/create", { title: "Create a new blog" });
};

const blogs_create_post = (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
};

const blogs_details_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  blogs_index,
  blogs_details,
  blogs_create,
  blogs_create_post,
  blogs_details_delete,
};
