import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formSchema } from "../schema/formSchema";
import { z } from "zod";
import { useRouter } from "expo-router";
import { SafeAreaView, ScrollView } from "react-native";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import FormInput from "../components/FormInput";
import { useFormStore } from "../store/formStore";
import NextButton from "../components/NextButton";
import React from "react";
import ProgressBar from "../components/ProgressBar";
import FormRadio from "../components/FormRadio";
import BackButton from "../components/BackButton";
import CustomHeader from "@/components/common/CustomHeader";

const SedationSchema = formSchema.pick({
  Analgesicos: true,
  AjusteAnalgesia: true,
  Sedacao: true,
  RassAlvo: true,
  DespertarDiario: true,
  Delirium: true,
  AjusteSedacao: true,
  DrogasVasoativas: true,
  AjusteDrogasVasoativas: true,
});

type SedationFormData = z.infer<typeof SedationSchema>;

const Sedation = () => {
  const router = useRouter();
  const setData = useFormStore((state) => state.setData);
  const Analgesicos = useFormStore((state) => state.Analgesicos);
  const AjusteAnalgesia = useFormStore((state) => state.AjusteAnalgesia);
  const Sedacao = useFormStore((state) => state.Sedacao);
  const RassAlvo = useFormStore((state) => state.RassAlvo);
  const DespertarDiario = useFormStore((state) => state.DespertarDiario);
  const Delirium = useFormStore((state) => state.Delirium);
  const AjusteSedacao = useFormStore((state) => state.AjusteSedacao);
  const DrogasVasoativas = useFormStore((state) => state.DrogasVasoativas);
  const AjusteDrogasVasoativas = useFormStore(
    (state) => state.AjusteDrogasVasoativas
  );

  const defaultValues = React.useMemo(
    () => ({
      Analgesicos: Analgesicos,
      AjusteAnalgesia: AjusteAnalgesia,
      Sedacao: Sedacao,
      RassAlvo: RassAlvo,
      DespertarDiario: DespertarDiario,
      Delirium: Delirium,
      AjusteSedacao: AjusteSedacao,
      DrogasVasoativas: DrogasVasoativas,
      AjusteDrogasVasoativas: AjusteDrogasVasoativas,
    }),
    [
      Analgesicos,
      AjusteAnalgesia,
      Sedacao,
      RassAlvo,
      DespertarDiario,
      Delirium,
      AjusteSedacao,
      DrogasVasoativas,
      AjusteDrogasVasoativas,
    ]
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SedationFormData>({
    resolver: zodResolver(SedationSchema), // Usando o schema de validação correto
    defaultValues: defaultValues,
  });

  const onSubmit = (data: SedationFormData) => {
    setData(data); // Salvando os dados no estado global
    console.log("Dados da etapa 3: ", data); // Verificando os dados da fase atual
    router.push("/medical-form/Step4");
  };

  return (
    <SafeAreaView className="flex-1 screen-bg">
      <CustomHeader
        title="Formulário Médico - Etapa 3/6"
        showBackButton={true}
        showThemeToggle={true}
        titleColor="text-primary"
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Box className="flex-1 justify-center items-center px-4 space-y-1">
          <VStack space="sm" className="w-full max-w-lg p-6">
            <ProgressBar value={50} step={"3/6"} />
            <FormInput
              control={control}
              name="Analgesicos"
              label="Analgésicos"
              errors={errors.Analgesicos}
              placeholder="Ex: Dipirona 1g EV 6/6h"
            />
            <FormInput
              control={control}
              name="AjusteAnalgesia"
              label="Ajuste da Analgesia"
              errors={errors.AjusteAnalgesia}
              placeholder="Ex: Escala de dor"
            />
            <FormInput
              control={control}
              name="Sedacao"
              label="Sedação"
              errors={errors.Sedacao}
              placeholder="Ex: Midazolam 0,05mg/kg/h"
            />
            <FormInput
              control={control}
              name="RassAlvo"
              label="RASS Alvo"
              errors={errors.RassAlvo}
              placeholder="Ex: -2 a 0"
            />
            <FormRadio
              size="lg"
              control={control}
              name="DespertarDiario"
              label="Despertar Diário"
              errors={errors.DespertarDiario}
              options={[
                { label: "Sim", value: "Sim" },
                { label: "Não", value: "Não" },
              ]}
            />
            <FormRadio
              size="lg"
              control={control}
              name="Delirium"
              label="Delirium"
              errors={errors.Delirium}
              options={[
                { label: "Sim", value: "Sim" },
                { label: "Não", value: "Não" },
              ]}
            />
            <FormInput
              control={control}
              name="AjusteSedacao"
              label="Ajuste da Sedação"
              errors={errors.AjusteSedacao}
              placeholder="Ex: Escala de sedação"
            />
            <FormInput
              control={control}
              name="DrogasVasoativas"
              label="Drogas Vasoativas"
              errors={errors.DrogasVasoativas}
              placeholder="Ex: Noradrenalina 0,1mcg/kg/min"
            />
            <FormInput
              control={control}
              name="AjusteDrogasVasoativas"
              label="Ajuste das Drogas Vasoativas"
              errors={errors.AjusteDrogasVasoativas}
              placeholder="Ex: Escala de vasopressores"
            />

            <VStack className="justify-between">
              <NextButton
                onPress={handleSubmit(onSubmit)}
                isPending={isSubmitting}
              />
              <BackButton destinationRoute="/medical-form/Step2" />
            </VStack>
          </VStack>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Sedation;
