import api from "./api";

export const fetchToken = async ({ username, password }) => {
  try {
    const res = await api().post("/token/", { username, password });

    console.log(res);

    return res ? res.data : {};
  } catch (error) {
    return error;
  }
};
