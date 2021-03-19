import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBookmark, updateBookmark } from "../JS/actions/BookmarksAction";
import UpdateBookmark from "./UpdateBookmark";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
const BookmarkItem = ({ bookmark }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const openModal = () => {
    setShow(true);
  };
  const onCloseModal = () => {
    setShow(false);
  };
  const openModalDelete = () => {
    setShowDelete(true);
  };
  const onCloseModalDelete = () => {
    setShowDelete(false);
  };
  const updateBookmarks = (newBookmark, idBookmark) => {
    dispatch(updateBookmark(newBookmark, idBookmark));
    setShow(false);
  };
  return (
    <React.Fragment>
      <li className="bookmarks-item">
        <h5>{bookmark.titre}</h5>
        <div className="bookmarks-container">
          <div className="bookmarks-info">
            <div>
              <img
                src={bookmark.imgSource}
                alt="photobookmark"
                width="100px"
                height="100%"
              />
            </div>
            <div className="bookmar-details">
              <p>
                <span>mots-cles:</span>
                {bookmark.motsCles}
              </p>
              <p>
                <span>auteur:</span>
                {bookmark.auteur}
              </p>
              <p>
                <span>type:</span>
                {bookmark.type}
              </p>
              {bookmark.duree ? (
                <p>
                  <span>duree:</span>
                  {bookmark.duree}
                </p>
              ) : null}
              {bookmark.date ? (
                <p>
                  <span>date:</span>
                  {bookmark.date}
                </p>
              ) : null}
            </div>
          </div>
          <div className="bookmark-option">
            <button onClick={openModal} className="update-btn">
              <i className="fas fa-pen-alt"></i>update
            </button>
            <button onClick={openModalDelete} className="delete-btn">
              <i className="far fa-trash-alt"></i>
              delete
            </button>
          </div>
        </div>
      </li>
      <Modal open={show} onClose={onCloseModal} center>
        <UpdateBookmark updateBookmarks={updateBookmarks} bookmark={bookmark} />
      </Modal>
      <Modal open={showDelete} onClose={onCloseModalDelete} center>
        <div className="confirm-delete">
          <h2>Voullez vous Vraiment Supprimer ?</h2>
          <div className="confirm-option">
            <button
              onClick={() => dispatch(deleteBookmark(bookmark._id))}
              className="btn-confirm-delete"
            >
              <i className="fas fa-check"></i>
              oui
            </button>
            <button onClick={onCloseModalDelete} className="btn-cancel-delete">
              <i className="fas fa-times"></i>
              Non
            </button>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default BookmarkItem;
