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
import { HStack } from "@/components/ui/hstack";

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
  const Hipoglicemia = useFormStore((state) => state.Hipoglicemia);
  const HiperglicemiaMaisDeDoisEpisodios = useFormStore(
    (state) => state.HiperglicemiaMaisDeDoisEpisodios
  );
  const Insulina24h = useFormStore((state) => state.Insulina24h);
  const AjusteGlicemico = useFormStore((state) => state.AjusteGlicemico);
  const Ira = useFormStore((state) => state.Ira);
  const BalancoHidrico = useFormStore((state) => state.BalancoHidrico);
  const CorrecaoEletronicos = useFormStore(
    (state) => state.CorrecaoEletronicos
  );
  const CriterioUrgenciaHD = useFormStore((state) => state.CriterioUrgenciaHD);
  const ObsDisturbios = useFormStore((state) => state.ObsDisturbios);

  const defaultValues = React.useMemo(
    () => ({
      Hipoglicemia: Hipoglicemia,
      HiperglicemiaMaisDeDoisEpisodios: HiperglicemiaMaisDeDoisEpisodios,
      Insulina24h: Insulina24h,
      AjusteGlicemico: AjusteGlicemico,
      Ira: Ira,
      BalancoHidrico: BalancoHidrico,
      CorrecaoEletronicos: CorrecaoEletronicos,
      CriterioUrgenciaHD: CriterioUrgenciaHD,
      ObsDisturbios: ObsDisturbios,
    }),
    [
      Hipoglicemia,
      HiperglicemiaMaisDeDoisEpisodios,
      Insulina24h,
      AjusteGlicemico,
      Ira,
      BalancoHidrico,
      CorrecaoEletronicos,
      CriterioUrgenciaHD,
      ObsDisturbios,
    ]
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MetabolicFormData>({
    resolver: zodResolver(MetabolicSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = (data: MetabolicFormData) => {
    setData(data); // Salvando os dados no estado global
    console.log("Dados da etapa 4: ", data); // Verificando os dados da fase atual
    router.push("/medical-form/Step5");
  };

  return (
    <SafeAreaView className="flex-1 screen-bg">
      <CustomHeader
        title="Formulário Médico - Etapa 4/6"
        showBackButton={true}
        showThemeToggle={true}
        titleColor="text-primary"
      />
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
            <VStack className="justify-between">
              <NextButton
                onPress={handleSubmit(onSubmit)}
                isPending={isSubmitting}
              />
              <BackButton destinationRoute="/medical-form/Step3" />
            </VStack>
          </VStack>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Metabolic;
