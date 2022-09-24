const initialState = {
  guild: [],
  addGuild_Modal: false,
  editGuild_Modal: false,
};

export const guildReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEND_REQUEST_GUILD":
      return { loading: true, guild: [] };
    case "SUCCESS_REQUEST_GUILD":
      return {
        loading: false,
        guild: action.payload,
      };
    case "َSHOW_ADD_GUILD_MODAL":
      return { ...state, addGuild_Modal: true };
    case "CLOSE_ADD_GUILD_MODAL":
      return { ...state, addGuild_Modal: false };
    case "َSHOW_EDIT_GUILD_MODAL":
      return { ...state, editGuild_Modal: true };
    case "CLOSE_EDIT_GUILD_MODAL":
      return { ...state, editGuild_Modal: false };
    default:
      return state;
  }
};
