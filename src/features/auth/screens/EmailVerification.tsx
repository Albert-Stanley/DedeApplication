import React from "react";
import { useAuthStore } from "@/features/auth/store/authStore";
import { Alert, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import GoBackArrow from "@/components/common/goBackArrow";
import { VStack } from "@/components/ui/vstack";
import { AlertTriangle, SendHorizonal } from "lucide-react-native";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useMutation } from "@tanstack/react-query";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
} from "@/components/ui/form-control";
import { Controller, useForm } from "react-hook-form";
import { Toast, ToastTitle, useToast } from "@/components/ui/toast";
import { Heading } from "@/components/ui/heading";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Esquema de validação com Zod
const emailVerificationSchema = z.object({
  code: z
    .string()
    .min(1, "Por favor, insira o código de verificação.")
    .max(20, "O código de verificação deve ter 20 dígitos."),
});

// Tipagem do formulário
type EmailVerificationSchemaType = z.infer<typeof emailVerificationSchema>;

const EmailVerificationScreen = () => {
  const { handleEmailVerification, pendingEmail } = useAuthStore();
  const router = useRouter();
  const toast = useToast();

  // Hook Form para lidar com a validação do input
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailVerificationSchemaType>({
    resolver: zodResolver(emailVerificationSchema),
  });

  // Mutation para verificar o código
  const verifyCodeMutation = useMutation({
    mutationFn: async ({ code }: EmailVerificationSchemaType) => {
      return await handleEmailVerification(code);
    },
    onSuccess: (isVerified) => {
      if (isVerified) {
        toast.show({
          placement: "bottom right",
          render: ({ id }) => (
            <Toast id={id}>
              <ToastTitle>✅ Código verificado com sucesso!</ToastTitle>
            </Toast>
          ),
        });
        router.push("/screens/auth/Login");
      } else {
        Alert.alert("Erro", "Código de verificação inválido. Tente novamente.");
      }
    },
    onError: () => {
      Alert.alert(
        "Erro",
        "Ocorreu um erro ao verificar o código. Tente novamente."
      );
    },
  });

  const onSubmit = (data: EmailVerificationSchemaType) => {
    console.log(data);

    verifyCodeMutation.mutate(data);
  };

  return (
    <SafeAreaView className="flex-1 bg-background-50">
      {/* <GoBackArrow /> */}
      <VStack className="flex-1 items-center justify-center px-4">
        <VStack className="max-w-[440px] w-full space-y-6">
          <VStack>
            <Heading className="text-center mb-5" size="2xl">
              Enviamos um código de verificação para{" "}
              {pendingEmail ?? "seu email"}
            </Heading>
            <Text className="text-center mb-2 text-lg">
              Digite o código de verificação para continuar
            </Text>
          </VStack>

          {/* Formulário de Código de Verificação */}
          <VStack space="xl" className="w-full">
            <FormControl isInvalid={!!errors?.code} className="w-full">
              <FormControlLabel>
                <FormControlLabelText className="font-medium text-base">
                  Código de Verificação
                </FormControlLabelText>
              </FormControlLabel>
              <Controller
                name="code"
                control={control}
                render={({ field: { onChange, onBlur, value = "" } }) => (
                  <Input className="mb-4" size="lg">
                    <InputField
                      placeholder="Digite o código"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      keyboardType="number-pad"
                      returnKeyType="done"
                      onSubmitEditing={handleSubmit(onSubmit)}
                    />
                  </Input>
                )}
              />
              <FormControlError>
                <FormControlErrorIcon as={AlertTriangle} />
                <FormControlErrorText>
                  {errors?.code?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>

            {/* Botão de Verificação */}
            <Button
              size="lg"
              variant="solid"
              action="primary"
              className="rounded-lg mb-6 flex-row items-center justify-center"
              onPress={handleSubmit(onSubmit)}
              disabled={verifyCodeMutation.isPending}
            >
              {verifyCodeMutation.isPending ? (
                <>
                  <Spinner size="small" />
                  <ButtonText>Verificando...</ButtonText>
                </>
              ) : (
                <>
                  <ButtonText className="font-bold text-lg">
                    Verificar
                  </ButtonText>
                  <ButtonIcon as={SendHorizonal} className="ml-2" />
                </>
              )}
            </Button>
          </VStack>
        </VStack>
      </VStack>
    </SafeAreaView>
  );
};

export default EmailVerificationScreen;
