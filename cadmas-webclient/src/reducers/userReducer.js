const userReducer = (state = {
  name: "Paul",
  mapIsShown: true
}, action) => {
  switch (action.type) {
    case "SET_USER":
      state = {
        ...state,
        name: action.payload.username
      };
      break;
    case "SET_MAP_IS_SHOWN":
      state = {
        ...state,
        mapIsShown: action.payload
      };
      break;
    default:
      break;
  }
  return state;
};

export default userReducer;
