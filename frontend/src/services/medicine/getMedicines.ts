import { apiClient } from "../apiClient";

export const getMedicines = async () => {
  return apiClient(`/medicine`, { method: "GET" });
};
