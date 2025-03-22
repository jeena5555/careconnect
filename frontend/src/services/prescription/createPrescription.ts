import { apiClient } from "../apiClient";

interface Medicine {
  medicineId: number;
  quantity: number;
  duration: number;
}

interface data {
  prescriptionDetail: string;
  appointmentId: number;
  medicines: Medicine[];
}

export const createPrescription = async (data: data) => {
  return apiClient("/prescription", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
