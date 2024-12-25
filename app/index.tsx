import { useState } from "react";
import { Redirect } from "expo-router";
import { Button, ButtonText } from "@/components/ui/button"; // Certifique-se de que você tem esses componentes
import { Box } from "@/components/ui/box"; // Certifique-se de que você tem o Box
import { Text } from "@/components/ui/text"; // Certifique-se de que você tem o Text
import { VStack } from "@/components/ui/vstack"; // Certifique-se de que você tem o VStack
import { Input, InputField, InputSlot, InputIcon } from "@/components/ui/input"; // Certifique-se de que você tem o Input

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  // Função para simular login
  const handleLogin = () => {
    // Simulação simples de login (substitua com sua lógica real)
    if (email === "user@example.com" && password === "123456") {
      setIsLoggedIn(true); // Redireciona se o login for bem-sucedido
      setError(""); // Limpa erro
    } else {
      setError("Credenciais inválidas!"); // Exibe erro em caso de falha no login
    }
  };

  // Função para alternar visibilidade da senha
  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  if (isLoggedIn) {
    return <Redirect href="/" />; // Redireciona para a tela inicial após login
  }

  return (
    <Box className="flex-1 justify-center items-center bg-gray-100 px-6 md:px-12">
      <VStack className="space-md items-center w-full max-w-lg">
        <Text className="text-xl font-bold text-gray-800 mb-6 text-center">
          Bem-vindo!
        </Text>
        {/* Input para e-mail */}
        <VStack className="space-xs w-full">
          <Text className="text-gray-700">Email</Text>
          <Input>
            <InputField
              value={email}
              onChangeText={setEmail}
              placeholder="Digite seu email"
              className="bg-white border rounded-lg p-4"
            />
          </Input>
        </VStack>

        {/* Input para senha */}
        <VStack className="space-xs w-full mt-4">
          <Text className="text-gray-700">Senha</Text>
          <Input>
            <InputField
              value={password}
              onChangeText={setPassword}
              placeholder="Digite sua senha"
              className="bg-white border rounded-lg p-4"
              secureTextEntry={!showPassword}
            />
            <InputSlot>
              <InputIcon onPress={handleShowPassword}>
                <Text className="text-blue-500">
                  {showPassword ? "Ocultar" : "Mostrar"}
                </Text>
              </InputIcon>
            </InputSlot>
          </Input>
        </VStack>

        {/* Exibindo erro, se houver */}
        {error && (
          <Text className="text-red-500 mt-4 text-center">{error}</Text>
        )}

        {/* Botões de login e cadastro */}
        <VStack className="space-4 w-full mt-6">
          <Button
            onPress={handleLogin}
            className="bg-blue-500 w-full py-4 rounded-lg"
          >
            <ButtonText className="text-white text-lg">Entrar</ButtonText>
          </Button>

          <Button
            onPress={() => alert("Tela de Cadastro")}
            className="bg-gray-500 w-full py-4 rounded-lg mt-4"
          >
            <ButtonText className="text-white text-lg">Cadastrar</ButtonText>
          </Button>
        </VStack>

        {/* Link de "Esqueceu a senha?" */}
        <Text
          className="text-blue-500 mt-4 cursor-pointer"
          onPress={() => alert("Tela de recuperação de senha")}
        >
          Esqueceu sua senha?
        </Text>
      </VStack>
    </Box>
  );
}
