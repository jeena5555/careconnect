import { apiClient } from "../apiClient";

export const getDepartmentById = async (id: number) => {
  return apiClient(`/department/${id}`, { method: "GET" });
};
