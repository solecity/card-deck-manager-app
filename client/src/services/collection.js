import api from "./api";

export const getCollections = async () => {
  try {
    const res = await api().get("/collections");

    return res ? res.data : {};
  } catch (error) {
    throw error;
  }
};

export const getUserCollections = async (payload) => {
  try {
    const res = await api().get("/collections/user", payload);

    return res ? res.data : {};
  } catch (error) {
    throw error;
  }
};

export const getCollection = async (id) => {
  try {
    const res = await api().get(`/collections/${id}`);

    return res ? res.data : {};
  } catch (error) {
    throw error;
  }
};

export const createCollection = async (payload) => {
  try {
    const res = await api().post("/collections", payload);

    return res ? res.data : {};
  } catch (error) {
    throw error;
  }
};

export const updateCollection = async (id, payload) => {
  try {
    const res = await api().put(`/collections/${id}`, payload);

    return res ? res.data : {};
  } catch (error) {
    throw error;
  }
};

export const updateCollectionCards = async (id, payload) => {
  try {
    const res = await api().patch(`/collections/${id}`, payload);

    return res ? res.data : {};
  } catch (error) {
    throw error;
  }
};

export const deleteCollection = async (id) => {
  try {
    const res = await api().delete(`/collections/${id}`);

    return res ? res.data : {};
  } catch (error) {
    throw error;
  }
};
