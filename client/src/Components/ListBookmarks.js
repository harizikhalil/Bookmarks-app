import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookmarkItem from "./BookmarkItem";
import AddBokmarks from "./AddBokmarks";
import Spinner from "./Spinner";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addBookmark } from "../JS/actions/BookmarksAction";
const ListBookmarks = ({ currentBookmarks }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const isLoading = useSelector((state) => state.BookmarksReducer.isLoading);

  if (isLoading) {
    return <Spinner color="white" />;
  }
  const onOpenModal = () => {
    setShow(true);
  };

  const onCloseModal = () => {
    setShow(false);
  };
  const addBookmarks = (newBookmark) => {
    dispatch(addBookmark(newBookmark));
    setShow(false);
  };
  return (
    <React.Fragment>
      <ToastContainer />
      <div style={{ marginTop: "5px" }}>
        <button onClick={onOpenModal} className="add-btn">
          <i className="fas fa-plus"></i>
          add new bookmark
        </button>
        {currentBookmarks.length === 0 ? (
          <h1
            style={{ textAlign: "center", marginTop: "100px", color: "white" }}
          >
            there is no bookmarks
          </h1>
        ) : (
          <ul className="bookmarks-list">
            {currentBookmarks.map((bookmark) => {
              return <BookmarkItem bookmark={bookmark} key={bookmark._id} />;
            })}
          </ul>
        )}
        <Modal open={show} onClose={onCloseModal} center>
          <AddBokmarks addBookmarks={addBookmarks} />
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default ListBookmarks;
