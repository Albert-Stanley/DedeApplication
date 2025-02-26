import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Input, InputSlot, InputField, InputIcon } from "@/components/ui/input";
import { Button, ButtonIcon } from "@/components/ui/button";
import { ButtonText } from "@/components/ui/button";
import {
  AlertTriangle,
  EyeIcon,
  EyeOffIcon,
  LogInIcon,
} from "lucide-react-native";
import { HStack } from "@/components/ui/hstack";
import { LinkText } from "@/components/ui/link";
import z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Alert } from "react-native";
import { login, verifyUser } from "../../../services/authServices";

const LoginSchema = z.object({
  CRMorEmail: z
    .string()
    .min(1, "Por favor, insira um e-mail.")
    .max(100, "O e-mail ou CRM deve ter no máximo 100 caracteres."),
  // .email("E-mail inválido, tente novamente."),
  Password: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres.")
    .max(100, "A senha deve ter no máximo 100 caracteres.")
    .regex(/[A-Z]/, "A senha deve conter ao menos uma letra maiúscula.")
    .regex(/[0-9]/, "A senha deve conter ao menos um número."),
});

type Login = z.infer<typeof LoginSchema>;

const LoginScreen = () => {
  // Hooks de estado
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  // Hook do formulário
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Login>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { CRMorEmail: "", Password: "" },
  });

  // Função de submissão do formulário
  const onSubmit = async (data: Login) => {
    try {
      // Primeiro, verifica se o usuário existe
      const verifyResponse = await verifyUser(data.CRMorEmail);

      if (!verifyResponse.success) {
        setErrorMessage(verifyResponse.message);
        Alert.alert("Erro", verifyResponse.message);
        return;
      }

      // Se o usuário for encontrado, faz o login
      const loginResponse = await login(data.CRMorEmail, data.Password);

      if (!loginResponse.success) {
        setErrorMessage(
          loginResponse.message || "Usuário ou senha incorretos."
        );
        Alert.alert(
          "Erro no Login",
          loginResponse.message || "Usuário ou senha incorretos."
        );
        return;
      }

      // Sucesso no login
      router.push("/screens/home");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";
      setErrorMessage(errorMessage);
      Alert.alert("Erro no Login", errorMessage);
    }
  };

  useEffect(() => {
    setErrorMessage(null);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background-50">
      {errorMessage && (
        <Text className="text-red-500 text-center mt-2">{errorMessage}</Text>
      )}
      <Box className="flex-1 justify-center items-center px-4">
        <VStack space="lg" className="w-full max-w-lg p-6">
          <Text size="2xl" className="text-left mb-4 font-bold">
            Entre com seu CRM ou e-mail e senha.
          </Text>

          {/* Campo de CRM ou Email */}
          <FormControl isInvalid={!!errors?.CRMorEmail} className="w-full">
            <FormControlLabel>
              <FormControlLabelText className="font-medium text-base">
                CRM ou E-mail
              </FormControlLabelText>
            </FormControlLabel>
            <Controller
              name="CRMorEmail"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input className="mb-4" size="lg">
                  <InputField
                    id="CRMorEmail"
                    placeholder="Digite seu e-mail"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="email-address"
                    returnKeyType="done"
                  />
                </Input>
              )}
            />
            {errors?.CRMorEmail && (
              <FormControlError>
                <FormControlErrorIcon as={AlertTriangle} />
                <FormControlErrorText>
                  {errors.CRMorEmail.message}
                </FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>

          {/* Campo de Senha */}

          <FormControl isInvalid={!!errors?.Password} className="w-full">
            <FormControlLabel>
              <FormControlLabelText className="font-medium text-base">
                Senha
              </FormControlLabelText>
            </FormControlLabel>
            <Controller
              name="Password"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input className="mb-4" size="lg">
                  <InputField
                    id="Password"
                    placeholder="Digite sua senha"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry={!showPassword}
                    returnKeyType="done"
                  />
                  <InputSlot
                    onPress={() => setShowPassword(!showPassword)}
                    className="mr-2"
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
            {errors?.Password && (
              <FormControlError>
                <FormControlErrorIcon as={AlertTriangle} />
                <FormControlErrorText>
                  {errors.Password.message}
                </FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>

          {/* Botão de Esqueceu a Senha */}
          <HStack className="w-full justify-between ">
            <Link href="/screens/auth/forgot-password">
              <LinkText className="font-medium text-md text-primary-700 group-hover/link:text-primary-600">
                Esqueceu sua Senha?
              </LinkText>
            </Link>
          </HStack>

          {/* Botão de Login */}
          <Button
            size="lg"
            variant="solid"
            action="primary"
            className="rounded-lg mb-6"
            onPress={handleSubmit(onSubmit)}
          >
            <ButtonText className="font-bold text-lg">Entrar</ButtonText>
            <ButtonIcon as={LogInIcon} />
          </Button>
          <Text size="xl" className="text-left  font-bold">
            Não possui registro? Faça seu cadastro
          </Text>

          {/* Botão de ir para Cadastro */}
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
