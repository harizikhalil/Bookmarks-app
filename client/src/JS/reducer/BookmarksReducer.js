import {
  ADD_BOOKMARKS,
  ADD_BOOKMARKS_SUCCES,
  ADD_BOOKMARKS_FAIL,
  GET_LIST_BOOKMARKS_FAIL,
  GET_LIST_BOOKMARKS,
  GET_LIST_BOOKMARKS_SUCCES,
  DELETE_BOOKMARK_SUCCES,
  DELETE_BOOKMARK_FAIL,
  DELETE_BOOKMARK,
  UPDATE_BOOKMARK_SUCCES,
  UPDATE_BOOKMARK_FAIL,
  UPDATE_BOOKMARK,
} from "../const";

const initialState = {
  isLoading: false,
  listBookmarks: null,
};

const BookmarksReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_BOOKMARKS:
    case GET_LIST_BOOKMARKS:
    case DELETE_BOOKMARK:
    case UPDATE_BOOKMARK:
      return { ...state, isLoading: true };
    case ADD_BOOKMARKS_SUCCES:
      return {
        ...state,
        isLoading: false,
        listBookmarks: [...state.listBookmarks, payload.bookmark],
      };
    case GET_LIST_BOOKMARKS_SUCCES:
      return { ...state, isLoading: false, listBookmarks: payload };
    case DELETE_BOOKMARK_SUCCES:
      return {
        ...state,
        isLoading: false,
        listBookmarks: state.listBookmarks.filter(
          (bookmark) => bookmark._id !== payload
        ),
      };
    case UPDATE_BOOKMARK_SUCCES:
      return { ...state, isLoading: false, listBookmarks: payload };
    case ADD_BOOKMARKS_FAIL:
    case GET_LIST_BOOKMARKS_FAIL:
    case DELETE_BOOKMARK_FAIL:
    case UPDATE_BOOKMARK_FAIL:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
export default BookmarksReducer;
