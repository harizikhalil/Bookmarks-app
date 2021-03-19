const Bookmark = require("../models/Bookmark");

module.exports = BookmarksController = {
  addBookmark: async (req, res) => {
    const {
      URL,
      auteur,
      date,
      duree,
      hauteur,
      largeur,
      imgSource,
      titre,
      motsCles,
      type,
    } = req.body;
    try {
      let bookmark = await Bookmark.findOne({ URL });
      if (bookmark) {
        return res.status(400).json([{ msg: "Ce bookmark existe deja !!!" }]);
      }
      bookmark = new Bookmark({
        URL,
        auteur,
        date,
        duree,
        hauteur,
        largeur,
        imgSource,
        titre,
        motsCles,
        type,
      });
      await bookmark.save();
      res.send({ bookmark });
    } catch (error) {
      console.log(error);
      res.status(500).send([{ msg: "Server error" }]);
    }
  },
  getallBookMarks: async (req, res) => {
    try {
      let bookMarks = await Bookmark.find();
      res.send(bookMarks);
    } catch (error) {
      console.log(error);
      res.status(500).send([{ msg: "Server error" }]);
    }
  },

  updateBookMarks: async (req, res) => {
    const { idBookmark } = req.params;
    const { auteur, titre, motsCles } = req.body;
    try {
      let newBookmark = {
        auteur,
        titre,
        motsCles,
      };
      await Bookmark.findOneAndUpdate(
        { _id: idBookmark },
        { $set: newBookmark },
        { new: true }
      );
      let bookmark = await Bookmark.find();
      res.send(bookmark);
    } catch (error) {
      console.log(error);
      res.status(500).send([{ msg: "Server error" }]);
    }
  },
  deleteBookmark: async (req, res) => {
    try {
      const bookmark = await Bookmark.findById(req.params.idBookmark);
      await bookmark.remove();
      res.json([{ idbookmark: bookmark._id }]);
    } catch (error) {
      console.log(error);
      res.status(500).send({ errors: ["Server error"] });
    }
  },
};
