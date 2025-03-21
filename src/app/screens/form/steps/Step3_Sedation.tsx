import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formSchema } from "../schema/formSchema"; // Importando o schema completo
import { z } from "zod";
import { useRouter } from "expo-router";
import { SafeAreaView, ScrollView } from "react-native";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import FormInput from "../components/FormInput";
import GoBackArrow from "@/components/common/goBackArrow";
import { useFormStore } from "../store/formStore";
import NextButton from "../components/nextButton";
import React from "react";
import ProgressBar from "../components/ProgressBar";
import FormRadio from "../components/FormRadio";

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
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SedationFormData>({
    resolver: zodResolver(SedationSchema), // Usando o schema de validação correto
  });

  const onSubmit = async (data: SedationFormData) => {
    if (!isValid) return; // Se não for válido, não faz nada

    setData(data); // Salvando os dados no estado global
    console.log("Dados da fase atual:", data); // Verificando os dados da fase atual

    router.push("/screens/form/steps/Step4_Metabolic");
  };

  return (
    <SafeAreaView className="flex-1 bg-background-50">
      <GoBackArrow />
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

            <NextButton
              onSubmit={handleSubmit(onSubmit)} // Passando handleSubmit corretamente
              isPending={isSubmitting}
            />
          </VStack>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Sedation;
