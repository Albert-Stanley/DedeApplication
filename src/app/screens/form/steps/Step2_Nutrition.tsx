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
import { Progress, ProgressFilledTrack } from "@/components/ui/progress";
import { Center } from "@/components/ui/center";
import { useFormStore } from "../store/formStore";
import NextButton from "../components/nextButton";
import React from "react";

const Step2_NutritionSchema = formSchema.pick({
  AporteNutricional: true,
  ProgredirDieta: true,
  SuspenderDieta: true,
  AntiemeticosOuCineticos: true,
  EvacuacaoUltimas48h: true,
  AjusteNutricional: true,
});

type Step2_NutritionFormData = z.infer<typeof Step2_NutritionSchema>;

const Step2_Nutrition = () => {
  const router = useRouter();
  const setData = useFormStore((state) => state.setData);
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting, isValid },
  } = useForm<Step2_NutritionFormData>({
    resolver: zodResolver(Step2_NutritionSchema), // Usando o schema de validação correto
    defaultValues: {
      AporteNutricional: "",
      ProgredirDieta: "Sim",
      SuspenderDieta: "Sim",
      AntiemeticosOuCineticos: "Sim",
      EvacuacaoUltimas48h: "Sim",
      AjusteNutricional: "",
    },
  });

  const onSubmit = async (data: Step2_NutritionFormData) => {
    const isValidForm = await trigger(); // Verifica se o formulário é válido antes de continuar
    if (!isValidForm) return; // Se não for válido, não faz nada

    setData(data); // Salvando os dados no estado global
    console.log("Dados da fase atual:", data); // Verificando os dados da fase atual

    router.push("/form/steps/Step2_Nutrition"); // Navegando para a próxima fase
  };

  return (
    <SafeAreaView className="flex-1 bg-background-50">
      <GoBackArrow />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Box className="flex-1 justify-center items-center px-4 space-y-1">
          <VStack space="sm" className="w-full max-w-lg p-6">
            <Center className="w-[300px] h-[150px]">
              <Progress value={33.4} size="md" orientation="horizontal">
                <ProgressFilledTrack />
              </Progress>
            </Center>
            <FormInput
              name="NomePaciente"
              label="Nome do Paciente"
              control={control}
              errors={errors}
              placeholder="Digite o nome do paciente"
            />

            <NextButton
              onSubmit={handleSubmit(onSubmit)} // Passando handleSubmit corretamente
              isPending={isSubmitting}
              isValid={isValid} // Validando corretamente o estado do botão
            />
          </VStack>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Step2_Nutrition;
