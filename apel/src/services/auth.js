export const isAuthenticated = () => {
  console.log(window.localStorage);
  if (window.localStorage.length === 0) {
    return false;
  } else return true;
};
