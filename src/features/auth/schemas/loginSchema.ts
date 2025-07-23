import { z } from "zod";

const crmRegex = /^\d{4,6}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const LoginSchema = z.object({
  identifier: z
    .string()
    .min(1, "CRM ou Email é obrigatório")
    .refine((value) => {
      // Remove formatação para validar CRM
      const cleanValue = value.replace(/\D/g, "");
      return crmRegex.test(cleanValue) || emailRegex.test(value);
    }, "Digite um CRM válido (4-6 dígitos) ou um email válido"),

  Password: z.string().min(1, "Senha é obrigatória"),
});

export type Login = z.infer<typeof LoginSchema>;
