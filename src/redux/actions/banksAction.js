import axios from "axios";

export const banksAction = async (dispatch) => {
  dispatch({ type: "SEND_REQUEST_BANKS" });
  const response = await axios
    .get("http://37.32.26.0/api/Bank/0/0")
    .then((response) => {
      return response.data.entities;
    });
  let payload = response;
  dispatch({ type: "SUCCESS_REQUEST_BANKS", payload });
};
