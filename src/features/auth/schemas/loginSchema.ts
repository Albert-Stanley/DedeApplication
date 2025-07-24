import { z } from "zod";

const crmRegex = /^\d{4,6}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const LoginSchema = z.object({
  identifier: z
    .string()
    .min(1, "CRM ou Email é obrigatório")
    .refine((value) => {
      const isCRM = crmRegex.test(value);
      const isEmail = emailRegex.test(value);
      return isCRM || isEmail;
    }, "Digite um CRM válido (4-6 dígitos) ou um email válido"),

   Password: z
    .string()
    .min(8, "Senha deve ter pelo menos 8 caracteres")
    .max(100, "Senha deve ter no máximo 100 caracteres")
    .regex(/[A-Z]/, "Senha deve conter pelo menos uma letra maiúscula")
    .regex(/[a-z]/, "Senha deve conter pelo menos uma letra minúscula")
    .regex(/\d/, "Senha deve conter pelo menos um número"),
});

export type Login = z.infer<typeof LoginSchema>;
