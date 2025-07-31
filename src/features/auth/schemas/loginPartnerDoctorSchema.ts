import { z } from "zod";

const crmRegex = /^[A-Z]{2}\s?\d{4,6}$/i; // Formato: SP 123456 ou SP123456
const hospitalNameRegex = /^[a-zA-ZÀ-ÿ\s.-]{3,100}$/; // Nomes de hospital válidos

export const LoginPartnerDoctorSchema = z.object({
  crm: z
    .string()
    .min(1, "CRM é obrigatório")
    .refine((value) => {
      const cleanCRM = value.replace(/\s/g, "").toUpperCase();
      return crmRegex.test(cleanCRM);
    }, "Digite um CRM válido (ex: SP123456)"),

  password: z
    .string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .max(100, "Senha deve ter no máximo 100 caracteres"),

  hospitalName: z
    .string()
    .min(3, "Nome do hospital é obrigatório")
    .max(100, "Nome do hospital deve ter no máximo 100 caracteres")
    .refine((value) => {
      return hospitalNameRegex.test(value.trim());
    }, "Digite um nome de hospital válido"),
});

export type LoginPartnerDoctor = z.infer<typeof LoginPartnerDoctorSchema>;
