import { apiClient } from "../apiClient";

export const getDoctors = async () => {
  return apiClient("/doctor", { method: "GET" });
};
