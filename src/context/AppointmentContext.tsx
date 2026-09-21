import React, { createContext, useContext, useState } from 'react';
import type { AppointmentData } from '../types/appointment';

interface AppointmentContextType {
  isModalOpen: boolean;
  openModal: (service?: string) => void;
  closeModal: () => void;
  isSuccessOpen: boolean;
  openSuccessModal: (data: AppointmentData) => void;
  closeSuccessModal: () => void;
  lastBooking: AppointmentData | null;
  selectedService: string;
  setSelectedService: (service: string) => void;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const AppointmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [lastBooking, setLastBooking] = useState<AppointmentData | null>(null);
  const [selectedService, setSelectedService] = useState<string>('AC Repair');

  const openModal = (service?: string) => {
    if (service) {
      setSelectedService(service);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openSuccessModal = (data: AppointmentData) => {
    setLastBooking(data);
    setIsModalOpen(false);
    setIsSuccessOpen(true);
  };

  const closeSuccessModal = () => {
    setIsSuccessOpen(false);
  };

  return (
    <AppointmentContext.Provider
      value={{
        isModalOpen,
        openModal,
        closeModal,
        isSuccessOpen,
        openSuccessModal,
        closeSuccessModal,
        lastBooking,
        selectedService,
        setSelectedService,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointment = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('useAppointment must be used within an AppointmentProvider');
  }
  return context;
};
