import axios from "axios";

export const guildAction = async (dispatch) => {
  dispatch({ type: "SEND_REQUEST_GUILD" });
  const response = await axios
    .get("http://37.32.26.0/api/Guild/0/0")
    .then((response) => {
      return response.data.entities;
    });
  let payload = response;
  dispatch({ type: "SUCCESS_REQUEST_GUILD", payload });
};

export const showAddProjectModal = (dispatch) => {
  dispatch({ type: "َSHOW_ADD_GUILD_MODAL" });
};

export const closeAddProjectModal = (dispatch) => {
  dispatch({ type: "CLOSE_ADD_GUILD_MODAL" });
};

export const showEditProjectModal = (dispatch) => {
  dispatch({ type: "َSHOW_EDIT_GUILD_MODAL" });
};

export const closeEditeProjectModal = (dispatch) => {
  dispatch({ type: "CLOSE_EDIT_GUILD_MODAL" });
};
