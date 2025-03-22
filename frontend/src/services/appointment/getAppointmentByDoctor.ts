import { apiClient } from "../apiClient";

export const getAppointmentByDoctor = async (id: number) => {
  return apiClient(`/appointment/doctor/${id}`, { method: "GET" });
};
