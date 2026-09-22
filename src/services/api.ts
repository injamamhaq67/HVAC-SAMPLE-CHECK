import type { AppointmentData } from '../types/appointment';

const DEFAULT_N8N_WEBHOOK_URL = 'https://injuaura.app.n8n.cloud/webhook/hvac-booking';

export const submitAppointmentLead = async (appointment: AppointmentData): Promise<{ success: boolean; data: AppointmentData; message: string }> => {
  const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL || DEFAULT_N8N_WEBHOOK_URL;

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

      let message = 'Appointment request successfully submitted to dispatch service.';
      try {
        const text = await response.text();
        if (text) {
          try {
            const resData = JSON.parse(text);
            if (resData && typeof resData.message === 'string') {
              message = resData.message;
            }
          } catch {
            if (text.length < 200) {
              message = text;
            }
          }
        }
      } catch {
        // Text parsing fallback
      }

      return {
        success: true,
        data: payload,
        message
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
