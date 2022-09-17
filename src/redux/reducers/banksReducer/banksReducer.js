const initialState = { banks: [] };

export const banksReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEND_REQUEST_BANKS":
      return { loading: true, banks: [] };
    case "SUCCESS_REQUEST_BANKS":
      return {
        loading: false,
        banks: action.payload,
      };
    default:
      return state;
  }
};
