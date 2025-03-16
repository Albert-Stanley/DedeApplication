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
  const router = useRouter();
  const setData = useFormStore((state) => state.setData);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<PalliativeFormData>({
    resolver: zodResolver(PalliativeSchema), // Usando o schema de validação correto
  });

  const onSubmit = async (data: PalliativeFormData) => {
    if (!isValid) return; // Se não for válido, não faz nada

    setData(data); // Salvando os dados no estado global
    console.log("Dados da fase atual:", data); // Verificando os dados da fase atual

    router.push("/screens/form/steps/Step6_Palliative");
  };

  return (
    <SafeAreaView className="flex-1 bg-background-50">
      <GoBackArrow />
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
                { label: "Sim", value: "sim" },
                { label: "Não", value: "nao" },
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
                { label: "Sim", value: "sim" },
                { label: "Não", value: "nao" },
              ]}
              errors={errors.CuidadosPaliativos?.message}
            />
            <FormRadio
              control={control}
              name="FamiliaresCientes"
              label="Familiares Cientes"
              size="lg"
              options={[
                { label: "Sim", value: "sim" },
                { label: "Não", value: "nao" },
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
                { label: "Sim", value: "sim" },
                { label: "Não", value: "nao" },
              ]}
              errors={errors.AltaUTI?.message}
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

export default Palliative;
