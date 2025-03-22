import { apiClient } from "../apiClient";

export const getPatientById = async (id: number) => {
  return apiClient(`/patient/${id}`, { method: "GET" });
};
