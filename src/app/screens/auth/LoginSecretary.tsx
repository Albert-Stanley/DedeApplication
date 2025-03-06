import React from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import {
  FormControl,
  FormControlError,
  FormControlLabel,
  FormControlLabelText,
  FormControlErrorText,
  FormControlErrorIcon,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { AlertTriangle, LogInIcon } from "lucide-react-native";
import GoBackArrow from "@/components/common/goBackArrow";
import { validateAccessKey } from "@/services/secretaryServices"; // Atualizando para a nova função de validação de chave

// Schema de validação com Zod
const loginSecretarySchema = z.object({
  chave: z
    .string()
    .min(1, "Por favor, insira uma chave de acesso.")
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, "Apenas letras são permitidas."),
});

type LoginSecretarySchemaType = z.infer<typeof loginSecretarySchema>;

const LoginSecretaryScreen = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginSecretarySchemaType>({
    resolver: zodResolver(loginSecretarySchema),
  });

  const { mutate: validateKey, isPending } = useMutation({
    mutationFn: async (data: LoginSecretarySchemaType) => {
      const { chave } = data;

      // Valida a chave de acesso
      const response = await validateAccessKey(chave);

      if (!response?.isValid) {
        throw new Error("Chave de acesso inválida.");
      }

      return response;
    },
    onSuccess: () => {
      // Redireciona para o dashboard após sucesso
      router.push("screens/secretary/SecretaryDashboard");
      reset(); // Limpa o formulário após o sucesso
    },
    onError: (error) => {
      alert(error.message); // Exibe erro caso a validação falhe
    },
  });

  const onSubmit = (data: LoginSecretarySchemaType) => {
    validateKey(data); // Chama a mutação para validar a chave
  };

  return (
    <SafeAreaView className="flex-1 bg-background-50">
      <GoBackArrow />
      <VStack className="flex-1 items-center justify-center px-4">
        <VStack className="max-w-[440px] w-full space-y-6">
          <VStack space="sm">
            <Heading className="text-center" size="2xl">
              Enfermeiro(a) ou Secretário(a)?
            </Heading>
            <Text className="text-center mb-2 text-lg">
              Digite a chave de acesso fornecida pelo Médico
            </Text>
          </VStack>

          {/* Formulário de Chave de Acesso */}
          <VStack space="xl" className="w-full">
            <FormControl isInvalid={!!errors?.chave} className="w-full">
              <FormControlLabel>
                <FormControlLabelText className="font-medium text-base">
                  Chave de acesso
                </FormControlLabelText>
              </FormControlLabel>
              <Controller
                name="chave"
                control={control}
                render={({ field: { onChange, onBlur, value = "" } }) => (
                  <Input className="mb-4" size="lg">
                    <InputField
                      placeholder="Digite a chave de acesso"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      keyboardType="default"
                      onSubmitEditing={handleSubmit(onSubmit)}
                      returnKeyType="done"
                    />
                  </Input>
                )}
              />
              <FormControlError>
                <FormControlErrorIcon as={AlertTriangle} />
                <FormControlErrorText>
                  {errors?.chave?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>

            {/* Botão de Enviar */}
            <Button
              size="lg"
              variant="solid"
              action="primary"
              className="rounded-lg mb-6 flex-row items-center justify-center"
              onPress={handleSubmit(onSubmit)}
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Spinner size="small" />
                  <ButtonText>Entrando...</ButtonText>
                </>
              ) : (
                <>
                  <ButtonText className="font-bold text-lg">Entrar</ButtonText>
                  <ButtonIcon as={LogInIcon} className="ml-2" />
                </>
              )}
            </Button>
          </VStack>
        </VStack>
      </VStack>
    </SafeAreaView>
  );
};

export default LoginSecretaryScreen;
