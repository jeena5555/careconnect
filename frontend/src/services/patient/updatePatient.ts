import { apiClient } from "../apiClient";

interface data {
  id: string;
  prefix: string;
  firstName: string;
  lastName: string;
  personalId: string;
  gender: string;
  nationality: string;
  dob: string;
  height: string;
  weight: string;
  bloodGroup: string;
  phone: string;
  address: string;
  allergy: string;
}

export const updatePatient = async (data: data) => {
  return apiClient(`/patient/${Number(data.id)}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
    }),
  });
};
