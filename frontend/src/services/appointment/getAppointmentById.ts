import { apiClient } from "../apiClient";

export const getAppointmentById = async (id: number) => {
  return apiClient(`/appointment/${id}`, { method: "GET" });
};
