const wsReducer = (state = {
  ws: undefined
}, action) => {
  switch (action.type) {
    case "SET_WS":
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
