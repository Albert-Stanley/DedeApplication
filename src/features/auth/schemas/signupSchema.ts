import { z } from "zod";
import {
  formatCPF,
  formatCNPJ,
  formatDataNascimento,
} from "@/utils/fieldFormatters";
import {
  isValidCPF,
  isValidCNPJ,
  isValidDataNascimento,
} from "@/utils/validations";

export const SignupSchema = z
  .object({
    Name: z
      .string()
      .min(1, "O nome é obrigatório.")
      .max(100, "O nome deve ter no máximo 100 caracteres.")
      .regex(
        /^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/,
        "O nome não pode conter números ou caracteres especiais."
      )
      .trim(),

    CPF: z
      .string()
      .refine(
        (val) => {
          const cleaned = val.replace(/\D/g, "");
          return cleaned.length === 11 && isValidCPF(cleaned);
        },
        {
          message: "CPF inválido. Formato esperado: 111.111.111-11.",
        }
      )
      .transform((val) => {
        const cleaned = val.replace(/\D/g, "");
        return formatCPF(cleaned);
      }),

    CNPJ: z
      .string()
      .refine(
        (val) => {
          const cleaned = val.replace(/\D/g, "");
          return cleaned.length === 14 && isValidCNPJ(cleaned);
        },
        {
          message: "CNPJ inválido. Formato esperado: 11.111.111/1111-11.",
        }
      )
      .transform((val) => {
        const cleaned = val.replace(/\D/g, "");
        return formatCNPJ(cleaned);
      }),

    DataNascimento: z
      .string()
      .refine(
        (val) => {
          const cleaned = val.replace(/\D/g, "");
          return cleaned.length === 8 && isValidDataNascimento(cleaned);
        },
        {
          message: "Data de nascimento inválida. Formato esperado: dd/mm/aaaa.",
        }
      )
      .transform((val) => {
        const cleaned = val.replace(/\D/g, "");
        return formatDataNascimento(cleaned);
      }),

    CRM: z
      .string()
      .min(1, "O CRM é obrigatório.")
      .max(10, "O CRM deve ter no máximo 10 caracteres.")
      .regex(/^\d+$/, "O CRM deve conter apenas números.")
      .length(10, "O CRM deve ter exatamente 10 caracteres.")
      .trim(),

    HospitalName: z
      .string()
      .min(1, "O nome do hospital é obrigatório.")
      .max(100, "O nome do hospital deve ter no máximo 100 caracteres.")
      .trim(),

    UF: z
      .string()
      .length(2, "Por favor, selecione sua UF.")
      .refine((uf) => uf.includes(uf.toUpperCase()), {
        message: "UF inválida. Escolha uma UF válida.",
      }),

    Email: z
      .string()
      .email("E-mail inválido.")
      .min(5, "O E-mail é obrigatório.")
      .max(150, "Máximo de 150 caracteres."),

    Password: z
      .string()
      .min(6, "A senha deve ter pelo menos 6 caracteres.")
      .max(100, "A senha deve ter no máximo 100 caracteres.")
      .regex(/[A-Z]/, "A senha deve conter ao menos uma letra maiúscula.")
      .regex(/[0-9]/, "A senha deve conter ao menos um número.")
      .regex(/[\W_]/, "A senha deve conter ao menos um caractere especial.")
      .trim(),

    ConfirmPassword: z
      .string()
      .min(6, "A senha deve ter pelo menos 6 caracteres.")
      .max(100, "A senha deve ter no máximo 100 caracteres.")
      .regex(/[A-Z]/, "A senha deve conter ao menos uma letra maiúscula.")
      .regex(/[0-9]/, "A senha deve conter ao menos um número.")
      .regex(/[\W_]/, "A senha deve conter ao menos um caractere especial.")
      .trim(),

    isTermsAccepted: z.boolean().refine((val) => val === true, {
      message: "Você deve aceitar os termos de uso.",
    }),
  })
  .refine((data) => data.Password === data.ConfirmPassword, {
    message: "As senhas não coincidem.",
    path: ["ConfirmPassword"], // Campo que receberá a mensagem de erro
  });

export type Signup = z.infer<typeof SignupSchema>;
