import api from "./api";

export const getStocks = () => api.get("/stocks");

export const addStock = (stock) => api.post("/stocks", stock);

export const deleteStock = (id) => api.delete(`/stocks/${id}`);
