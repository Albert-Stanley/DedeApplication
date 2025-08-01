import React, { useState } from "react";
import { SafeAreaView, ScrollView, Alert } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
} from "@/components/ui/form-control";
import {
  LogIn,
  Eye,
  EyeOff,
  User,
  Lock,
  Building2,
  AlertTriangle,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import CustomHeader from "@/components/common/CustomHeader";
import {
  LoginPartnerDoctorSchema,
  LoginPartnerDoctor,
} from "../schemas/loginPartnerDoctorSchema";

interface LoginFormData {
  crm: string;
  password: string;
  hospitalName: string;
}

const LoginPartnerDoctorScreen: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  // Configuração do formulário com react-hook-form e Zod
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPartnerDoctor>({
    resolver: zodResolver(LoginPartnerDoctorSchema),
    defaultValues: {
      crm: "",
      password: "",
      hospitalName: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginPartnerDoctor) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return { success: true };
    },
    onSuccess: () => {
      Alert.alert(
        "Login realizado com sucesso",
        "Bem-vindo ao sistema médico hospitalar",
        [
          {
            text: "Continuar",
            onPress: () => router.replace("/doctor"),
          },
        ]
      );
    },
    onError: (error: Error) => {
      Alert.alert("Erro no login", error.message);
    },
  });

  const onSubmit = (data: LoginPartnerDoctor) => {
    loginMutation.mutate(data);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView className="flex-1 screen-bg">
      {/* Custom Header */}
      <CustomHeader
        title="Login Médico Hospitalar"
        showBackButton={true}
        showThemeToggle={true}
        titleColor="text-primary"
      />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* Content */}
        <Box className="flex-1 px-4 py-6">
          <Animated.View entering={FadeInUp.duration(600).springify()}>
            <Card className="card-bg shadow-card rounded-xl">
              <Box className="p-6">
                <VStack space="lg">
                  {/* Welcome Section */}
                  <Animated.View entering={FadeInDown.delay(200).duration(600)}>
                    <VStack space="sm" className="items-center mb-4">
                      <Box className="bg-primary-100 dark:bg-primary-900 p-4 rounded-full">
                        <Building2
                          className="text-primary-600 dark:text-primary-400"
                          size={32}
                        />
                      </Box>
                      <Text className="text-primary text-center font-semibold text-lg">
                        Acesso Médico Hospitalar
                      </Text>
                      <Text className="text-secondary text-center text-sm">
                        Entre com suas credenciais do hospital parceiro
                      </Text>
                    </VStack>
                  </Animated.View>

                  {/* Form */}
                  <Animated.View entering={FadeInDown.delay(400).duration(600)}>
                    <VStack space="md">
                      {/* Hospital Name Field */}
                      <FormControl isInvalid={!!errors.hospitalName}>
                        <Controller
                          control={control}
                          name="hospitalName"
                          render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                              size="lg"
                              className="border-default"
                              label="Nome do Hospital"
                            >
                              {/* <InputIcon
                                as={Building2}
                                className="text-gray-400"
                              /> */}
                              <InputField
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                autoCapitalize="words"
                              />
                            </Input>
                          )}
                        />
                        {errors.hospitalName && (
                          <FormControlError>
                            <FormControlErrorIcon as={AlertTriangle} />
                            <FormControlErrorText>
                              {errors.hospitalName.message}
                            </FormControlErrorText>
                          </FormControlError>
                        )}
                      </FormControl>

                      {/* CRM Field */}
                      <FormControl isInvalid={!!errors.crm}>
                        <Controller
                          control={control}
                          name="crm"
                          render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                              size="lg"
                              className="border-default"
                              label="CRM"
                            >
                              {/* <InputSlot className="pl-3">
                                <InputIcon
                                  as={User}
                                  className="text-gray-400"
                                />
                              </InputSlot> */}
                              <InputField
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                autoCapitalize="characters"
                              />
                            </Input>
                          )}
                        />
                        {errors.crm && (
                          <FormControlError>
                            <FormControlErrorIcon as={AlertTriangle} />
                            <FormControlErrorText>
                              {errors.crm.message}
                            </FormControlErrorText>
                          </FormControlError>
                        )}
                      </FormControl>

                      {/* Password Field */}
                      <FormControl isInvalid={!!errors.password}>
                        <Controller
                          control={control}
                          name="password"
                          render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                              size="lg"
                              className="border-default"
                              label="Senha"
                            >
                              {/* <InputSlot className="pl-3">
                                <InputIcon
                                  as={Lock}
                                  className="text-gray-400"
                                />
                              </InputSlot> */}
                              <InputField
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                secureTextEntry={!showPassword}
                              />
                              <InputSlot className="pr-3">
                                <Button
                                  onPress={togglePasswordVisibility}
                                  variant="link"
                                  size="xs"
                                >
                                  <ButtonIcon
                                    as={showPassword ? EyeOff : Eye}
                                    className="text-gray-400"
                                  />
                                </Button>
                              </InputSlot>
                            </Input>
                          )}
                        />
                        {errors.password && (
                          <FormControlError>
                            <FormControlErrorIcon as={AlertTriangle} />
                            <FormControlErrorText>
                              {errors.password.message}
                            </FormControlErrorText>
                          </FormControlError>
                        )}
                      </FormControl>

                      {/* Login Button */}
                      <Button
                        size="lg"
                        onPress={handleSubmit(onSubmit)}
                        isDisabled={loginMutation.isPending}
                        className="bg-primary-600 hover:bg-primary-700 mt-4"
                      >
                        {loginMutation.isPending ? (
                          <ButtonText>Entrando...</ButtonText>
                        ) : (
                          <>
                            <ButtonIcon as={LogIn} className="mr-2" />
                            <ButtonText>Entrar no Sistema</ButtonText>
                          </>
                        )}
                      </Button>

                      {/* Info Section */}
                      <Box className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <VStack space="xs">
                          <Text className="text-blue-800 dark:text-blue-200 font-medium text-sm">
                            ℹ️ Informações importantes:
                          </Text>
                          <Text className="text-blue-700 dark:text-blue-300 text-xs">
                            • Use as credenciais fornecidas pelo seu hospital
                          </Text>
                          <Text className="text-blue-700 dark:text-blue-300 text-xs">
                            • CRM deve estar no formato: UF + números (ex:
                            SP123456)
                          </Text>
                          <Text className="text-blue-700 dark:text-blue-300 text-xs">
                            • Em caso de problemas, contate a administração
                          </Text>
                          <Text className="text-blue-700 dark:text-blue-300 text-xs">
                            • Mantenha suas credenciais em local seguro
                          </Text>
                        </VStack>
                      </Box>
                    </VStack>
                  </Animated.View>
                </VStack>
              </Box>
            </Card>
          </Animated.View>

          {/* Bottom Spacing */}
          <Box className="h-8" />
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginPartnerDoctorScreen;
