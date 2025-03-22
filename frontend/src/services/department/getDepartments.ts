import { apiClient } from "../apiClient";

export const getDepartments = async () => {
  return apiClient("/department", { method: "GET" });
};
