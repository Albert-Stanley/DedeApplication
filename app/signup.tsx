import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Input, InputIcon, InputSlot, InputField } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ButtonText } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react-native";
import {
  Checkbox,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxIcon,
} from "@/components/ui/checkbox";
import { Icon, CheckIcon } from "@/components/ui/icon";

const SignupScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleSignup = () => {
    console.log(
      "Nome:",
      name,
      "Email:",
      email,
      "Senha:",
      password,
      "Confirmação de Senha:",
      confirmPassword
    );

    // Lógica para criação de conta (ex.: chamada à API)
    router.push("/");
  };

  return (
    <SafeAreaView className="flex-1 bg-background-50">
      <Box className="flex-1 justify-center items-center px-4">
        <VStack space="lg" className="w-full max-w-lg p-6">
          <Text
            size="2xl"
            className="text-center font-bold text-typography-900"
          >
            Crie sua conta
          </Text>

          {/* Campo de Nome */}
          <VStack space="xs">
            <Text className="text-typography-900 font-medium text-base">
              Nome
            </Text>
            <Input
              variant="outline"
              size="lg"
              className="border-typography-300 rounded-lg"
            >
              <InputField
                placeholder="Digite seu nome"
                value={name}
                onChangeText={setName}
                className="text-typography-900"
              />
            </Input>
          </VStack>

          {/* Campo de Email */}
          <VStack space="xs">
            <Text className="text-typography-900 font-medium text-base">
              E-mail
            </Text>
            <Input
              variant="outline"
              size="lg"
              className="border-typography-300 rounded-lg"
            >
              <InputField
                placeholder="Digite seu e-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                className="text-typography-900"
              />
            </Input>
          </VStack>

          {/* Campo de Senha */}
          <VStack space="xs">
            <Text className="text-typography-900 font-medium text-base">
              Senha
            </Text>
            <Input
              variant="outline"
              size="lg"
              className="border-typography-300 rounded-lg"
            >
              <InputField
                placeholder="Crie uma senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                className="text-typography-900"
              />
              <InputSlot
                className="pr-3"
                onPress={() => setShowPassword(!showPassword)}
              >
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
              </InputSlot>
            </Input>
          </VStack>

          {/* Campo de Confirmar Senha */}
          <VStack space="xs">
            <Text className="text-typography-900 font-medium text-base">
              Confirme sua senha
            </Text>
            <Input
              variant="outline"
              size="lg"
              className="border-typography-300 rounded-lg"
            >
              <InputField
                placeholder="Confirme sua senha"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                className="text-typography-900"
              />
              <InputSlot
                className="pr-3"
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <InputIcon as={showConfirmPassword ? EyeIcon : EyeOffIcon} />
              </InputSlot>
            </Input>
          </VStack>

          {/* Checkbox de Termos de Uso */}
          <Checkbox size="md" value="Remember me" aria-label="Remember me">
            <CheckboxIndicator>
              <CheckboxIcon as={CheckIcon} />
            </CheckboxIndicator>
            <CheckboxLabel className="text-sm leading-tight text-typography-700">
              Eu aceito os{" "}
              <Text className="text-sm text-primary-500 underline">
                Termos de Uso
              </Text>{" "}
              &{" "}
              <Text className=" text-sm text-primary-500 underline">
                Política de Privacidade
              </Text>
            </CheckboxLabel>
          </Checkbox>

          {/* Botão de Cadastro */}
          <Button
            size="lg"
            variant="solid"
            action="primary"
            className="rounded-lg"
            onPress={handleSignup}
          >
            <ButtonText className="font-bold text-white text-lg">
              Cadastrar
            </ButtonText>
          </Button>

          {/* Voltar para Login */}
          <Button
            size="lg"
            variant="outline"
            action="secondary"
            className="rounded-lg border-primary-500"
            onPress={() => router.push("/")}
          >
            <ButtonText className="font-bold text-primary-500 text-lg">
              Voltar para Login
            </ButtonText>
          </Button>
        </VStack>
      </Box>
    </SafeAreaView>
  );
};

export default SignupScreen;
