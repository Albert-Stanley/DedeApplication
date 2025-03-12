import { create } from "zustand";

interface FormState {
  patientData: any;
  updatePatientData: (newData: any) => void;
}

export const useFormStore = create<FormState>((set) => ({
  patientData: {},
  updatePatientData: (newData) =>
    set((state) => ({ patientData: { ...state.patientData, ...newData } })),
}));
