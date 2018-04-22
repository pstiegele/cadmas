export function setUser(user) {
  return {type: "SET_USER", payload: user};
}

export function setMapIsShown(mapIsShown) {
  return {type: "SET_MAP_IS_SHOWN", payload: mapIsShown};
}
