import { apiClient } from "../apiClient";

export const getInvoices = async () => {
  return apiClient(`/invoice`, { method: "GET" });
};
