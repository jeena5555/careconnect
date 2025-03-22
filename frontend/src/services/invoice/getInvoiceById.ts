import { apiClient } from "../apiClient";

export const getInvoiceById = async (id: number) => {
  return apiClient(`/invoice/${id}`, { method: "GET" });
};
