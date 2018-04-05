export function setName(name) {
  return {type: "SET_NAME", payload: name};
}

export function setIsLoggedIn(isLoggedIn) {
  return {type: "SET_ISLOGGEDIN", payload: isLoggedIn};
}
