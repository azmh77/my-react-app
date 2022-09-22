import axios from "axios";

export const costCenterAction = async (dispatch) => {
  dispatch({ type: "SEND_REQUEST_COSTCENTER" });
  const response = await axios
    .get("http://37.32.26.0/api/CostCenter/0/0/1")
    .then((response) => {
      return response.data.entities;
    });
  let payload = response;
  dispatch({ type: "SUCCESS_REQUEST_COSTCENTER", payload });
};

export const showAddCostCenterModal = (dispatch) => {
  dispatch({ type: "َSHOW_ADD_COSTCENTER_MODAL" });
};

export const closeAddCostCenterModal = (dispatch) => {
  dispatch({ type: "CLOSE_ADD_COSTCENTER_MODAL" });
};

export const showEditCostCenterModal = (dispatch) => {
  dispatch({ type: "َSHOW_EDIT_COSTCENTER_MODAL" });
};

export const closeEditeCostCenterModal = (dispatch) => {
  dispatch({ type: "CLOSE_EDIT_COSTCENTER_MODAL" });
};
