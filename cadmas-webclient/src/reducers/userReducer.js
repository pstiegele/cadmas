const userReducer = (state = {
  username: "username",
  mapIsShown: true
}, action) => {
 
  switch (action.type) {
    
    case "SET_USER":
      state = {
        ...state,
        username: action.payload.username,
        registrationdate: action.payload.registrationdate,
        email: action.payload.email,
        thumbnailpath: action.payload.thumbnailpath,
        firstname: action.payload.firstname,
        lastname: action.payload.lastname
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
