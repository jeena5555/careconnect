import { apiClient } from "../apiClient";

export const getTreatmentType = async () => {
  return apiClient(`/treatmenttype`, { method: "GET" });
};
