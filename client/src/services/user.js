import api from "./api";

export const create = async (user) => {
  try {
    const res = await api().post("/users", user);

    return res ? res.data : {};
  } catch (error) {
    throw error;
  }
};
