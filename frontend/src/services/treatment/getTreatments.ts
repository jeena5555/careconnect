import { apiClient } from "../apiClient";

export const getTreatments = async () => {
  return apiClient(`/treatment`, { method: "GET" });
};
