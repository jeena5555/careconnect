import { apiClient } from "../apiClient";

export const getAppointmentByPatient = async (id: number) => {
  return apiClient(`/appointment/patient/${id}`, { method: "GET" });
};
