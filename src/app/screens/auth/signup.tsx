import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Input, InputField, InputSlot, InputIcon } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon, AlertCircleIcon } from "lucide-react-native";
import { CircleIcon } from "@/components/ui/icon";
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
import { Alert, ScrollView, View } from "react-native";
import {
  Radio,
  RadioGroup,
  RadioIndicator,
  RadioLabel,
  RadioIcon,
} from "@/components/ui/radio";
import { HStack } from "@/components/ui/hstack";
import { useForm, Controller } from "react-hook-form";
import Modal from "react-native-modal";
import { Platform } from "react-native";
// import { signup, UserData } from "../../../services/authServices";

const SignupScreen = () => {
  const [name, setName] = useState("");
  const [nomeHospital, setNomeHospital] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [uf, setUf] = useState("");
  // Hook do formulário
  const {
    control,
    watch,
    formState: { errors },
  } = useForm();
  const profissaoSelecionada = watch("profissao");
  const router = useRouter();

  // Estados para validação
  const [nameError, setNameError] = useState(false);
  const [nomeHospitalError, setNomeHospitalError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [ufError, setUfError] = useState(false);
  const [crm, setCrm] = useState("");
  // Modal termos de uso e politica de privacidade
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const openModal = (content: string) => {
    setModalContent(content);
    setIsModalVisible(true);
  };

  // Função para realizar o cadastro
  const handleSignup = async () => {
    let isValid = true;

    if (!name.trim()) {
      setNameError(true);
      isValid = false;
    } else {
      setNameError(false);
    }

    if (!uf.trim()) {
      setUfError(true);
      isValid = false;
    } else {
      setUfError(false);
    }

    if (!nomeHospital.trim()) {
      setNomeHospitalError(true);
      isValid = false;
    } else {
      setNomeHospitalError(false);
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      isValid = false;
    } else {
      setEmailError(false);
    }

    if (password.length < 6) {
      setPasswordError(true);
      isValid = false;
    } else {
      setPasswordError(false);
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      isValid = false;
    } else {
      setConfirmPasswordError(false);
    }

    if (!isTermsAccepted) {
      Alert.alert(
        "Termos de Uso",
        "Você precisa aceitar os Termos de Uso para continuar."
      );
      isValid = false;
    }

    if (profissaoSelecionada === "medico" && !crm.trim()) {
      Alert.alert("Erro", "O CRM é obrigatório para médicos.");
      isValid = false;
    }

    if (!isValid) return;

    // Criando objeto para enviar à API
    // const userData: UserData = {
    //   Name: name,
    //   Email: email,
    //   Role: profissaoSelecionada === "medico" ? "Doctor" : "Secretary",
    //   CRM: profissaoSelecionada === "medico" ? crm : undefined,
    //   Password: password,
    //   HospitalName: nomeHospital,
    //   UF: uf.toUpperCase(),
    // };

    //   try {
    //     console.log("Enviando dados para API...", userData);
    //     await signup(userData);
    //     Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
    //     router.push("/");
    //   } catch (error) {
    //     console.error("Erro ao cadastrar:", error);
    //     Alert.alert("Erro", "Não foi possível realizar o cadastro.");
    //   }
  };

  return (
    <SafeAreaView className="flex-1 bg-background-50">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Box className="flex-1 justify-center items-center px-4 space-y-2">
          <VStack space="lg" className="w-full max-w-lg p-6">
            <Text
              size="2xl"
              className="text-center font-bold text-typography-900"
            >
              Crie sua conta
            </Text>
            {/* Campo de Nome */}
            <FormControl size="lg" isInvalid={nameError}>
              <FormControlLabel>
                <FormControlLabelText>Nome</FormControlLabelText>
              </FormControlLabel>
              <Input size="lg">
                <InputField
                  placeholder="Digite seu nome"
                  value={name}
                  onChangeText={setName}
                />
              </Input>
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>Campo obrigatório.</FormControlErrorText>
              </FormControlError>
            </FormControl>
            {/* Campo de Email */}
            <FormControl size="lg" isInvalid={emailError}>
              <FormControlLabel>
                <FormControlLabelText>Email</FormControlLabelText>
              </FormControlLabel>
              <Input size="lg">
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
            {/* Campo Selecionar Profissão */}
            <FormControl size="lg">
              <FormControlLabel>
                <FormControlLabelText>Profissão</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                name="profissao"
                render={({ field: { onChange, value } }) => (
                  <RadioGroup
                    className="mr-6"
                    value={value}
                    onChange={onChange}
                  >
                    <HStack space="md">
                      <Radio value="medico">
                        <RadioIndicator>
                          <RadioIcon as={CircleIcon} />
                        </RadioIndicator>
                        <RadioLabel>Médico(a)</RadioLabel>
                      </Radio>
                      <Radio value="secretario">
                        <RadioIndicator>
                          <RadioIcon as={CircleIcon} />
                        </RadioIndicator>
                        <RadioLabel>Secretário(a)</RadioLabel>
                      </Radio>
                    </HStack>
                  </RadioGroup>
                )}
              />
            </FormControl>
            {/* Exibe o campo CRM/CRO apenas se a profissão for "médico" */}
            {profissaoSelecionada === "medico" && (
              <FormControl size="lg" isInvalid={!!errors.crm}>
                <FormControlLabel>
                  <FormControlLabelText>CRM/CRO</FormControlLabelText>
                </FormControlLabel>
                <Controller
                  control={control}
                  name="crm"
                  rules={{
                    required:
                      profissaoSelecionada === "medico"
                        ? "O CRM/CRO é obrigatório"
                        : false,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Input size="lg">
                      <InputField
                        placeholder="Digite seu CRM ou CRO"
                        value={value}
                        onChangeText={onChange}
                        keyboardType="numeric"
                      />
                    </Input>
                  )}
                />
                {errors.crm && (
                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                      {errors.crm?.message?.toString()}
                    </FormControlErrorText>
                  </FormControlError>
                )}
              </FormControl>
            )}

            {/* Campo de Senha */}
            <FormControl size="lg" isInvalid={passwordError}>
              <FormControlLabel>
                <FormControlLabelText>Senha</FormControlLabelText>
              </FormControlLabel>
              <Input size="lg">
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
                  <InputIcon
                    className="mr-2"
                    as={showPassword ? EyeIcon : EyeOffIcon}
                  />
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
            <FormControl size="lg" isInvalid={confirmPasswordError}>
              <FormControlLabel>
                <FormControlLabelText>Confirme sua senha</FormControlLabelText>
              </FormControlLabel>
              <Input size="lg">
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
                  <InputIcon
                    className="mr-2"
                    as={showConfirmPassword ? EyeIcon : EyeOffIcon}
                  />
                </InputSlot>
              </Input>
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  As senhas não coincidem.
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
            {/* Campo Imput Nome do Hospital*/}
            <FormControl size="lg" isInvalid={nomeHospitalError}>
              <FormControlLabel>
                <FormControlLabelText>Nome Hospital</FormControlLabelText>
              </FormControlLabel>
              <Input size="lg">
                <InputField
                  placeholder="Digite o nome do hospital"
                  value={nomeHospital}
                  onChangeText={(text) => {
                    setNomeHospital(text);
                    setNomeHospitalError(false);
                  }}
                />
              </Input>
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>Campo obrigatório.</FormControlErrorText>
              </FormControlError>
            </FormControl>

            {/* Checkbox de Termos de Uso */}
            <Box className="flex-1 justify-center items-center ">
              <VStack space="lg" className="w-full max-w-lg ">
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
                  <CheckboxLabel className="text-md leading-tight text-typography-700 flex-row flex-wrap">
                    {Platform.OS === "web" ? (
                      <>
                        Eu aceito os{" "}
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            openModal("termos");
                          }}
                          style={{
                            color: "#1E90FF",
                            textDecoration: "underline",
                          }}
                        >
                          Termos de Uso
                        </a>{" "}
                        &{" "}
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            openModal("politica");
                          }}
                          style={{
                            color: "#1E90FF",
                            textDecoration: "underline",
                          }}
                        >
                          Política de Privacidade
                        </a>
                      </>
                    ) : (
                      <Text className="text-sm leading-tight text-typography-700 flex-row flex-wrap">
                        Eu aceito os{" "}
                        <Text
                          className="text-sm text-primary-500 underline"
                          onPress={() => openModal("termos")}
                        >
                          Termos de Uso
                        </Text>{" "}
                        &{" "}
                        <Text
                          className="text-sm text-primary-500 underline"
                          onPress={() => openModal("politica")}
                        >
                          Política de Privacidade
                        </Text>
                      </Text>
                    )}
                  </CheckboxLabel>
                </Checkbox>
              </VStack>
            </Box>
            {/* Modal de Termos de Uso e Política de Privacidade */}
            <Modal
              isVisible={isModalVisible}
              onBackdropPress={() => setIsModalVisible(false)}
            >
              <View className="bg-white p-6 rounded-lg">
                <Text className="text-lg font-bold">
                  {modalContent === "termos"
                    ? "Termos de Uso"
                    : "Política de Privacidade"}
                </Text>
                <Text className="mt-2">
                  {modalContent === "termos"
                    ? "Aqui você pode exibir os Termos de Uso completos."
                    : "Aqui você pode exibir a Política de Privacidade completa."}
                </Text>
                <Button onPress={() => setIsModalVisible(false)}>
                  <ButtonText>Fechar</ButtonText>
                </Button>
              </View>
            </Modal>

            {/* Botão de Cadastro */}
            <Button className="w-full" onPress={handleSignup}>
              <ButtonText className="font-bold text-lg">Cadastrar</ButtonText>
            </Button>
            {/* Voltar para Login */}
            <Button
              variant="outline"
              action="secondary"
              className="rounded-lg border-primary-200"
              onPress={() => router.push("/")}
            >
              <ButtonText className="font-bold text-primary-500 text-lg">
                Voltar para Login
              </ButtonText>
            </Button>
          </VStack>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignupScreen;
