import React, { useState } from "react";
import { SafeAreaView, Alert } from "react-native";
import { Link, useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import z from "zod";

import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Input, InputSlot, InputField, InputIcon } from "@/components/ui/input";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
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
import {
  AlertTriangle,
  EyeIcon,
  EyeOffIcon,
  LogInIcon,
} from "lucide-react-native";
import { login, verifyUser } from "../../../services/authServices";
import GoBackArrow from "@/components/goBack/goBackArrow";

// Esquema de validação com Zod
const LoginSchema = z.object({
  CRMorEmail: z.string().min(1, "Por favor, insira um e-mail.").max(100).trim(),
  Password: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres.")
    .max(100)
    .trim(),
});

// Tipagem inferida do esquema
type Login = z.infer<typeof LoginSchema>;

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Login>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { CRMorEmail: "", Password: "" },
  });

  // Mutação para login
  const loginMutation = useMutation({
    mutationFn: async (data: Login) => {
      const verifyResponse = await verifyUser(data.CRMorEmail);
      if (!verifyResponse.success) throw new Error(verifyResponse.message);

      const loginResponse = await login(data.CRMorEmail, data.Password);
      if (!loginResponse.success) throw new Error(loginResponse.message);

      return loginResponse;
    },
    onSuccess: () => router.push("/screens/home"),
    onError: (error: Error) => {
      // Exibindo a mensagem de erro conforme a resposta do backend
      Alert.alert("Erro no Login", error.message || "Erro inesperado");
    },
  });

  return (
    <SafeAreaView className="flex-1 bg-background-50">
      <GoBackArrow />
      <Box className="flex-1 justify-center items-center px-4">
        <VStack space="lg" className="w-full max-w-lg p-6">
          <Text size="2xl" className="text-center mb-4 font-bold">
            Olá, seja bem-vindo(a) novamente!
          </Text>

          {/* Campo CRM ou E-mail */}
          <FormControl isInvalid={!!errors?.CRMorEmail} className="w-full">
            <FormControlLabel>
              <FormControlLabelText>CRM ou E-mail</FormControlLabelText>
            </FormControlLabel>
            <Controller
              name="CRMorEmail"
              control={control}
              render={({ field }) => (
                <Input size="lg" className="mb-2">
                  <InputField
                    {...field}
                    placeholder="Digite seu e-mail"
                    keyboardType="email-address"
                  />
                </Input>
              )}
            />
            {errors.CRMorEmail && (
              <FormControlError className="mt-1">
                <FormControlErrorIcon as={AlertTriangle} />
                <FormControlErrorText>
                  {errors.CRMorEmail.message}
                </FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>

          {/* Campo Senha */}
          <FormControl isInvalid={!!errors?.Password} className="w-full">
            <FormControlLabel>
              <FormControlLabelText>Senha</FormControlLabelText>
            </FormControlLabel>
            <Controller
              name="Password"
              control={control}
              render={({ field }) => (
                <Input size="lg" className="mb-2">
                  <InputField
                    {...field}
                    placeholder="Digite sua senha"
                    secureTextEntry={!showPassword}
                  />
                  <InputSlot onPress={() => setShowPassword(!showPassword)}>
                    <InputIcon
                      className="mr-2"
                      as={showPassword ? EyeIcon : EyeOffIcon}
                    />
                  </InputSlot>
                </Input>
              )}
            />
            {errors.Password && (
              <FormControlError className="mt-1">
                <FormControlErrorIcon as={AlertTriangle} />
                <FormControlErrorText>
                  {errors.Password.message}
                </FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>

          {/* Esqueceu a senha */}
          <HStack className="w-full justify-between">
            <Link href="/screens/auth/forgot-password">
              <LinkText className="text-primary-700">
                Esqueceu sua Senha?
              </LinkText>
            </Link>
          </HStack>

          {/* Botão de Login */}
          <Button
            size="lg"
            variant="solid"
            action="primary"
            className="rounded-lg mb-6 flex-row items-center justify-center"
            onPress={handleSubmit((data) => loginMutation.mutate(data))}
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? (
              <>
                <Spinner size="small" className="mr-2" />
                <ButtonText className="font-bold text-lg">
                  Entrando...
                </ButtonText>
              </>
            ) : (
              <>
                <ButtonText className="font-bold text-lg">Entrar</ButtonText>
                <ButtonIcon as={LogInIcon} className="ml-2" />
              </>
            )}
          </Button>

          {/* Cadastro */}
          <Text size="xl" className="text-left font-bold">
            Não possui registro? Faça seu cadastro
          </Text>
          <Button
            size="lg"
            variant="outline"
            action="secondary"
            className="rounded-lg border-primary-200"
            onPress={() => router.push("/screens/auth/signup")}
          >
            <ButtonText className="font-bold text-primary-500 text-lg">
              Cadastre-se agora
            </ButtonText>
          </Button>
        </VStack>
      </Box>
    </SafeAreaView>
  );
};

export default LoginScreen;
