export const isAuthenticated = () => {
  localStorage.removeItem(TOKEN_KEY);
};
