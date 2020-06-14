export const isAuthenticated = () => {
  if (localStorage.getItem("CurrentUser") == null) {
    return false;
  } else return true;
};
