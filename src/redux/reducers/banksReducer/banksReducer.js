const initialState = { banks: [], addBank_Modal: false, editBank_Modal: false };

export const banksReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEND_REQUEST_BANKS":
      return { loading: true, banks: [] };
    case "SUCCESS_REQUEST_BANKS":
      return {
        loading: false,
        banks: action.payload,
      };
    case "َSHOW_ADD_BANK_MODAL":
      return { ...state, addBank_Modal: true };
    case "CLOSE_ADD_BANK_MODAL":
      return { ...state, addBank_Modal: false };
    case "َSHOW_EDIT_BANK_MODAL":
      return { ...state, editBank_Modal: true };
    case "CLOSE_EDIT_BANK_MODAL":
      return { ...state, editBank_Modal: false };
    default:
      return state;
  }
};
