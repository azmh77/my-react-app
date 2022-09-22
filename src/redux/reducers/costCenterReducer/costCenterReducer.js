const initialState = {
  CostCenter: [],
  addCostCenter_Modal: false,
  editCostCenter_Modal: false,
};

export const costCenterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEND_REQUEST_COSTCENTER":
      return { loading: true, CostCenter: [] };
    case "SUCCESS_REQUEST_COSTCENTER":
      return {
        loading: false,
        CostCenter: action.payload,
      };
    case "َSHOW_ADD_COSTCENTER_MODAL":
      return { ...state, addCostCenter_Modal: true };
    case "CLOSE_ADD_COSTCENTER_MODAL":
      return { ...state, addCostCenter_Modal: false };
    case "َSHOW_EDIT_COSTCENTER_MODAL":
      return { ...state, editCostCenter_Modal: true };
    case "CLOSE_EDIT_COSTCENTER_MODAL":
      return { ...state, editCostCenter_Modal: false };
    default:
      return state;
  }
};
