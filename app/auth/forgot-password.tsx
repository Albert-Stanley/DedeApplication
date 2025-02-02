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
import { Input, InputField } from "@/components/ui/input";
import { ArrowLeftIcon, Icon } from "@/components/ui/icon";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Keyboard, Platform } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle } from "lucide-react-native";
import { Pressable } from "@/components/ui/pressable";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Por favor, insira um e-mail.").email(),
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

  const onSubmit = (_data: forgotPasswordSchemaType) => {
    toast.show({
      placement: "bottom right",
      render: ({ id }) => {
        return (
          <Toast nativeID={id} action="success">
            <ToastTitle>Link Enviado</ToastTitle>
          </Toast>
        );
      },
    });
    reset();
  };

  const handleKeyPress = () => {
    Keyboard.dismiss();
    handleSubmit(onSubmit)();
  };

  const handleBack = () => {
    router.replace("/");
  };

  return (
    <SafeAreaView className="flex-1 bg-background-50">
      {/* Header with Back Button */}
      <VStack className="absolute top-0 left-0 right-0 px-4 pt-12 z-10">
        <Pressable
          onPress={handleBack}
          accessibilityRole="button"
          className="w-12 h-12 p-2 items-center justify-center rounded-full bg-background-200 hover:bg-background-300 active:bg-background-400 pointer-events-auto"
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
                      onSubmitEditing={handleKeyPress}
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
            >
              <ButtonText className="font-bold text-lg">Enviar Link</ButtonText>
            </Button>
          </VStack>
        </VStack>
      </VStack>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
