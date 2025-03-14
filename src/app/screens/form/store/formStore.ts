import { create } from "zustand";
import { FormDataSchema } from "../schema/formSchema";

type FormState = Partial<FormDataSchema> & {
  setData: (data: Partial<FormDataSchema>) => void;
};

export const useFormStore = create<FormState>((set) => ({
  setData: (data) => {
    set((state) => ({
      ...state,
      ...data, // Combina os dados antigos com os novos
    }));
  },
}));
