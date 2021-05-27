import api from "./api";

export const getCards = async (payload) => {
  try {
    const res = await api().get("/cards", payload);

    return res ? res.data : {};
  } catch (error) {
    throw error;
  }
};

export const getUserCards = async (payload) => {
  try {
    const res = await api().get("/cards/user", payload);

    return res ? res.data : {};
  } catch (error) {
    throw error;
  }
};

export const createCard = async (payload) => {
  try {
    const res = await api().post("/cards", payload);

    return res ? res.data : {};
  } catch (error) {
    throw error;
  }
};

export const deleteCard = async (id) => {
  try {
    const res = await api().delete(`/cards/${id}`);

    return res ? res.data : {};
  } catch (error) {
    throw error;
  }
};
