import { apiClient } from "../apiClient";

export const getAppointments = async () => {
  return apiClient("/appointment", { method: "GET" });
};
