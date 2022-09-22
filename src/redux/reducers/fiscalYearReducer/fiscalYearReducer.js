const initialState = {
  FiscalYear: [],
  addFiscalYear_Modal: false,
  editFiscalYear_Modal: false,
};

export const fiscalYearReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEND_REQUEST_FISCALYEAR":
      return { loading: true, FiscalYear: [] };
    case "SUCCESS_REQUEST_FISCALYEAR":
      return {
        loading: false,
        FiscalYear: action.payload,
      };
    case "َSHOW_ADD_FISCALYEAR_MODAL":
      return { ...state, addFiscalYear_Modal: true };
    case "CLOSE_ADD_FISCALYEAR_MODAL":
      return { ...state, addFiscalYear_Modal: false };
    case "َSHOW_EDIT_FISCALYEAR_MODAL":
      return { ...state, editFiscalYear_Modal: true };
    case "CLOSE_EDIT_FISCALYEAR_MODAL":
      return { ...state, editFiscalYear_Modal: false };
    default:
      return state;
  }
};
