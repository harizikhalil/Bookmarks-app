import React, { useState } from "react";

const UpdateBookmark = ({ bookmark, updateBookmarks }) => {
  const [formData, setformData] = useState({
    titre: bookmark.titre,
    auteur: bookmark.auteur,
    motsCles: bookmark.motsCles,
  });
  const handleChange = (e) =>
    setformData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    updateBookmarks(formData, bookmark._id);
  };
  return (
    <form className="add-form">
      <div className="inputfield">
        <label>motsCles:</label>
        <input
          type="text"
          name="motsCles"
          value={formData.motsCles}
          className="input_text"
          placeholder="motsCles"
          onChange={handleChange}
          required
        />
      </div>
      <div className="inputfield">
        <label>titre:</label>
        <input
          type="text"
          name="titre"
          value={formData.titre}
          className="input_text"
          placeholder="titre"
          onChange={handleChange}
          required
        />
      </div>
      <div className="inputfield">
        <label>auteur:</label>
        <input
          type="text"
          name="auteur"
          value={formData.auteur}
          className="input_text"
          placeholder="auteur"
          onChange={handleChange}
          required
        />
      </div>
      <input
        type="submit"
        name="update"
        value="update bookmarks"
        className="btn-update-bookmark"
        onClick={handleSubmit}
      />
    </form>
  );
};

export default UpdateBookmark;
