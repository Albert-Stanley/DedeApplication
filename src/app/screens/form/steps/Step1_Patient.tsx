import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { formSchema } from "../schema/formSchema"; // Importando o schema completo
import { z } from "zod";
import { useRouter } from "expo-router";
import { SafeAreaView, ScrollView } from "react-native";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import FormInput from "../components/FormInput";
import GoBackArrow from "@/components/common/goBackArrow";
import { useFormStore } from "../store/formStore";
import NextButton from "../components/NextButton";
import DateInput from "../components/DateInput";
import React from "react";
import ProgressBar from "../components/ProgressBar";
import { shallow } from "zustand/shallow";

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
  const nomePaciente = useFormStore((state) => state.NomePaciente);
  const dataVisita = useFormStore((state) => state.DataVisita);
  const hospitalName = useFormStore((state) => state.HospitalName);
  const medicoDiarista = useFormStore((state) => state.MedicoDiarista);
  const saps3 = useFormStore((state) => state.Saps3);
  const dihUti = useFormStore((state) => state.DihUti);
  const diagnostico = useFormStore((state) => state.Diagnostico);
  const ferramentasPendentes = useFormStore(
    (state) => state.FerramentasDiagnosticasPendentes
  );

  const defaultValues = React.useMemo(
    () => ({
      NomePaciente: nomePaciente,
      DataVisita: dataVisita,
      HospitalName: hospitalName,
      MedicoDiarista: medicoDiarista,
      Saps3: saps3,
      DihUti: dihUti,
      Diagnostico: diagnostico,
      FerramentasDiagnosticasPendentes: ferramentasPendentes,
    }),
    [
      nomePaciente,
      dataVisita,
      hospitalName,
      medicoDiarista,
      saps3,
      dihUti,
      diagnostico,
      ferramentasPendentes,
    ]
  ); // Array de dependências com todos os valores usados

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PatientInfoFormData>({
    resolver: zodResolver(patientInfoSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = (data: PatientInfoFormData) => {
    setData(data); // Salvando os dados no estado global
    console.log("Dados da Etapa 1: ", data); // Verificando os dados da fase atual
    router.push("/screens/form/steps/Step2_Nutrition"); // Navegando para a próxima fase
  };

  return (
    <SafeAreaView className="flex-1 bg-background-50">
      <GoBackArrow />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Box className="flex-1 justify-center items-center px-4 space-y-1">
          <VStack space="sm" className="w-full max-w-lg p-6">
            <ProgressBar value={16.7} step={"1/6"} />
            <FormInput
              name="NomePaciente"
              label="Nome do Paciente"
              control={control}
              errors={errors}
              placeholder="Digite o nome do paciente"
            />

            <DateInput
              name="DataVisita"
              label="Data da Visita"
              control={control}
              errors={errors}
              size="lg"
              placeholder="Digite a data (dd/mm/aaaa)"
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
              placeholder="Ferramentas Pendentes"
            />
            <NextButton
              onPress={handleSubmit(onSubmit)}
              isPending={isSubmitting}
            />
          </VStack>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PatientInfo;
