import React, { useState } from "react";
import { useRouter } from "expo-router";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { InputField } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ButtonText } from "@/components/ui/button";

const SignupScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // 'medico' ou 'paciente'
  const router = useRouter();

  const handleSignup = () => {
    console.log(
      "Nome:",
      name,
      "Email:",
      email,
      "Senha:",
      password,
      "Role:",
      role
    );

    // Lógica para criação de conta (ex.: chamada à API)
    // Após o sucesso, redirecionar para a tela de login ou dashboard
    router.push("/");
  };

  return (
    <Box className="flex-1 justify-center items-center bg-background-50 p-5">
      <VStack space="md" className="w-11/12">
        <Text size="xl" className="text-center font-bold text-typography-900">
          Crie sua conta
        </Text>

        {/* Campo de Nome */}
        <Input variant="outline" size="md" className="border-typography-300">
          <InputField
            placeholder="Digite seu nome"
            value={name}
            onChangeText={setName}
            className="text-typography-900"
          />
        </Input>

        {/* Campo de Email */}
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
        <Input variant="outline" size="md" className="border-typography-300">
          <InputField
            placeholder="Crie uma senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            className="text-typography-900"
          />
        </Input>

        {/* Campo de Id do médico */}
        <Input variant="outline" size="md" className="border-typography-300">
          <InputField
            placeholder="Digite o ID do médico"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            className="text-typography-900"
          />
        </Input>

        {/* Escolha de Tipo de Usuário */}
        <Box className="w-full">
          <Text className="text-sm font-bold text-typography-700 mb-2">
            Você é:
          </Text>
          <VStack space="sm" className="w-full">
            <Button
              size="md"
              variant={role === "medico" ? "solid" : "outline"}
              action="primary"
              onPress={() => setRole("medico")}
            >
              <ButtonText className="font-bold">Médico</ButtonText>
            </Button>
            <Button
              size="md"
              variant={role === "paciente" ? "solid" : "outline"}
              action="primary"
              onPress={() => setRole("paciente")}
            >
              <ButtonText className="font-bold">Paciente</ButtonText>
            </Button>
          </VStack>
        </Box>

        {/* Botão de Cadastro */}
        <Button
          size="md"
          variant="solid"
          action="primary"
          onPress={handleSignup}
        >
          <ButtonText className="font-bold">Cadastrar</ButtonText>
        </Button>

        {/* Voltar para Login */}
        <Button
          size="md"
          variant="outline"
          action="secondary"
          onPress={() => router.push("/")}
        >
          <ButtonText className="font-bold">Voltar para Login</ButtonText>
        </Button>
      </VStack>
    </Box>
  );
};

export default SignupScreen;
