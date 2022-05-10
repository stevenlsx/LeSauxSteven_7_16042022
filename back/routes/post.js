const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/post");

router.post("/", postCtrl.createPost);
router.get("/:id", postCtrl.getOnePost);
router.get("/", postCtrl.getAllPost);
router.delete("/:id", postCtrl.deletePost);

module.exports = router;
