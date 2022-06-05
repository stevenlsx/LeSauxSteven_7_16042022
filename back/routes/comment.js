const express = require("express");
const router = express.Router();

const commentCtrl = require("../controllers/comment");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/", commentCtrl.createComment);
router.get("/:id", commentCtrl.getComment);
router.get("/", commentCtrl.getAllComment);
router.delete("/:id", commentCtrl.deleteComment);
router.put("/:id", commentCtrl.updateComment);

module.exports = router;
