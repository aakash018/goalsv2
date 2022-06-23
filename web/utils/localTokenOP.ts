export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  } else {
    return token;
  }
};
