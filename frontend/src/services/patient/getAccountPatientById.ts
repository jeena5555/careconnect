import { apiClient } from "../apiClient";

export const getAccountPatientById = async (id: number) => {
  return apiClient(`/patient/account/${id}`, { method: "GET" });
};
