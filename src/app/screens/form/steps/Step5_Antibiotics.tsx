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
import NextButton from "../components/NextButton";
import React from "react";
import ProgressBar from "../components/ProgressBar";
import FormRadio from "../components/FormRadio";

const AntibioticSchema = formSchema.pick({
  Transfusao: true,
  TipoTransfusao: true,
  ObsHemoterapia: true,
  Antibiotico: true,
  EscalonarAntibiotico: true,
  ObsAntibiotico: true,
  SolicitarCulturas: true,
});

type AntibioticFormData = z.infer<typeof AntibioticSchema>;

const Antibiotic = () => {
  const router = useRouter();
  const setData = useFormStore((state) => state.setData);
  const Transfusao = useFormStore((state) => state.Transfusao);
  const TipoTransfusao = useFormStore((state) => state.TipoTransfusao);
  const ObsHemoterapia = useFormStore((state) => state.ObsHemoterapia);
  const Antibiotico = useFormStore((state) => state.Antibiotico);
  const EscalonarAntibiotico = useFormStore(
    (state) => state.EscalonarAntibiotico
  );
  const ObsAntibiotico = useFormStore((state) => state.ObsAntibiotico);
  const SolicitarCulturas = useFormStore((state) => state.SolicitarCulturas);

  const defaultValues = React.useMemo(
    () => ({
      Transfusao: Transfusao,
      TipoTransfusao: TipoTransfusao,
      ObsHemoterapia: ObsHemoterapia,
      Antibiotico: Antibiotico,
      EscalonarAntibiotico: EscalonarAntibiotico,
      ObsAntibiotico: ObsAntibiotico,
      SolicitarCulturas: SolicitarCulturas,
    }),
    [
      Transfusao,
      TipoTransfusao,
      ObsHemoterapia,
      Antibiotico,
      EscalonarAntibiotico,
      ObsAntibiotico,
      SolicitarCulturas,
    ]
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<AntibioticFormData>({
    resolver: zodResolver(AntibioticSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = (data: AntibioticFormData) => {
    console.log("Data recebida na etapa 5:", data);
    setData(data);

    router.push("/screens/form/steps/Step6_Palliative");
  };

  return (
    <SafeAreaView className="flex-1 bg-background-50">
      <GoBackArrow />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Box className="flex-1 justify-center items-center px-4 space-y-1">
          <VStack space="sm" className="w-full max-w-lg p-6">
            <ProgressBar value={83} step={"5/6"} />
            <FormRadio
              control={control}
              name="Transfusao"
              label="Transfusão"
              options={[
                { label: "Sim", value: "Sim" },
                { label: "Não", value: "Não" },
              ]}
              size="lg"
              errors={errors.Transfusao?.message}
            />
            <FormInput
              control={control}
              name="TipoTransfusao"
              label="Tipo de transfusão"
              errors={errors.TipoTransfusao?.message}
              placeholder="Tipo de transfusão"
            />
            <FormInput
              control={control}
              name="ObsHemoterapia"
              label="Observações sobre hemoterapia"
              errors={errors.ObsHemoterapia?.message}
              placeholder="Observações sobre hemoterapia"
            />
            <FormInput
              control={control}
              name="Antibiotico"
              label="Antibiótico"
              errors={errors.Antibiotico?.message}
              placeholder="Antibiótico"
            />
            <FormRadio
              control={control}
              name="EscalonarAntibiotico"
              label="Escalonar antibiotico"
              options={[
                { label: "Sim", value: "Sim" },
                { label: "Não", value: "Não" },
              ]}
              size="lg"
              errors={errors.EscalonarAntibiotico?.message}
            />
            <FormInput
              control={control}
              name="ObsAntibiotico"
              label="Observações sobre antibiotico"
              errors={errors.ObsAntibiotico?.message}
              placeholder="Observações sobre antibiotico"
            />
            <FormRadio
              control={control}
              name="SolicitarCulturas"
              label="Solicitar culturas"
              options={[
                { label: "Sim", value: "Sim" },
                { label: "Não", value: "Não" },
              ]}
              size="lg"
              errors={errors.SolicitarCulturas?.message}
            />
            <NextButton
              onPress={handleSubmit(onSubmit)} // Passando handleSubmit corretamente
              isPending={isSubmitting}
            />
          </VStack>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Antibiotic;
