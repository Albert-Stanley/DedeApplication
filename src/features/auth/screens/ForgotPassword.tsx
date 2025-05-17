import React from "react";
import { Toast, ToastTitle, useToast } from "../../../components/ui/toast";
import { VStack } from "../../../components/ui/vstack";
import { Heading } from "../../../components/ui/heading";
import { Text } from "../../../components/ui/text";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "../../../components/ui/form-control";
import { Input, InputField } from "../../../components/ui/input";
import { Button, ButtonIcon, ButtonText } from "../../../components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, SendIcon } from "lucide-react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "../../../components/ui/spinner";
import GoBackArrow from "../../../components/common/goBackArrow";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Por favor, insira um e-mail.")
    .email("E-mail inválido, tente novamente."),
});

type forgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordScreen = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<forgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const toast = useToast();
  const router = useRouter();

  const sendEmailMutation = useMutation({
    mutationFn: async (data: forgotPasswordSchemaType) => {
      console.log("Enviando email para:", data.email);

      // Simula um delay para a requisição (substitir pelo fetch real)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      return { message: "Email enviado com sucesso!" };
    },
    onSuccess: () => {
      toast.show({
        placement: "bottom right",
        render: ({ id }) => (
          <Toast nativeID={id} action="success">
            <ToastTitle>Link Enviado</ToastTitle>
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
            <ToastTitle>Erro ao enviar email</ToastTitle>
            <Text>{error.message}</Text>
          </Toast>
        ),
      });
    },
  });

  const onSubmit = (data: forgotPasswordSchemaType) => {
    sendEmailMutation.mutate(data);
  };

  return (
    <SafeAreaView className="flex-1 bg-background-50">
      {/* Header with Back Button */}
      <VStack className="absolute top-0 left-0 right-0 px-4 pt-12 z-10">
        <GoBackArrow destinationRoute="/Login" />
      </VStack>

      {/* Main Content */}
      <VStack className="flex-1 items-center justify-center px-4">
        <VStack className="max-w-[440px] w-full space-y-6">
          <VStack space="sm">
            <Heading className="text-center " size="3xl">
              Esqueceu sua senha?
            </Heading>
            <Text className="text-center mb-2 text-lg">
              Digite seu e-mail para receber o link de redefinição de senha
            </Text>
          </VStack>

          {/* Form */}
          <VStack space="xl" className="w-full">
            <FormControl isInvalid={!!errors?.email} className="w-full">
              <FormControlLabel>
                <FormControlLabelText className="font-medium text-base">
                  E-mail
                </FormControlLabelText>
              </FormControlLabel>
              <Controller
                defaultValue=""
                name="email"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className="mb-4" size="lg">
                    <InputField
                      placeholder="Digite seu e-mail"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      keyboardType="email-address"
                      autoComplete="email"
                      textContentType="emailAddress"
                      onSubmitEditing={handleSubmit(onSubmit)}
                      returnKeyType="done"
                    />
                  </Input>
                )}
              />
              <FormControlError>
                <FormControlErrorIcon as={AlertTriangle} />
                <FormControlErrorText>
                  {errors?.email?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>

            <Button
              size="lg"
              variant="solid"
              action="primary"
              className="rounded-lg"
              onPress={handleSubmit(onSubmit)}
              disabled={sendEmailMutation.isPending}
            >
              {sendEmailMutation.isPending ? (
                <>
                  <Spinner size="small" />
                  <ButtonText>Enviando...</ButtonText>
                </>
              ) : (
                <>
                  <ButtonText className="font-bold text-lg">
                    Enviar Link
                  </ButtonText>
                  <ButtonIcon as={SendIcon} />
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
