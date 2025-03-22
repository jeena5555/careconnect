import { apiClient } from "../apiClient";

export const getNurses = async () => {
  return apiClient(`/nurse`, { method: "GET" });
};
