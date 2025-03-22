import { apiClient } from "../apiClient";

interface data {
  accountName: string;
  password: string;
  prefix: string;
  firstName: string;
  lastName: string;
  personalId: string;
  gender: string;
  nationality: string;
  dob: string;
  height: number;
  weight: number;
  bloodGroup: string;
  phone: string;
  address: string;
  allergy: string;
}

export const createAccountPatient = async (data: data) => {
  return apiClient("/account", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
    }),
  });
};
