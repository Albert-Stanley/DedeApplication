import React from "react";
import { Toast, ToastTitle, useToast } from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Pressable } from "@/components/ui/pressable";
import { Input, InputField } from "@/components/ui/input";
import { ArrowLeftIcon, Icon } from "@/components/ui/icon";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, SendIcon } from "lucide-react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";

const forgotPasswordSchema = z.object({
  chave: z
    .string()
    .min(1, "Por favor, insira uma chave de acesso.")
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, "Apenas letras são permitidas."),
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
      console.log("Enviando email para:", data.chave);

      // Simula um delay para a requisição (substitir pelo fetch real)
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

  const onSubmit = (data: forgotPasswordSchemaType) => {
    sendEmailMutation.mutate(data);
  };

  const handleBack = () => {
    // SUBSTITUIR PELO GOBACK COMPONENT
    router.replace("/");
  };

  return (
    <SafeAreaView className="flex-1 bg-background-50">
      {/* Header with Back Button */}
      <VStack className="absolute top-0 left-0 right-0 px-4 pt-12 z-10">
        <Pressable
          onPress={handleBack}
          accessibilityRole="button"
          className="w-12 h-12 p-2 items-center justify-center rounded-full bg-background-200 hover:bg-background-300 active:bg-background-400"
        >
          <Icon
            as={ArrowLeftIcon}
            className="stroke-background-800"
            size="xl"
          />
        </Pressable>
      </VStack>

      {/* Main Content */}
      <VStack className="flex-1 items-center justify-center px-4">
        <VStack className="max-w-[440px] w-full space-y-6">
          <VStack space="sm">
            <Heading className="text-center " size="2xl">
              Enfermeiro(a) ou Secretário(a)?
            </Heading>
            <Text className="text-center mb-2 text-lg">
              Digite a chave de acesso fornecida pelo Médico
            </Text>
          </VStack>

          {/* Form */}
          <VStack space="xl" className="w-full">
            <FormControl isInvalid={!!errors?.chave} className="w-full">
              <FormControlLabel>
                <FormControlLabelText className="font-medium text-base">
                  Chave de acesso
                </FormControlLabelText>
              </FormControlLabel>
              <Controller
                defaultValue=""
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
