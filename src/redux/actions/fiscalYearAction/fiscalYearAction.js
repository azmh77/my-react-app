import axios from "axios";

export const fiscalYearAction = async (dispatch) => {
  dispatch({ type: "SEND_REQUEST_FISCALYEAR" });
  const response = await axios
    .get("http://37.32.26.0/api/FiscalYear/0/0/1")
    .then((response) => {
      return response.data.entities;
    });
  let payload = response;
  dispatch({ type: "SUCCESS_REQUEST_FISCALYEAR", payload });
};

export const showAddFiscalYearModal = (dispatch) => {
  dispatch({ type: "َSHOW_ADD_FISCALYEAR_MODAL" });
};

export const closeAddFiscalYearModal = (dispatch) => {
  dispatch({ type: "CLOSE_ADD_FISCALYEAR_MODAL" });
};

export const showEditFiscalYearModal = (dispatch) => {
  dispatch({ type: "َSHOW_EDIT_FISCALYEAR_MODAL" });
};

export const closeEditeFiscalYearModal = (dispatch) => {
  dispatch({ type: "CLOSE_EDIT_FISCALYEAR_MODAL" });
};
