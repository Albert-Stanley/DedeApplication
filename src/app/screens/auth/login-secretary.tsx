import React from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Toast, ToastTitle, useToast } from "@/components/ui/toast";
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
import GoBackArrow from "@/components/goBack/goBackArrow";

// Schema de validação com Zod
const forgotPasswordSchema = z.object({
  chave: z
    .string()
    .min(1, "Por favor, insira uma chave de acesso.")
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, "Apenas letras são permitidas."),
});

type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordScreen = () => {
  // React Hook Form: configuração do formulário
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const toast = useToast();
  const router = useRouter();

  // Mutação para enviar a chave e realizar a ação de login
  const sendKeyMutation = useMutation({
    mutationFn: async (data: ForgotPasswordSchemaType) => {
      console.log("Enviando email para:", data.chave);

      // Substitua por requisição real para enviar o email
      await new Promise((resolve) => setTimeout(resolve, 2000));

      return { message: "Email enviado com sucesso!" };
    },
    onSuccess: () => {
      toast.show({
        placement: "bottom right",
        render: ({ id }) => (
          <Toast nativeID={id} action="success">
            <ToastTitle>Entrando...</ToastTitle>
          </Toast>
        ),
      });

      reset(); // Limpa o formulário após o sucesso
    },
    onError: (error) => {
      toast.show({
        placement: "bottom right",
        render: ({ id }) => (
          <Toast nativeID={id} action="error">
            <ToastTitle>Chave Incorreta</ToastTitle>
            <Text>{error.message}</Text>
          </Toast>
        ),
      });
    },
  });

  // Função de envio do formulário
  const onSubmit = (data: ForgotPasswordSchemaType) => {
    sendKeyMutation.mutate(data);
  };

  return (
    <SafeAreaView className="flex-1 bg-background-50">
      {/* Header com botão de voltar */}
      <GoBackArrow />
      {/* Conteúdo Principal */}
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
                render={({ field: { onChange, onBlur, value } }) => (
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
              disabled={sendKeyMutation.isPending}
            >
              {sendKeyMutation.isPending ? (
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

export default ForgotPasswordScreen;
