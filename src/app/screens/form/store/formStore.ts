import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { FormDataSchema } from "../schema/formSchema";

type FormState = Partial<FormDataSchema> & {
  setData: (data: Partial<FormDataSchema>) => void;
};

// Custom hook for storage the data form
export const useFormStore = create<FormState>()(
  persist(
    (set) => ({
      setData: (data) => {
        set((state) => ({
          ...state,
          ...data, // Combina os dados antigos com os novos
        }));
      },
    }),
    {
      name: "multi-step-form-storage",
      storage: createJSONStorage(() => localStorage), // make ready also for mobile
    }
  )
);
