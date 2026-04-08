export const setUser = (data) => {
  localStorage.setItem("user", data);
};

export const getUser = () => {
  return localStorage.getItem("user");
};

export const logout = () => {
  localStorage.removeItem("user");
};