import axios from "axios";
import { toast } from "react-toastify";
import {
  ADD_BOOKMARKS,
  ADD_BOOKMARKS_SUCCES,
  ADD_BOOKMARKS_FAIL,
  GET_LIST_BOOKMARKS,
  GET_LIST_BOOKMARKS_SUCCES,
  GET_LIST_BOOKMARKS_FAIL,
  DELETE_BOOKMARK,
  DELETE_BOOKMARK_FAIL,
  DELETE_BOOKMARK_SUCCES,
  UPDATE_BOOKMARK,
  UPDATE_BOOKMARK_FAIL,
  UPDATE_BOOKMARK_SUCCES,
} from "../const";

export const addBookmark = (newBookmark) => async (dispatch) => {
  dispatch({
    type: ADD_BOOKMARKS,
  });

  try {
    const res = await axios.post("/api/bookmark/addBookmark", newBookmark);
    dispatch({
      type: ADD_BOOKMARKS_SUCCES,
      payload: res.data,
    });
    toast.success("bookmark ajouter", {
      draggable: true,
      position: toast.POSITION.TOP_RIGHT,
    });
  } catch (error) {
    const response = error.response.data;
    // check if the response is an array and alert it
    if (Array.isArray(response)) {
      response.forEach((err) => {
        toast.info(err.msg, {
          draggable: true,
          position: toast.POSITION.TOP_RIGHT,
        });
      });
    }
    dispatch({
      type: ADD_BOOKMARKS_FAIL,
    });
  }
};

export const getListBookmarks = () => async (dispatch) => {
  dispatch({
    type: GET_LIST_BOOKMARKS,
  });

  try {
    const res = await axios.get("/api/bookmark/allBookmarks");
    dispatch({
      type: GET_LIST_BOOKMARKS_SUCCES,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: GET_LIST_BOOKMARKS_FAIL,
    });
  }
};
export const deleteBookmark = (idBookmark) => async (dispatch) => {
  dispatch({
    type: DELETE_BOOKMARK,
  });
  try {
    await axios.delete(`/api/bookmark/deleteBookmark/${idBookmark}`);
    dispatch({
      type: DELETE_BOOKMARK_SUCCES,
      payload: idBookmark,
    });
    toast.success("bookmark supprimer", {
      draggable: true,
      position: toast.POSITION.TOP_RIGHT,
    });
  } catch (error) {
    dispatch({
      type: DELETE_BOOKMARK_FAIL,
    });
  }
};
export const updateBookmark = (formData, idBookmark) => async (dispatch) => {
  dispatch({
    type: UPDATE_BOOKMARK,
  });
  try {
    const res = await axios.put(
      `/api/bookmark/updateBookmark/${idBookmark}`,
      formData
    );
    dispatch({
      type: UPDATE_BOOKMARK_SUCCES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_BOOKMARK_FAIL,
    });
  }
};
