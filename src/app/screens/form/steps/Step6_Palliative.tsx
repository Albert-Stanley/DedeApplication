import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formSchema } from "../schema/formSchema";
import { z } from "zod";
import { SafeAreaView, ScrollView } from "react-native";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import FormInput from "../components/FormInput";
import GoBackArrow from "@/components/common/goBackArrow";
import { useFormStore } from "../store/formStore";
import NextButton from "../components/NextButton";
import React from "react";
import ProgressBar from "../components/ProgressBar";
import FormRadio from "../components/FormRadio";
import BackButton from "../components/BackButton";
import { HStack } from "@/components/ui/hstack";

const PalliativeSchema = formSchema.pick({
  TipoCultura: true,
  ObsCulturas: true,
  SuspensaoTerapias: true,
  ObsSuspensao: true,
  ExamesPendentes: true,
  AgendamentoExames: true,
  Especialidades: true,
  CuidadosPaliativos: true,
  FamiliaresCientes: true,
  ObsPaliativos: true,
  AltaUTI: true,
});

type PalliativeFormData = z.infer<typeof PalliativeSchema>;

const Palliative = () => {
  const setData = useFormStore((state) => state.setData);
  const TipoCultura = useFormStore((state) => state.TipoCultura);
  const ObsCulturas = useFormStore((state) => state.ObsCulturas);
  const SuspensaoTerapias = useFormStore((state) => state.SuspensaoTerapias);
  const ObsSuspensao = useFormStore((state) => state.ObsSuspensao);
  const ExamesPendentes = useFormStore((state) => state.ExamesPendentes);
  const AgendamentoExames = useFormStore((state) => state.AgendamentoExames);
  const Especialidades = useFormStore((state) => state.Especialidades);
  const CuidadosPaliativos = useFormStore((state) => state.CuidadosPaliativos);
  const FamiliaresCientes = useFormStore((state) => state.FamiliaresCientes);
  const ObsPaliativos = useFormStore((state) => state.ObsPaliativos);
  const AltaUTI = useFormStore((state) => state.AltaUTI);

  const defaultValues = React.useMemo(
    () => ({
      TipoCultura: TipoCultura,
      ObsCulturas: ObsCulturas,
      SuspensaoTerapias: SuspensaoTerapias,
      ObsSuspensao: ObsSuspensao,
      ExamesPendentes: ExamesPendentes,
      AgendamentoExames: AgendamentoExames,
      Especialidades: Especialidades,
      CuidadosPaliativos: CuidadosPaliativos,
      FamiliaresCientes: FamiliaresCientes,
      ObsPaliativos: ObsPaliativos,
      AltaUTI: AltaUTI,
    }),
    [
      TipoCultura,
      ObsCulturas,
      SuspensaoTerapias,
      ObsSuspensao,
      ExamesPendentes,
      AgendamentoExames,
      Especialidades,
      CuidadosPaliativos,
      FamiliaresCientes,
      ObsPaliativos,
      AltaUTI,
    ]
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PalliativeFormData>({
    resolver: zodResolver(PalliativeSchema),
    defaultValues: defaultValues,
  });

  // Adicione este log para ver os erros de validação no console
  console.log("Erros de Validação RHF:", errors);

  const onSubmit = (data: PalliativeFormData) => {
    console.log("Dados da etapa 6: ", data);
    setData(data); // Atualiza o estado com os novos dados

    const estadoCompleto = useFormStore.getState();
    console.log("Todos os dados do formulário: ", estadoCompleto);
  };

  return (
    <SafeAreaView className="flex-1 bg-background-50">
      <GoBackArrow destinationRoute="/screens/form/steps/Step5_Antibiotics" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Box className="flex-1 justify-center items-center px-4 space-y-1">
          <VStack space="sm" className="w-full max-w-lg p-6">
            <ProgressBar value={100} step={"6/6"} />
            <FormInput
              control={control}
              name="TipoCultura"
              label="Tipo de Cultura"
              size="lg"
              errors={errors.TipoCultura?.message}
              placeholder="Digite o tipo de cultura"
            />
            <FormInput
              control={control}
              name="ObsCulturas"
              label="Observações sobre Culturas"
              size="lg"
              errors={errors.ObsCulturas?.message}
              placeholder="Digite observações sobre culturas"
            />
            <FormRadio
              control={control}
              name="SuspensaoTerapias"
              label="Suspensão de Terapias"
              size="lg"
              options={[
                { label: "Sim", value: "Sim" },
                { label: "Não", value: "Não" },
              ]}
              errors={errors.SuspensaoTerapias?.message}
            />
            <FormInput
              control={control}
              name="ObsSuspensao"
              label="Observações sobre Suspensão"
              size="lg"
              errors={errors.ObsSuspensao?.message}
              placeholder="Digite observações sobre suspensão"
            />
            <FormInput
              control={control}
              name="ExamesPendentes"
              label="Exames Pendentes"
              size="lg"
              errors={errors.ExamesPendentes?.message}
              placeholder="Digite exames pendentes"
            />
            <FormInput
              control={control}
              name="AgendamentoExames"
              label="Agendamento de Exames"
              size="lg"
              errors={errors.AgendamentoExames?.message}
              placeholder="Digite agendamento de exames"
            />
            <FormInput
              control={control}
              name="Especialidades"
              label="Especialidades"
              size="lg"
              errors={errors.Especialidades?.message}
              placeholder="Digite especialidades"
            />
            <FormRadio
              control={control}
              name="CuidadosPaliativos"
              label="Cuidados Paliativos"
              size="lg"
              options={[
                { label: "Sim", value: "Sim" },
                { label: "Não", value: "Não" },
              ]}
              errors={errors.CuidadosPaliativos?.message}
            />
            <FormRadio
              control={control}
              name="FamiliaresCientes"
              label="Familiares Cientes"
              size="lg"
              options={[
                { label: "Sim", value: "Sim" },
                { label: "Não", value: "Não" },
              ]}
              errors={errors.FamiliaresCientes?.message}
            />
            <FormInput
              control={control}
              name="ObsPaliativos"
              label="Observações sobre Cuidados Paliativos"
              size="lg"
              errors={errors.ObsPaliativos?.message}
              placeholder="Digite observações sobre cuidados paliativos"
            />
            <FormRadio
              control={control}
              name="AltaUTI"
              label="Alta da UTI"
              size="lg"
              options={[
                { label: "Sim", value: "Sim" },
                { label: "Não", value: "Não" },
              ]}
              errors={errors.AltaUTI?.message}
            />
            <VStack className="justify-between">
              <NextButton
                onPress={handleSubmit(onSubmit)}
                isPending={isSubmitting}
              />
              <BackButton destinationRoute="/screens/form/steps/Step5_Antibiotics" />
            </VStack>
          </VStack>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Palliative;
