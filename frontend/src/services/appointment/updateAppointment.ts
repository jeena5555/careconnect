import { apiClient } from "../apiClient";

interface data {
  id: string;
  appointmentDate: Date;
  appointmentStartTime: string;
  appointmentEndTime: string;
  patientId: string;
  doctorId: string;
  symptom: string;
}

export const updateAppointment = async (data: data) => {
  return apiClient(`/appointment/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
      appointmentDate: data.appointmentDate.toISOString(),
    }),
  });
};
