import api from "./api";

export const fetchToken = async ({ username, password }) => {
  try {
    const res = await api().post("/token", { username, password });

    return res ? res.data : {};
  } catch (error) {
    return error;
  }
};

export const getMe = async ({ id }) => {
  try {
    const res = await api().get(`/users/${id}`);

    return res ? res.data : {};
  } catch (error) {
    throw error;
  }
};
