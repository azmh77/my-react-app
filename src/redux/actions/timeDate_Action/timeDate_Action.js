import axios from "axios";

export const timeDate_Action = async (dispatch) => {
  dispatch({ type: "SEND_REQUEST_TIME_DATE" });
  const response = await axios
    .get("https://api.keybit.ir/time/")
    .then((response) => {
      return response.data;
    });
  let payload = response;
  dispatch({ type: "SUCCESS_SEND_REQUEST_TIME_DATE", payload });
};
