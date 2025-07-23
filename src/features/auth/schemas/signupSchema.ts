import { z } from "zod";
import {
  formatCPF,
  formatCRM,
  formatRG,
  formatDataNascimento,
} from "@/utils/fieldFormatters";
import { isValidCPF, isValidDataNascimento } from "@/utils/validations";

// Regex patterns for validation
const crmRegex = /^\d{4,6}$/;
const rgRegex = /^\d{7,9}$/;

export const SignupSchema = z.object({
  CRM: z
    .string()
    .min(1, "CRM é obrigatório")
    .refine((val) => {
      const cleaned = val.replace(/\D/g, "");
      return crmRegex.test(cleaned);
    }, "CRM deve conter entre 4 e 6 dígitos"),

  RG: z
    .string()
    .min(1, "RG é obrigatório")
    .refine((val) => {
      const cleaned = val.replace(/\D/g, "");
      return rgRegex.test(cleaned);
    }, "RG deve conter entre 7 e 9 dígitos"),

  CPF: z
    .string()
    .min(1, "CPF é obrigatório")
    .refine(
      (val) => {
        const cleaned = val.replace(/\D/g, "");
        return cleaned.length === 11 && isValidCPF(cleaned);
      },
      {
        message: "CPF inválido. Formato esperado: 000.000.000-00.",
      }
    ),

  DataNascimento: z
    .string()
    .min(1, "Data de nascimento é obrigatória")
    .refine(
      (val) => {
        const cleaned = val.replace(/\D/g, "");
        return cleaned.length === 8 && isValidDataNascimento(cleaned);
      },
      {
        message: "Data de nascimento inválida. Formato esperado: DD/MM/AAAA.",
      }
    )
    .refine((val) => {
      const cleaned = val.replace(/\D/g, "");
      if (cleaned.length === 8) {
        const day = parseInt(cleaned.substr(0, 2));
        const month = parseInt(cleaned.substr(2, 2));
        const year = parseInt(cleaned.substr(4, 4));
        const birthDate = new Date(year, month - 1, day);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
          return age - 1 >= 18 && age - 1 <= 100;
        }
        return age >= 18 && age <= 100;
      }
      return false;
    }, "Você deve ter entre 18 e 100 anos"),

  Password: z
    .string()
    .min(8, "Senha deve ter pelo menos 8 caracteres")
    .max(100, "Senha deve ter no máximo 100 caracteres")
    .regex(/[A-Z]/, "Senha deve conter pelo menos uma letra maiúscula")
    .regex(/[a-z]/, "Senha deve conter pelo menos uma letra minúscula")
    .regex(/\d/, "Senha deve conter pelo menos um número"),
});

export type Signup = z.infer<typeof SignupSchema>;
