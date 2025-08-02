import React, { useState } from "react";
import { SafeAreaView, Alert, ScrollView } from "react-native";
import { Link, useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Input, InputSlot, InputField, InputIcon } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { LinkText } from "@/components/ui/link";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { AlertTriangle, EyeIcon, EyeOffIcon } from "lucide-react-native";
import { useAuthStore } from "@/features/auth/store/authStore";
import { formatCRM } from "@/utils/fieldFormatters";
import colors from "tailwindcss/colors";

// Schema de validação
import { LoginSchema, Login } from "../schemas/loginSchema";
import CustomHeader from "@/components/common/CustomHeader";

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login } = useAuthStore();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Login>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      identifier: "",
      Password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: Login) => {
      const success = await login(data.identifier, data.Password);

      if (!success) {
        throw new Error("Credenciais inválidas. Verifique CRM/Email e senha.");
      }
      return { success: true };
    },
    onSuccess: () => {
      Alert.alert("Login realizado!", "Bem-vindo de volta!");
      router.push("/doctor");
    },
    onError: (error: Error) => {
      Alert.alert(
        "Erro no Login",
        error.message || "Ocorreu um erro. Tente novamente."
      );
    },
  });

  const onSubmit = (data: Login) => {
    loginMutation.mutate(data);
  };

  const isNumeric = (str: string) => /^\d+$/.test(str.replace(/\D/g, ""));

  return (
    <SafeAreaView className="screen-bg flex-1 bg-background-50">
      <CustomHeader
        title="Login"
        showBackButton={true}
        showThemeToggle={true}
        titleColor="text-primary"
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Box className="flex-1 justify-center items-center px-4">
          <VStack space="sm" className="w-full max-w-lg p-6">
            {/* Cabeçalho */}
            <Text
              size="2xl"
              className="text-center font-bold text-typography-900 mb-6"
            >
              Faça seu login
            </Text>

            {/* Campo CRM ou Email */}
            <FormControl size="lg" isInvalid={!!errors.identifier}>
              <Controller
                name="identifier"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className="mb-1" size="lg" label="CRM ou Email">
                    <InputField
                      value={value}
                      onChangeText={(text) => {
                        if (text.includes("@")) {
                          onChange(text);
                        } else if (isNumeric(text)) {
                          onChange(formatCRM(text));
                        } else {
                          onChange(text);
                        }
                      }}
                      onBlur={onBlur}
                      keyboardType={
                        isNumeric(value) ? "numeric" : "email-address"
                      }
                      autoComplete="email"
                      returnKeyType="next"
                    />
                  </Input>
                )}
              />
              <Text className="text-sm mb-1 text-typography-500">
               * Digite seu CRM (apenas números) ou email
              </Text>
              {errors?.identifier && (
                <FormControlError>
                  <FormControlErrorIcon as={AlertTriangle} />
                  <FormControlErrorText>
                    {errors.identifier.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>

            {/* Campo de Senha */}
            <FormControl size="lg" isInvalid={!!errors?.Password}>
              <Controller
                name="Password"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className="mb-1" size="lg" label="Senha">
                    <InputField
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      secureTextEntry={!showPassword}
                      returnKeyType="done"
                    />
                    <InputSlot
                      onPress={() => setShowPassword(!showPassword)}
                      className=" mr-2"
                    >
                      {showPassword ? (
                        <InputIcon as={EyeIcon} />
                      ) : (
                        <InputIcon as={EyeOffIcon} />
                      )}
                    </InputSlot>
                  </Input>
                )}
              />
              <Text className="text-sm mb-1 text-typography-500">
               * Digite sua senha (mínimo 6 caracteres, incluindo letras e números)
              </Text>
             
              {errors?.Password && (
                <FormControlError>
                  <FormControlErrorIcon as={AlertTriangle} />
                  <FormControlErrorText>
                    {errors.Password.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>

            {/* Esqueceu a senha */}
            <HStack className="w-full justify-between">
              <Link href="/ForgotPassword">
                <LinkText className="text-primary-700">
                  Esqueceu sua Senha?
                </LinkText>
              </Link>
            </HStack>

            {/* Botão de Login */}
            <Button
              className="w-full mt-6"
              onPress={handleSubmit(onSubmit)}
              isDisabled={loginMutation.isPending}
            >
              <ButtonText className="font-bold text-lg">
                {loginMutation.isPending ? (
                  <Spinner size="small" color={colors.gray[500]} />
                ) : (
                  "Entrar"
                )}
              </ButtonText>
            </Button>

            <Text className="text-lg font-bold text-center mt-4">
              Ainda não possui conta?
            </Text>

            {/* Ir para o Cadastro */}
            <Button
              variant="outline"
              action="secondary"
              className="rounded-lg border-primary-200"
              onPress={() => router.push("/Signup")}
            >
              <ButtonText className="font-bold text-primary-500 text-lg">
                Criar conta
              </ButtonText>
            </Button>
          </VStack>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
