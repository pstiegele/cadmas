const userReducer = (state = {
  name: "",
  isLoggedIn: false
}, action) => {
  switch (action.type) {
    case "SET_NAME":
      state = {
        ...state,
        name: action.payload
      };
      break;
    case "SET_ISLOGGEDIN":
      state = {
        ...state,
        isLoggedIn: action.payload
      };
      break;
    default:
      break;
  }
  return state;
};

export default userReducer;
