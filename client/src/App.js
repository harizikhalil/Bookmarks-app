import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListBookmarks from "./Components/ListBookmarks";
import Pagination from "./Components/Pagination";
import Spinner from "./Components/Spinner";
import { getListBookmarks } from "./JS/actions/BookmarksAction";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [bookMarksPerPage] = useState(2);
  const listBookmarks = useSelector(
    (state) => state.BookmarksReducer.listBookmarks
  );
  useEffect(() => {
    dispatch(getListBookmarks());
  }, [dispatch]);

  if (listBookmarks === null) {
    return <Spinner color="white" />;
  }
  // Get current bookmarks
  const indexOfLastBookmark = currentPage * bookMarksPerPage;
  const indexOfFirstBookmark = indexOfLastBookmark - bookMarksPerPage;
  const currentBookmarks = listBookmarks.slice(
    indexOfFirstBookmark,
    indexOfLastBookmark
  );
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  //console.log(currentBookmarks, "currentBookmarks");
  //console.log(indexOfLastBookmark, "indexOfLastBookmark");
  //console.log(indexOfFirstBookmark, "indexOfFirstBookmark");
  return (
    <div className="App">
      <ListBookmarks
        currentBookmarks={
          currentBookmarks.length === 0
            ? listBookmarks.slice(
                indexOfFirstBookmark - bookMarksPerPage,
                indexOfLastBookmark - bookMarksPerPage
              )
            : currentBookmarks
        }
      />
      <Pagination
        bookMarksPerPage={bookMarksPerPage}
        totalBookmarks={listBookmarks.length}
        paginate={paginate}
      />
    </div>
  );
};

export default App;
