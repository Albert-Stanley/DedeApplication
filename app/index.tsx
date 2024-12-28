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
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    console.log("Email:", email, "Senha:", password);

    // Lógica para autenticação (ex.: chamada à API)
    router.push("/homepage");
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
              className="border-typography-300 rounded-lg"
            >
              <InputField
                placeholder="Digite seu e-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </Input>
          </VStack>

          {/* Campo de Senha */}
          <VStack space="xs">
            <Text className=" font-medium text-base">Senha</Text>
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
            onPress={() => router.push("/signup")}
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
