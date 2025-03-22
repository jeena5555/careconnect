import { apiClient } from "../apiClient";

export const getPatients = async () => {
  return apiClient(`/patient`, { method: "GET" });
};
