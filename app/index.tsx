import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Input, InputSlot, InputField, InputIcon } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ButtonText } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react-native";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const validateInputs = () => {
    let isValid = true;

    // Validação do e-mail
    if (!email) {
      setEmailError("Por favor, insira um e-mail.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Por favor, insira um e-mail válido.");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Validação da senha
    if (!password) {
      setPasswordError("Por favor, insira sua senha.");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("A senha deve ter pelo menos 6 caracteres.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleLogin = () => {
    if (validateInputs()) {
      console.log("E-mail:", email, "Senha:", password);
      router.push("/auth/homepage");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background-50">
      <Box className="flex-1 justify-center items-center px-4">
        <VStack space="lg" className="w-full max-w-lg p-6">
          <Text size="2xl" className="text-center font-bold">
            Bem-vindo ao App!
          </Text>

          {/* Campo de Email */}
          <VStack space="xs">
            <Text className="font-medium text-base">E-mail</Text>
            <Input
              variant="outline"
              size="lg"
              className={`rounded-lg ${
                emailError ? "border-red-500" : "border-typography-300"
              }`}
            >
              <InputField
                placeholder="Digite seu e-mail"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setEmailError(""); // Limpa erro ao digitar
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </Input>
            {emailError ? (
              <Text className="text-red-500 text-sm">{emailError}</Text>
            ) : null}
          </VStack>

          {/* Campo de Senha */}
          <VStack space="xs">
            <Text className="font-medium text-base">Senha</Text>
            <Input
              variant="outline"
              size="lg"
              className={`rounded-lg ${
                passwordError ? "border-red-500" : "border-typography-300"
              }`}
            >
              <InputField
                placeholder="Digite sua senha"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setPasswordError(""); // Limpa erro ao digitar
                }}
                secureTextEntry={!showPassword}
              />
              <InputSlot
                className="pr-3"
                onPress={() => setShowPassword(!showPassword)}
              >
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
              </InputSlot>
            </Input>
            {passwordError ? (
              <Text className="text-red-500 text-sm">{passwordError}</Text>
            ) : null}
          </VStack>

          {/* Botão de Login */}
          <Button
            size="lg"
            variant="solid"
            action="primary"
            className="rounded-lg"
            onPress={handleLogin}
          >
            <ButtonText className="font-bold text-lg">Entrar</ButtonText>
          </Button>

          {/* Voltar para Cadastro */}
          <Button
            size="lg"
            variant="outline"
            action="secondary"
            className="rounded-lg border-primary-500"
            onPress={() => router.push("/auth/homepage")}
          >
            <ButtonText className="font-bold text-primary-500 text-lg">
              Criar uma conta
            </ButtonText>
          </Button>
        </VStack>
      </Box>
    </SafeAreaView>
  );
};

export default LoginScreen;
