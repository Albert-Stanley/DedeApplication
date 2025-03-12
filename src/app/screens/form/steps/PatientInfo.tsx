import React from "react";
import { formSchema } from "../schema/formSchema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SafeAreaView } from "react-native";
import GoBackArrow from "@/components/common/goBackArrow";
import { ScrollView } from "react-native";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import NextButton from "../components/nextButton";

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
  const form = useForm<PatientInfoFormData>({
    resolver: zodResolver(patientInfoSchema),
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

  const onSubmit = (data: PatientInfoFormData) => {
    console.log(data); // Realiza a ação com os dados do formulário
  };

  return (
    <SafeAreaView className="flex-1 bg-background-50">
      <GoBackArrow />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Box className="flex-1 justify-center items-center px-4 space-y-1">
          <VStack space="sm" className="w-full max-w-lg p-6">
            <NextButton
              onSubmit={onSubmit} // Passando a função onSubmit diretamente
              isPending={form.formState.isSubmitting} // Indicando o estado de carregamento
              isValid={form.formState.isValid} // Verificando se o formulário é válido
            />
          </VStack>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PatientInfo;
