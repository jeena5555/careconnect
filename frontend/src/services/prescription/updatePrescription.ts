import { apiClient } from "../apiClient";

export const updatePrescription = async (id: number) => {
  return apiClient(`/prescription/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
