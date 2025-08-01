import React, { useState } from "react";
import { Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon, AlertTriangle } from "lucide-react-native";
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
import CustomHeader from "@/components/common/CustomHeader";
import {
  formatCPF,
  formatCRM,
  formatRG,
  formatDataNascimento,
} from "@/utils/fieldFormatters";
import { useAuthStore } from "@/features/auth/store/authStore";
import { SignupSchema, Signup } from "../schemas/signupSchema";

const SignupScreen = () => {
  const [showPassword, setShowPassword] = useState(false);

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

  const router = useRouter();
  const { register } = useAuthStore();

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

  const onSubmit = (data: Signup) => {
    console.log("Dados do formulário:", data);
    signupMutation.mutate(data);
  };

  return (
    <SafeAreaView className="flex-1 screen-bg">
      <CustomHeader
        title="Criar Conta"
        showBackButton={true}
        showThemeToggle={true}
        titleColor="text-primary"
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Box className="flex-1 justify-center items-center px-4 space-y-1">
          <VStack space="sm" className="w-full max-w-lg p-6">
            {/* Cabeçalho */}
            <Text size="2xl" className=" font-bold text-typography-900 mb-6">
              Para começar, crie sua conta
            </Text>

            {/* Campo CRM */}
            <FormControl size="lg" isInvalid={!!errors.CRM}>
              <Controller
                control={control}
                name="CRM"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className="mb-1" size="lg" label="CRM">
                    <InputField
                      value={value}
                      onChangeText={(text) => onChange(formatCRM(text))}
                      onBlur={onBlur}
                      keyboardType="numeric"
                      returnKeyType="next"
                    />
                  </Input>
                )}
              />
              <Text className="text-sm mb-1 text-typography-500">
                Digite apenas números
              </Text>
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
              <FormControlLabel></FormControlLabel>
              <Controller
                control={control}
                name="RG"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className="mb-1" size="lg" label="RG">
                    <InputField
                      value={value}
                      onChangeText={(text) => onChange(formatRG(text))}
                      onBlur={onBlur}
                      keyboardType="numeric"
                      returnKeyType="next"
                    />
                  </Input>
                )}
              />
              <Text className="text-sm mb-1 -mt-2 text-typography-500">
                Digite apenas números
              </Text>
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
              <FormControlLabel></FormControlLabel>
              <Controller
                control={control}
                name="CPF"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className="mb-1" size="lg" label="CPF">
                    <InputField
                      value={value}
                      onChangeText={(text) => onChange(formatCPF(text))}
                      onBlur={onBlur}
                      keyboardType="numeric"
                      returnKeyType="next"
                    />
                  </Input>
                )}
              />
              <Text className="text-sm mb-1 -mt-2 text-typography-500">
                Digite apenas números
              </Text>
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
              <FormControlLabel></FormControlLabel>
              <Controller
                control={control}
                name="DataNascimento"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className="mb-1" size="lg" label="Data de Nascimento">
                    <InputField
                      value={value}
                      onChangeText={(text) =>
                        onChange(formatDataNascimento(text))
                      }
                      onBlur={onBlur}
                      keyboardType="numeric"
                      returnKeyType="next"
                    />
                  </Input>
                )}
              />
              <Text className="text-sm mb-1 -mt-2 text-typography-500">
                Formato: DD/MM/AAAA
              </Text>
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
              <FormControlLabel></FormControlLabel>
              <Controller
                name="Password"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className="mb-1" size="lg" label="Senha">
                    <InputField
                      id="Password"
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
              <Text className="text-sm mb-1 -mt-2 text-typography-500">
                Mínimo de 8 caracteres
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
