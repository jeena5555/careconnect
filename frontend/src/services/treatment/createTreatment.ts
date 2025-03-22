import { apiClient } from "../apiClient";

interface data {
  treatmentTypeId: number;
  details: string;
  diagnose: string;
  appointmentId: number;
}

export const createTreatment = async (data: data) => {
  return apiClient("/treatment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
