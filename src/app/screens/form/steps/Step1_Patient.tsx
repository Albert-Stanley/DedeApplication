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

const patientInfoSchema = formSchema.pick({
  NomePaciente: true,
  DataVisita: true,
  HospitalName: true,
  MedicoDiarista: true,
  Saps3: true,
  DihUti: true,
  Diagnostico: true,
  FerramentasDiagnosticasPendentes: true,
});

type PatientInfoFormData = z.infer<typeof patientInfoSchema>;

const PatientInfo = () => {
  const router = useRouter();
  const setData = useFormStore((state) => state.setData);
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting, isValid },
  } = useForm<PatientInfoFormData>({
    resolver: zodResolver(patientInfoSchema), // Usando o schema de validação correto
    defaultValues: {
      NomePaciente: "",
      DataVisita: "",
      HospitalName: "",
      MedicoDiarista: "",
      Saps3: "",
      DihUti: "",
      Diagnostico: "",
      FerramentasDiagnosticasPendentes: "",
    },
  });

  const onSubmit = async (data: PatientInfoFormData) => {
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
              <Progress value={16.7} size="md" orientation="horizontal">
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
            <FormInput
              name="DataVisita"
              label="Data da Visita"
              control={control}
              errors={errors}
              placeholder="Digite a data da visita"
            />
            <FormInput
              name="HospitalName"
              label="Nome do Hospital"
              control={control}
              errors={errors}
              placeholder="Digite o nome do hospital"
            />
            <FormInput
              name="MedicoDiarista"
              label="Médico Diarista"
              control={control}
              errors={errors}
              placeholder="Digite o nome do médico diarista"
            />
            <FormInput
              name="Saps3"
              label="SAPS 3"
              control={control}
              errors={errors}
              placeholder="Digite o valor do SAPS 3"
            />
            <FormInput
              name="DihUti"
              label="DIH UTI"
              control={control}
              errors={errors}
              placeholder="Digite o valor do DIH UTI"
            />
            <FormInput
              name="Diagnostico"
              label="Diagnóstico"
              control={control}
              errors={errors}
              placeholder="Digite o diagnóstico"
            />
            <FormInput
              name="FerramentasDiagnosticasPendentes"
              label="Ferramentas Diagnósticas Pendentes"
              control={control}
              errors={errors}
              placeholder="Digite as ferramentas diagnósticas pendentes"
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

export default PatientInfo;
