import { apiClient } from "../apiClient";

interface data {
  accountName: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  shiftDay: Date;
  shiftTime: string;
  endTime: string;
  description: string;
  department: number;
}

export const createAccountDoctor = async (data: data) => {
  return apiClient("/doctor", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
      shiftDay: data.shiftDay.toISOString(),
    }),
  });
};
