const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/post");
const multer = require("../middleware/multer-config");

router.post("/", multer, postCtrl.createPost);
router.get("/:id", postCtrl.getOnePost);
router.get("/", postCtrl.getAllPost);
router.delete("/:id", postCtrl.deletePost);
router.put("/:id", multer, postCtrl.updatePost);
module.exports = router;
