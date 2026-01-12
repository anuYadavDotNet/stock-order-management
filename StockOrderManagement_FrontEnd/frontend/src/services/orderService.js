import api from "./api";

export const getOrders = () => api.get("/orders");

export const addOrder = (order) => api.post("/orders", order);

export const deleteOrder = (id) => api.delete(`/orders/${id}`);
