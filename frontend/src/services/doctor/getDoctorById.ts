import { apiClient } from "../apiClient";

export const getDoctorById = async (id: number) => {
  return apiClient(`/doctor/${id}`, { method: "GET" });
};
