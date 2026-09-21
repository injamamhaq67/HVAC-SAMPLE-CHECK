export interface AppointmentData {
  id?: string;
  name: string;
  phone: string;
  email: string;
  zipCode: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
  address?: string;
  smsTrackingAlerts?: boolean;
  submittedAt?: string;
}

export type ServiceType = 
  | 'AC Repair'
  | 'Furnace / Heating'
  | 'Routine Tune-Up & Maintenance'
  | 'New System Installation'
  | 'Emergency 24/7'
  | 'Refrigeration Install';

export interface FormState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
  appointmentSummary: AppointmentData | null;
}
