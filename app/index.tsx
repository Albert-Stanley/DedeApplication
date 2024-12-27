import React, { useState } from "react";
import { useRouter } from "expo-router";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Input, InputIcon, InputSlot, InputField } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ButtonText } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react-native";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    console.log("Email:", email, "Password:", password);
    router.push("/medico");
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  return (
    <Box className="flex-1 justify-center items-center bg-background-50 p-5">
      <VStack space="md" className="w-11/12">
        <Text size="xl" className="text-center font-bold text-typography-900">
          Bem-vindo ao App!
        </Text>

        {/* Campo de Email */}
        <Text className="text-typography-900 leading-1">E-mail</Text>
        <Input variant="outline" size="md" className="border-typography-300">
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

        {/* Campo de Senha */}
        <Text className="text-typography-900 leading-1">Senha</Text>
        <Input variant="outline" size="md" className="border-typography-300">
          <InputField
            value={password}
            onChangeText={setPassword}
            type={showPassword ? "text" : "password"}
            placeholder="Digite sua senha"
          />
          <InputSlot className="pr-3" onPress={handleState}>
            <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
          </InputSlot>
        </Input>

        {/* Botão de Login */}
        <Button
          size="md"
          variant="solid"
          action="primary"
          onPress={handleLogin}
        >
          <ButtonText className="font-bold">Entrar</ButtonText>
        </Button>

        {/* Botão para Criar Conta */}
        <Button
          size="md"
          variant="outline"
          action="secondary"
          onPress={() => router.push("/signup")}
        >
          <ButtonText className="font-bold">Criar uma conta</ButtonText>
        </Button>
      </VStack>
    </Box>
  );
};

export default LoginScreen;
