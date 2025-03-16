import { z } from "zod";

export const formSchema = z.object({
  // Step 1: Dados do Paciente
  NomePaciente: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  DataVisita: z
    .string()
    .regex(/^(\d{2})\/(\d{2})\/(\d{4})$/, "Formato de data inválido") // Regex para validar o formato dd/mm/aaaa
    .refine(
      (value) => {
        const [day, month, year] = value.split("/").map(Number);
        const date = new Date(year, month - 1, day); // Meses começam em 0, então subtrai 1
        return (
          date.getFullYear() === year &&
          date.getMonth() + 1 === month &&
          date.getDate() === day
        ); // Verifica se a data é válida
      },
      {
        message: "Data inválida",
      }
    ),
  HospitalName: z.string(),
  MedicoDiarista: z.string(),
  Saps3: z.string(),
  DihUti: z.string(),
  Diagnostico: z.string().min(3, "Diagnóstico obrigatório"),
  FerramentasDiagnosticasPendentes: z.string(),

  // Step 2: Nutrição e Função Intestinal
  AporteNutricional: z.string(),
  ProgredirDieta: z.enum(["Sim", "Não"]),
  SuspenderDieta: z.enum(["Sim", "Não"]),
  AntiemeticosOuCineticos: z.enum(["Sim", "Não"]),
  EvacuacaoUltimas48h: z.enum(["Sim", "Não"]),
  AjusteNutricional: z.string(),

  // Step 3: Sedação, Dor e Drogas Vasoativas
  Analgesicos: z.string(),
  AjusteAnalgesia: z.string(),
  Sedacao: z.string(),
  RassAlvo: z.string(),
  DespertarDiario: z.enum(["Sim", "Não"]),
  Delirium: z.enum(["Sim", "Não"]),
  AjusteSedacao: z.string(),
  DrogasVasoativas: z.string(),
  AjusteDrogasVasoativas: z.string(),

  // Step 4: Controle Metabólico e Infecções
  Hipoglicemia: z.enum(["Sim", "Não"]),
  HiperglicemiaMaisDeDoisEpisodios: z.enum(["Sim", "Não"]),
  Insulina24h: z.string(),
  AjusteGlicemico: z.string(),
  Ira: z.enum(["Sim", "Não"]),
  BalancoHidrico: z.string(),
  CorrecaoEletronicos: z.string(),
  CriterioUrgenciaHD: z.enum(["Sim", "Não"]),
  ObsDisturbios: z.string(),

  // Step 5: Antibioticoterapia e Hemoterapia
  Transfusao: z.enum(["Sim", "Não"]),
  TipoTransfusao: z.string().optional(),
  ObsHemoterapia: z.string(),
  Antibiotico: z.string(),
  EscalonarAntibiotico: z.enum(["Sim", "Não"]),
  ObsAntibiotico: z.string(),
  SolicitarCulturas: z.enum(["Sim", "Não"]),

  // Step 6: Cuidados Paliativos e Alta
  TipoCultura: z.string(),
  ObsCulturas: z.string(),
  SuspensaoTerapias: z.enum(["Sim", "Não"]),
  ObsSuspensao: z.string(),
  ExamesPendentes: z.string(),
  AgendamentoExames: z.string(),
  Especialidades: z.string(),
  CuidadosPaliativos: z.enum(["Sim", "Não"]),
  FamiliaresCientes: z.enum(["Sim", "Não"]),
  ObsPaliativos: z.string(),
  AltaUTI: z.string(),
});

export type FormDataSchema = z.infer<typeof formSchema>;
