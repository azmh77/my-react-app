import axios from "axios";

export const projectAction = async (dispatch) => {
  dispatch({ type: "SEND_REQUEST_PROJECT" });
  const response = await axios
    .get("http://37.32.26.0/api/Project/0/0/1")
    .then((response) => {
      return response.data.entities;
    });
  let payload = response;
  dispatch({ type: "SUCCESS_REQUEST_PROJECT", payload });
};

export const showAddProjectModal = (dispatch) => {
  dispatch({ type: "َSHOW_ADD_PROJECT_MODAL" });
};

export const closeAddProjectModal = (dispatch) => {
  dispatch({ type: "CLOSE_ADD_PROJECT_MODAL" });
};

export const showEditProjectModal = (dispatch) => {
  dispatch({ type: "َSHOW_EDIT_PROJECT_MODAL" });
};

export const closeEditeProjectModal = (dispatch) => {
  dispatch({ type: "CLOSE_EDIT_PROJECT_MODAL" });
};
