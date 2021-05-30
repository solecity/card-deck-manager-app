import api from "./api";

export const getUsers = async () => {
  try {
    const res = await api().get("/users");

    return res ? res.data : {};
  } catch (error) {
    throw error;
  }
};

export const getUser = async (id) => {
  try {
    const res = await api().get(`/users/${id}`);

    return res ? res.data : {};
  } catch (error) {
    throw error;
  }
};

export const createUser = async (payload) => {
  try {
    const res = await api().post("/users", payload);

    return res ? res.data : {};
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (id, payload) => {
  try {
    const res = await api().patch(`/users/${id}`, payload);

    return res ? res.data : {};
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const res = await api().delete(`/users/${id}`);

    return res ? res.data : {};
  } catch (error) {
    throw error;
  }
};
