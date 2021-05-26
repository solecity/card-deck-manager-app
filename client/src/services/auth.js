import api from "./api";

export const login = async ({ username, password }) => {
  const res = await api().post("/token/login", { username, password });

  return res ? res.data : {};
};
