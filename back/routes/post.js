const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/post");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/", auth, multer, postCtrl.createPost);
router.get("/:id", auth, postCtrl.getOnePost);
router.get("/", auth, postCtrl.getAllPost);
router.delete("/:id", auth, postCtrl.deletePost);
router.get("/mypost/:id", auth, multer, postCtrl.getMyPost);
module.exports = router;
