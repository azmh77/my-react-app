const initialState = {
  project: [],
  addProject_Modal: false,
  editProject_Modal: false,
};

export const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEND_REQUEST_PROJECT":
      return { loading: true, project: [] };
    case "SUCCESS_REQUEST_PROJECT":
      return {
        loading: false,
        project: action.payload,
      };
    case "َSHOW_ADD_PROJECT_MODAL":
      return { ...state, addProject_Modal: true };
    case "CLOSE_ADD_PROJECT_MODAL":
      return { ...state, addProject_Modal: false };
    case "َSHOW_EDIT_PROJECT_MODAL":
      return { ...state, editProject_Modal: true };
    case "CLOSE_EDIT_PROJECT_MODAL":
      return { ...state, editProject_Modal: false };
    default:
      return state;
  }
};
