const wsReducer = (state = {
  ws: "Ws"
}, action) => {
  switch (action.type) {
    case "SET_WS":
      state = {
        ...state,
        ws: action.payload
      };
      break;
    case "SET_WS2":
      state = {
        ...state,
        ws: action.payload
      };
      break;
    default:
      break;
  }
  return state;
};

export default wsReducer;
