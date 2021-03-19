import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

const AddBokmarks = ({ addBookmarks }) => {
  const [LinkType, setLinkType] = useState("");
  const [Uploading, setUploading] = useState(false);
  const [newBookmarks, setnewBookmarks] = useState({
    URL: "",
    titre: "",
    auteur: "",
    date: "",
    largeur: "",
    hauteur: "",
    duree: "",
    imgSource: "",
    motsCles: "",
    type: "",
  });
  const handleChange = (e) =>
    setnewBookmarks({ ...newBookmarks, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    addBookmarks(newBookmarks);
  };

  const getLink = async (e) => {
    e.preventDefault();
    if (LinkType !== "") {
      try {
        setUploading(true);
        if (LinkType === "video") {
          var res = await axios.get(
            `https://vimeo.com/api/oembed.json?url=${newBookmarks.URL}`
          );
        } else {
          res = await axios.get(
            `https://cors-anywhere.herokuapp.com/http://www.flickr.com/services/oembed/?format=json&url=${newBookmarks.URL}`
          );
        }
      } catch (error) {
        setUploading(false);
        toast.info("le link est incorrecte !!");
      }

      setUploading(false);
      if (res) {
        setnewBookmarks({
          ...newBookmarks,
          titre: res.data.title,
          auteur: res.data.author_name,
          largeur: res.data.width,
          hauteur: res.data.height,
          date: res.data.upload_date,
          duree: res.data.duration,
          type: res.data.type,
          imgSource: res.data.thumbnail_url || res.data.url,
        });
      }

      //console.log(newBookmarks);
    } else {
      toast.info("veuillez selectionner le type du link");
    }
  };

  return (
    <form className="add-form">
      <label>
        veuillez choisir le type du link :
        <select defaultValue="" onChange={(e) => setLinkType(e.target.value)}>
          <option value="">Selectionez ...</option>
          <option>video</option>
          <option>photo</option>
        </select>
      </label>
      <br />
      <div className="upload-bookmark">
        <input
          type="text"
          name="URL"
          className="input_text"
          placeholder="URL"
          onChange={handleChange}
          required
          style={{ marginBottom: "10px" }}
        />
        <button onClick={getLink}>
          <i className="fas fa-download"></i>charger
        </button>
      </div>
      <br />
      {Uploading ? (
        <Spinner color="#00BFFF" />
      ) : (
        <>
          {newBookmarks.titre !== "" ? (
            <>
              <div className="inputfield">
                <label>motsCles:</label>

                <input
                  type="text"
                  name="motsCles"
                  value={newBookmarks.motsCles}
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
                  value={newBookmarks.titre}
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
                  value={newBookmarks.auteur}
                  className="input_text"
                  placeholder="auteur"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="inputfield">
                <label>largeur:</label>
                <input
                  type="text"
                  name="largeur"
                  value={newBookmarks.largeur}
                  className="input_text"
                  placeholder="largeur"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="inputfield">
                <label>hauteur :</label>
                <input
                  type="text"
                  name="hauteur"
                  value={newBookmarks.hauteur}
                  className="input_text"
                  placeholder="hauteur"
                  onChange={handleChange}
                  required
                />
              </div>

              {newBookmarks.duree ? (
                <>
                  <div className="inputfield">
                    <label>duree :</label>
                    <input
                      type="text"
                      name="duree"
                      value={newBookmarks.duree}
                      className="input_text"
                      placeholder="duree"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </>
              ) : null}

              {newBookmarks.date ? (
                <>
                  <div className="inputfield">
                    <label>date :</label>
                    <input
                      type="text"
                      name="date"
                      value={newBookmarks.date}
                      className="input_text"
                      placeholder="date"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <br />
                </>
              ) : null}

              <input
                type="submit"
                name="add"
                value="add new bookmarks"
                className="btn-add-bookmarks"
                onClick={handleSubmit}
              />
            </>
          ) : null}
        </>
      )}
    </form>
  );
};

export default AddBokmarks;
