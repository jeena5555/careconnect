import { apiClient } from "../apiClient";

export const getPrescriptions = async () => {
  return apiClient(`/prescription`, { method: "GET" });
};
