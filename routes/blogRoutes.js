const express = require("express");
const blogController = require("../controllers/blogController");

const router = express.Router();

router.get("/", blogController.blogs_index);
router.get("/create", blogController.blogs_create);
router.post("/", blogController.blogs_create_post);
router.get("/:id", blogController.blogs_details);
router.delete("/:id", blogController.blogs_details_delete);

module.exports = router;
