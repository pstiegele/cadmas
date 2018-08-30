const userReducer = (state = {
  username: "username",
  cameraImagesLast30Days: 0,
  overalldistance: 0,
  email:"email",
  firstname: "Firstname",
  lastname: "Lastname",
  registrationdate:"1970-01-01T00:00:00.000Z",
  thumbnailpath: "",
  userID: 0,
  mapIsShown: true
}, action) => {
 
  switch (action.type) {
    
    case "SET_USER":
      state = action.payload;
      break;
    case "DELETE_USER_DATA":
      state = null;
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
