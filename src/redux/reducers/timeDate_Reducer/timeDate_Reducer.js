const initialState = { time_Date: [] };

export const timeDate_Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEND_REQUEST_TIME_DATE":
      return { loading: true, time_Date: [] };
    case "SUCCESS_SEND_REQUEST_TIME_DATE":
      return { loading: false, time_Date: action.payload };
    default:
      return state;
  }
};
