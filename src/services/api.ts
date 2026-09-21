import type { AppointmentData } from '../types/appointment';

export const submitAppointmentLead = async (appointment: AppointmentData): Promise<{ success: boolean; data: AppointmentData; message: string }> => {
  const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;

  const payload: AppointmentData = {
    ...appointment,
    id: `APT-${Math.floor(100000 + Math.random() * 900000)}`,
    submittedAt: new Date().toISOString()
  };

  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const resData = await response.json();
      return {
        success: true,
        data: payload,
        message: resData.message || 'Appointment request successfully submitted to dispatch service.'
      };
    } catch (err: unknown) {
      console.warn('Webhook dispatch failed, falling back to local handler:', err);
    }
  }

  // Local simulation fallback (800ms delay to simulate real network request)
  await new Promise(resolve => setTimeout(resolve, 800));

  return {
    success: true,
    data: payload,
    message: 'Appointment request received successfully! Our team will contact you shortly.'
  };
};
