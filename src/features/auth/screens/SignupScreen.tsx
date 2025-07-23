// Bibliotecas externas
import React, { useState } from "react";
import { View, Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon, AlertTriangle } from "lucide-react-native";

// Componentes UI internos
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Spinner } from "@/components/ui/spinner";
import colors from "tailwindcss/colors";
import GoBackArrow from "@/components/common/goBackArrow";

// Componentes específicos do signup
import {
  formatCPF,
  formatCRM,
  formatRG,
  formatDataNascimento,
} from "@/utils/fieldFormatters";

// Serviços
import { useAuthStore } from "@/features/auth/store/authStore";

// Schema de validação Zod
import { SignupSchema, Signup } from "../schemas/signupSchema";

// Componente de tela para o cadastro
const SignupScreen = () => {
  // Hooks de estado para exibir ou ocultar a senha
  const [showPassword, setShowPassword] = useState(false);

  // Hook de formulários com validação Zod
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Signup>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      CRM: "",
      RG: "",
      CPF: "",
      DataNascimento: "",
      Password: "",
    },
  });

  // Hook de roteamento para navegação entre as telas
  const router = useRouter();

  // Hook de autenticação para cadastro
  const { register } = useAuthStore();

  // Mutação para cadastro do usuário
  const signupMutation = useMutation({
    mutationFn: async (data: Signup) => {
      const success = await register({
        CRM: data.CRM,
        RG: data.RG,
        CPF: data.CPF,
        DataNascimento: data.DataNascimento,
        Password: data.Password,
      });

      console.log("Resultado do authStore.register:", success);

      if (!success) {
        throw new Error(
          "Falha ao registrar usuário. Verifique os dados ou tente mais tarde."
        );
      }
      return { success: true, crm: data.CRM };
    },
    onSuccess: (result) => {
      Alert.alert(
        "Cadastro Realizado!",
        `Seu cadastro foi realizado com sucesso. Use seu CRM ${result.crm} para fazer login.`
      );
      router.push("/Login");
    },
    onError: (error: Error) => {
      console.error("Erro no processo de cadastro:", error);
      Alert.alert(
        "Erro no Cadastro",
        error.message || "Ocorreu um erro. Tente novamente."
      );
    },
  });

  // Função chamada ao submeter o formulário
  const onSubmit = (data: Signup) => {
    console.log("Dados do formulário:", data);
    signupMutation.mutate(data);
  };

  return (
    <SafeAreaView className="flex-1 bg-background-50">
      <GoBackArrow destinationRoute="/" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Box className="flex-1 justify-center items-center px-4 space-y-1">
          <VStack space="sm" className="w-full max-w-lg p-6">
            {/* Cabeçalho */}
            <Text
              size="2xl"
              className="text-center font-bold text-typography-900 mb-6"
            >
              Crie sua conta
            </Text>

            {/* Campo CRM */}
            <FormControl size="lg" isInvalid={!!errors.CRM}>
              <FormControlLabel>
                <FormControlLabelText>CRM</FormControlLabelText>
              </FormControlLabel>
              <Text className="text-sm mb-1 -mt-2 text-typography-500">
                Digite apenas números
              </Text>
              <Controller
                control={control}
                name="CRM"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className="mb-1" size="lg">
                    <InputField
                      value={value}
                      onChangeText={(text) => onChange(formatCRM(text))}
                      onBlur={onBlur}
                      placeholder="Digite seu CRM"
                      keyboardType="numeric"
                      returnKeyType="next"
                    />
                  </Input>
                )}
              />
              {errors?.CRM && (
                <FormControlError>
                  <FormControlErrorIcon as={AlertTriangle} />
                  <FormControlErrorText>
                    {errors.CRM.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>

            {/* Campo RG */}
            <FormControl size="lg" isInvalid={!!errors.RG}>
              <FormControlLabel>
                <FormControlLabelText>RG</FormControlLabelText>
              </FormControlLabel>
              <Text className="text-sm mb-1 -mt-2 text-typography-500">
                Digite apenas números
              </Text>
              <Controller
                control={control}
                name="RG"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className="mb-1" size="lg">
                    <InputField
                      value={value}
                      onChangeText={(text) => onChange(formatRG(text))}
                      onBlur={onBlur}
                      placeholder="Digite seu RG"
                      keyboardType="numeric"
                      returnKeyType="next"
                    />
                  </Input>
                )}
              />
              {errors?.RG && (
                <FormControlError>
                  <FormControlErrorIcon as={AlertTriangle} />
                  <FormControlErrorText>
                    {errors.RG.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>

            {/* Campo CPF */}
            <FormControl size="lg" isInvalid={!!errors.CPF}>
              <FormControlLabel>
                <FormControlLabelText>CPF</FormControlLabelText>
              </FormControlLabel>
              <Text className="text-sm mb-1 -mt-2 text-typography-500">
                Digite apenas números
              </Text>
              <Controller
                control={control}
                name="CPF"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className="mb-1" size="lg">
                    <InputField
                      value={value}
                      onChangeText={(text) => onChange(formatCPF(text))}
                      onBlur={onBlur}
                      placeholder="Digite seu CPF"
                      keyboardType="numeric"
                      returnKeyType="next"
                    />
                  </Input>
                )}
              />
              {errors?.CPF && (
                <FormControlError>
                  <FormControlErrorIcon as={AlertTriangle} />
                  <FormControlErrorText>
                    {errors.CPF.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>

            {/* Campo Data de Nascimento */}
            <FormControl size="lg" isInvalid={!!errors.DataNascimento}>
              <FormControlLabel>
                <FormControlLabelText>Data de Nascimento</FormControlLabelText>
              </FormControlLabel>
              <Text className="text-sm mb-1 -mt-2 text-typography-500">
                Formato: DD/MM/AAAA
              </Text>
              <Controller
                control={control}
                name="DataNascimento"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className="mb-1" size="lg">
                    <InputField
                      value={value}
                      onChangeText={(text) =>
                        onChange(formatDataNascimento(text))
                      }
                      onBlur={onBlur}
                      placeholder="DD/MM/AAAA"
                      keyboardType="numeric"
                      returnKeyType="next"
                    />
                  </Input>
                )}
              />
              {errors?.DataNascimento && (
                <FormControlError>
                  <FormControlErrorIcon as={AlertTriangle} />
                  <FormControlErrorText>
                    {errors.DataNascimento.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>

            {/* Campo de Senha */}
            <FormControl size="lg" isInvalid={!!errors?.Password}>
              <FormControlLabel>
                <FormControlLabelText>Senha</FormControlLabelText>
              </FormControlLabel>
              <Text className="text-sm mb-1 -mt-2 text-typography-500">
                Mínimo de 8 caracteres
              </Text>
              <Controller
                name="Password"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className="mb-1" size="lg">
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

            {/* Botão de Cadastro */}
            <Button
              className="w-full mt-6"
              onPress={handleSubmit(onSubmit)}
              isDisabled={signupMutation.isPending}
            >
              <ButtonText className="font-bold text-lg">
                {signupMutation.isPending ? (
                  <Spinner size="small" color={colors.gray[500]} />
                ) : (
                  "Cadastrar"
                )}
              </ButtonText>
            </Button>

            <Text className="text-lg font-bold text-center mt-4">
              Já possui registro? Faça seu login
            </Text>
            {/* Ir para o Login */}
            <Button
              variant="outline"
              action="secondary"
              className="rounded-lg border-primary-200"
              onPress={() => router.push("/Login")}
            >
              <ButtonText className="font-bold text-primary-500 text-lg">
                Ir para o Login
              </ButtonText>
            </Button>
          </VStack>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignupScreen;
