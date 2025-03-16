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

const MetabolicSchema = formSchema.pick({
  Hipoglicemia: true,
  HiperglicemiaMaisDeDoisEpisodios: true,
  Insulina24h: true,
  AjusteGlicemico: true,
  Ira: true,
  BalancoHidrico: true,
  CorrecaoEletronicos: true,
  CriterioUrgenciaHD: true,
  ObsDisturbios: true,
});

type MetabolicFormData = z.infer<typeof MetabolicSchema>;

const Metabolic = () => {
  const router = useRouter();
  const setData = useFormStore((state) => state.setData);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<MetabolicFormData>({
    resolver: zodResolver(MetabolicSchema), // Usando o schema de validação correto
  });

  const onSubmit = async (data: MetabolicFormData) => {
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
            <ProgressBar value={67} step={"4/6"} />
            <FormRadio
              control={control}
              name="Hipoglicemia"
              label="Hipoglicemia"
              options={[
                { label: "Sim", value: "Sim" },
                { label: "Não", value: "Não" },
              ]}
              errors={errors.Hipoglicemia}
              size={"lg"}
            />
            <FormRadio
              control={control}
              name="HiperglicemiaMaisDeDoisEpisodios"
              label="Hiperglicemia mais de dois episódios"
              options={[
                { label: "Sim", value: "Sim" },
                { label: "Não", value: "Não" },
              ]}
              errors={errors.HiperglicemiaMaisDeDoisEpisodios}
              size={"lg"}
            />
            <FormInput
              control={control}
              name="Insulina24h"
              label="Insulina 24h"
              errors={errors.Insulina24h}
              placeholder="Ex: 10 UI"
            />
            <FormInput
              control={control}
              name="AjusteGlicemico"
              label="Ajuste Glicêmico"
              errors={errors.AjusteGlicemico}
              placeholder="Ex: Insulina Regular 10 UI EV"
            />
            <FormRadio
              control={control}
              name="Ira"
              label="IRA"
              options={[
                { label: "Sim", value: "Sim" },
                { label: "Não", value: "Não" },
              ]}
              errors={errors.Ira}
              size={"lg"}
            />
            <FormInput
              control={control}
              name="BalancoHidrico"
              label="Balanço Hídrico"
              errors={errors.BalancoHidrico}
              placeholder="Ex: 500ml"
            />
            <FormInput
              control={control}
              name="CorrecaoEletronicos"
              label="Correção Eletrolíticos"
              errors={errors.CorrecaoEletronicos}
              placeholder="Ex: KCl 10ml EV"
            />
            <FormRadio
              control={control}
              name="CriterioUrgenciaHD"
              label="Critério de Urgência HD"
              options={[
                { label: "Sim", value: "Sim" },
                { label: "Não", value: "Não" },
              ]}
              errors={errors.CriterioUrgenciaHD}
              size={"lg"}
            />
            <FormInput
              control={control}
              name="ObsDisturbios"
              label="Observações de Distúrbios"
              errors={errors.ObsDisturbios}
              placeholder="Ex: Hiponatremia"
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

export default Metabolic;
