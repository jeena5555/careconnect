import { apiClient } from "../apiClient";

interface data {
  accountName: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
}

export const createAccountNurse = async (data: data) => {
  return apiClient("/nurse", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
