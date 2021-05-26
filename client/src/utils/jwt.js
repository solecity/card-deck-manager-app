export const getJWT = () => {
  try {
    return localStorage.getItem("token");
  } catch (error) {
    throw error;
  }
};

export const setJWT = (token) => {
  try {
    localStorage.setItem("token", token);
  } catch (error) {
    throw error;
  }
};

export const clearJWT = () => {
  try {
    return localStorage.removeItem("token");
  } catch (error) {
    throw error;
  }
};
