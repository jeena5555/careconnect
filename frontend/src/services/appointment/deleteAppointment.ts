import { apiClient } from "../apiClient";

export const deleteAppointment = async (id: number) => {
  return apiClient(`/appointment/${id}`, {
    method: "DELETE",
  });
};
