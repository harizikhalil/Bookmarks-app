const express = require("express");
const router = express.Router();

const {
  addBookmark,
  getallBookMarks,
  updateBookMarks,
  deleteBookmark,
} = require("../controllers/BookmarksController");

router.post("/addBookmark", addBookmark);
router.get("/allBookmarks", getallBookMarks);
router.put("/updateBookmark/:idBookmark", updateBookMarks);
router.delete("/deleteBookmark/:idBookmark", deleteBookmark);

module.exports = router;
