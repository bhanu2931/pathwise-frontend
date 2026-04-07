export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

export const getUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

export const logout = () => {
  localStorage.clear();
  window.location.href = "/";
};
