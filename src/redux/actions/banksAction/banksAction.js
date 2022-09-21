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

export const showAddBankModal = (dispatch) => {
  dispatch({ type: "َSHOW_ADD_BANK_MODAL" });
};

export const closeAddBankModal = (dispatch) => {
  dispatch({ type: "CLOSE_ADD_BANK_MODAL" });
};

export const showEditBankModal = (dispatch) => {
  dispatch({ type: "َSHOW_EDIT_BANK_MODAL" });
};

export const closeEditeBankModal = (dispatch) => {
  dispatch({ type: "CLOSE_EDIT_BANK_MODAL" });
};
