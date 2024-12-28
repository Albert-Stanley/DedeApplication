import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Input, InputField, InputSlot, InputIcon } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon, AlertCircleIcon } from "lucide-react-native";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
} from "@/components/ui/form-control";
import {
  Checkbox,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxIcon,
} from "@/components/ui/checkbox";
import { CheckIcon } from "@/components/ui/icon";
import { useRouter } from "expo-router";
import { Box } from "@/components/ui/box";

const SignupScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  // Estados para validação
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const router = useRouter();

  const handleSignup = () => {
    let isValid = true;

    // Validação do nome
    if (!name.trim()) {
      setNameError(true);
      isValid = false;
    } else {
      setNameError(false);
    }

    // Validação do email
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      isValid = false;
    } else {
      setEmailError(false);
    }

    // Validação da senha
    if (password.length < 6) {
      setPasswordError(true);
      isValid = false;
    } else {
      setPasswordError(false);
    }

    // Validação da confirmação de senha
    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      isValid = false;
    } else {
      setConfirmPasswordError(false);
    }

    // Verificar se os termos de uso foram aceitos
    if (!isTermsAccepted) {
      alert(
        "Você precisa aceitar os Termos de Uso e a Política de Privacidade para continuar."
      );
      isValid = false;
    }

    if (isValid) {
      console.log("Cadastro realizado com sucesso!");
      router.push("/");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background-50">
      <Box className="flex-1 justify-center items-center px-4 space-y-2">
        <VStack space="lg" className="w-full max-w-lg p-6">
          <Text
            size="2xl"
            className="text-center font-bold text-typography-900"
          >
            Crie sua conta
          </Text>

          {/* Campo de Nome */}
          <FormControl isInvalid={nameError}>
            <FormControlLabel>
              <FormControlLabelText>Nome</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                placeholder="Digite seu nome"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  setNameError(false);
                }}
              />
            </Input>
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>Nome é obrigatório.</FormControlErrorText>
            </FormControlError>
          </FormControl>

          {/* Campo de Email */}
          <FormControl isInvalid={emailError}>
            <FormControlLabel>
              <FormControlLabelText>Email</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                placeholder="Digite seu e-mail"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setEmailError(false);
                }}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </Input>
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>Email inválido.</FormControlErrorText>
            </FormControlError>
          </FormControl>

          {/* Campo de Senha */}
          <FormControl isInvalid={passwordError}>
            <FormControlLabel>
              <FormControlLabelText>Senha</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                placeholder="Crie uma senha"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setPasswordError(false);
                }}
                secureTextEntry={!showPassword}
              />
              <InputSlot onPress={() => setShowPassword(!showPassword)}>
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
              </InputSlot>
            </Input>
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>
                A senha deve ter pelo menos 6 caracteres.
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          {/* Campo de Confirmar Senha */}
          <FormControl isInvalid={confirmPasswordError}>
            <FormControlLabel>
              <FormControlLabelText>Confirme sua senha</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                placeholder="Confirme sua senha"
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  setConfirmPasswordError(false);
                }}
                secureTextEntry={!showConfirmPassword}
              />
              <InputSlot
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <InputIcon as={showConfirmPassword ? EyeIcon : EyeOffIcon} />
              </InputSlot>
            </Input>
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>
                As senhas não coincidem.
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          {/* Checkbox de Termos de Uso */}
          <Checkbox
            size="md"
            value="terms"
            aria-label="terms"
            isChecked={isTermsAccepted}
            onChange={setIsTermsAccepted}
          >
            <CheckboxIndicator>
              <CheckboxIcon as={CheckIcon} />
            </CheckboxIndicator>
            <CheckboxLabel className="text-sm leading-tight text-typography-700">
              Eu aceito os{" "}
              <Text className="text-sm text-primary-500 underline">
                Termos de Uso
              </Text>{" "}
              &{" "}
              <Text className="text-sm text-primary-500 underline">
                Política de Privacidade
              </Text>
            </CheckboxLabel>
          </Checkbox>

          {/* Botão de Cadastro */}
          <Button className="w-full" onPress={handleSignup}>
            <ButtonText className="font-bold text-lg">Cadastrar</ButtonText>
          </Button>

          {/* Voltar para Login */}
          <Button
            className="w-full border-primary-500"
            variant="outline"
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
