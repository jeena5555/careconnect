import { apiClient } from "../apiClient";

export const createInvoice = async (id: number) => {
  return apiClient(`/invoice/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
