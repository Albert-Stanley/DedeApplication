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

const NutritionSchema = formSchema.pick({
  AporteNutricional: true,
  ProgredirDieta: true,
  SuspenderDieta: true,
  AntiemeticosOuCineticos: true,
  EvacuacaoUltimas48h: true,
  AjusteNutricional: true,
});

type NutritionFormData = z.infer<typeof NutritionSchema>;

const Nutrition = () => {
  const router = useRouter();
  const setData = useFormStore((state) => state.setData);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<NutritionFormData>({
    resolver: zodResolver(NutritionSchema), // Usando o schema de validação correto
  });

  const onSubmit = async (data: NutritionFormData) => {
    if (!isValid) return; // Se não for válido, não faz nada

    setData(data); // Salvando os dados no estado global
    console.log("Dados da fase atual:", data); // Verificando os dados da fase atual

    router.push("/screens/form/steps/Step3_Sedation");
  };

  return (
    <SafeAreaView className="flex-1 bg-background-50">
      <GoBackArrow />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Box className="flex-1 justify-center items-center px-4 space-y-1">
          <VStack space="sm" className="w-full max-w-lg p-6">
            <ProgressBar value={33} step={"2/6"} />
            <FormInput
              name="AporteNutricional"
              label="Aporte Nutricional"
              control={control}
              errors={errors}
              placeholder="Digite o Aporte Nutricional"
            />
            <FormRadio
              size="lg"
              name="ProgredirDieta"
              label="Progredir Dieta"
              control={control}
              errors={errors}
              options={[
                { label: "Sim", value: "Sim" },
                { label: "Não", value: "Não" },
              ]}
            />
            <FormRadio
              size="lg"
              name="SuspenderDieta"
              label="Suspender Dieta"
              control={control}
              errors={errors}
              options={[
                { label: "Sim", value: "Sim" },
                { label: "Não", value: "Não" },
              ]}
            />
            <FormRadio
              size="lg"
              name="AntiemeticosOuCineticos"
              label="Antieméticos ou Cinéticos"
              control={control}
              errors={errors}
              options={[
                { label: "Sim", value: "Sim" },
                { label: "Não", value: "Não" },
              ]}
            />
            <FormRadio
              size="lg"
              name="EvacuacaoUltimas48h"
              label="Evacuação Últimas
              48h"
              control={control}
              errors={errors}
              options={[
                { label: "Sim", value: "Sim" },
                { label: "Não", value: "Não" },
              ]}
            />
            <FormInput
              name="AjusteNutricional"
              label="Ajuste Nutricional"
              control={control}
              errors={errors}
              placeholder="Digite o Ajuste Nutricional"
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

export default Nutrition;
