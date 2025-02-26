import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Input, InputField, InputSlot, InputIcon } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import {
  EyeIcon,
  EyeOffIcon,
  AlertTriangle,
  SearchIcon,
} from "lucide-react-native";
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
import Modal from "react-native-modal";
import { Platform } from "react-native";
import z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const ufs = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];

const SignupSchema = z
  .object({
    Name: z
      .string()
      .min(1, "Por favor, insira seu nome.")
      .max(100, "O nome deve ter no máximo 100 caracteres.")
      .regex(
        /^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/,
        "O nome não pode conter números ou caracteres especiais."
      ),
    Email: z
      .string()
      .email("E-mail inválido.")
      .max(150, "Máximo de 150 caracteres."),
    Role: z.string(),
    CRM: z
      .string()
      .min(1, "Por favor, insira seu CRM.")
      .max(10, "O CRM deve ter no máximo 10 caracteres.")
      .regex(/^\d+$/, "O CRM deve conter apenas números."),
    Password: z
      .string()
      .min(6, "A senha deve ter pelo menos 6 caracteres.")
      .max(100, "A senha deve ter no máximo 100 caracteres.")
      .regex(/[A-Z]/, "A senha deve conter ao menos uma letra maiúscula.")
      .regex(/[0-9]/, "A senha deve conter ao menos um número.")
      .regex(/[\W_]/, "A senha deve conter ao menos um caractere especial."),
    ConfirmPassword: z
      .string()
      .min(6, "A senha deve ter pelo menos 6 caracteres.")
      .max(100, "A senha deve ter no máximo 100 caracteres.")
      .regex(/[A-Z]/, "A senha deve conter ao menos uma letra maiúscula.")
      .regex(/[0-9]/, "A senha deve conter ao menos um número.")
      .regex(/[\W_]/, "A senha deve conter ao menos um caractere especial."),
    HospitalName: z
      .string()
      .min(1, "Por favor, insira o nome do hospital.")
      .max(100, "O nome do hospital deve ter no máximo 100 caracteres."), //
    UF: z
      .string()
      .length(2, "A UF deve ter exatamente 2 caracteres.")
      .refine((uf) => ufs.includes(uf.toUpperCase()), {
        message: "UF inválida. Escolha uma UF válida.",
      }),
  })
  .refine((data) => data.Password === data.ConfirmPassword, {
    message: "As senhas não coincidem.",
    path: ["ConfirmPassword"], // Especificamos o campo que receberá a mensagem de erro
  });

type Signup = z.infer<typeof SignupSchema>;

const SignupScreen = () => {
  // Hooks de estado para exibir ou ocultar a senha
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profissaoSelecionada, setProfissaoSelecionada] = useState<string>("");

  // Modal termos de uso e politica de privacidade
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const openModal = (content: string) => {
    setModalContent(content);
    setIsModalVisible(true);
  };

  // Hook do formulário
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<Signup>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      Name: "",
      Email: "",
      Role: "",
      CRM: "",
      Password: "",
      ConfirmPassword: "",
      HospitalName: "",
      UF: "",
    },
  });

  const router = useRouter();

  // Função de submissão do formulário
  const onSubmit = (data: Signup) => {
    if (!isTermsAccepted) {
      Alert.alert(
        "Termos de Uso",
        "Você precisa aceitar os Termos de Uso para continuar."
      );
      return;
    }
    console.log("Dados enviados:", data);
    Alert.alert("Cadastro realizado!", "Os dados foram enviados com sucesso.");
  };

  useEffect(() => {
    setIsTermsAccepted(false);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background-50">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Box className="flex-1 justify-center items-center px-4 space-y-2">
          <VStack space="lg" className="w-full max-w-lg p-6">
            {/* Cabeçalho */}
            <Text
              size="2xl"
              className="text-center font-bold text-typography-900"
            >
              Crie sua conta
            </Text>

            {/* Campo de Nome */}
            <FormControl size="lg" isInvalid={!!errors?.Name}>
              <FormControlLabel>
                <FormControlLabelText>Nome</FormControlLabelText>
              </FormControlLabel>
              <Controller
                name="Name"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className="mb-4" size="lg">
                    <InputField
                      id="Name"
                      placeholder="Digite seu Nome"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      returnKeyType="done"
                    />
                  </Input>
                )}
              />
              {errors?.Name && (
                <FormControlError>
                  <FormControlErrorIcon as={AlertTriangle} />
                  <FormControlErrorText>
                    {errors.Name.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>

            {/* Campo de Email */}
            <FormControl size="lg" isInvalid={!!errors?.Email}>
              <FormControlLabel>
                <FormControlLabelText>Email</FormControlLabelText>
              </FormControlLabel>
              <Controller
                name="Email"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className="mb-4" size="lg">
                    <InputField
                      id="Email"
                      placeholder="Digite seu e-mail"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      keyboardType="email-address"
                      returnKeyType="done"
                    />
                  </Input>
                )}
              />
              {errors?.Email && (
                <FormControlError>
                  <FormControlErrorIcon as={AlertTriangle} />
                  <FormControlErrorText>
                    {errors.Email.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>

            {/* Campo de Profissão */}
            <FormControl size="lg" isInvalid={!!errors.Role}>
              <FormControlLabel>
                <FormControlLabelText>Profissão</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                name="Role"
                render={({ field: { onChange, value } }) => (
                  <RadioGroup
                    className="mr-6"
                    value={value || profissaoSelecionada} // Garantir que 'value' é string ou undefined
                    onChange={(newValue: string) => {
                      setProfissaoSelecionada(newValue); // Atualiza o estado
                      onChange(newValue); // Atualiza o campo do formulário
                    }}
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
              {errors?.Role && (
                <FormControlError>
                  <FormControlErrorIcon as={AlertTriangle} />
                  <FormControlErrorText>
                    {errors.Role.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>

            {/* Exibe o campo CRM/CRO apenas se a profissão for "médico" */}
            {profissaoSelecionada === "medico" && (
              <FormControl size="lg" isInvalid={!!errors.CRM}>
                <FormControlLabel>
                  <FormControlLabelText>CRM/CRO</FormControlLabelText>
                </FormControlLabel>
                <Controller
                  control={control}
                  name="CRM"
                  render={({ field }) => (
                    <Input>
                      <InputSlot className="pl-3"></InputSlot>
                      <InputField
                        value={field.value || ""}
                        onChangeText={field.onChange}
                        placeholder="Digite seu CRM ou CRO"
                        keyboardType="numeric"
                      />
                    </Input>
                  )}
                />
                {errors?.CRM && (
                  <FormControlError>
                    <FormControlErrorIcon as={AlertTriangle} />
                    <FormControlErrorText>
                      {errors.CRM.message}
                    </FormControlErrorText>
                  </FormControlError>
                )}
              </FormControl>
            )}
            {/* Campo de Senha */}
            <FormControl isInvalid={!!errors?.Password} className="w-full">
              <FormControlLabel>
                <FormControlLabelText className="font-medium text-base">
                  Senha
                </FormControlLabelText>
              </FormControlLabel>
              <Controller
                name="Password"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className="mb-4" size="lg">
                    <InputField
                      id="Password"
                      placeholder="Digite sua senha"
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
              {errors?.Password && (
                <FormControlError>
                  <FormControlErrorIcon as={AlertTriangle} />
                  <FormControlErrorText>
                    {errors.Password.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>

            {/* Campo de Confirmar Senha */}
            <FormControl size="lg" isInvalid={!!errors?.ConfirmPassword}>
              <FormControlLabel>
                <FormControlLabelText>Confirme sua senha</FormControlLabelText>
              </FormControlLabel>
              <Controller
                name="ConfirmPassword"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className="mb-4" size="lg">
                    <InputField
                      id="ConfirmPassword"
                      placeholder="Digite novamente sua senha"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      secureTextEntry={!showConfirmPassword}
                      returnKeyType="done"
                    />
                    <InputSlot
                      onPress={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="mr-2"
                    >
                      {showConfirmPassword ? (
                        <InputIcon as={EyeIcon} />
                      ) : (
                        <InputIcon as={EyeOffIcon} />
                      )}
                    </InputSlot>
                  </Input>
                )}
              />
              {errors?.ConfirmPassword && (
                <FormControlError>
                  <FormControlErrorIcon as={AlertTriangle} />
                  <FormControlErrorText>
                    {errors.ConfirmPassword.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>

            {/* Campo Imput Nome do Hospital*/}
            <FormControl size="lg" isInvalid={!!errors?.HospitalName}>
              <FormControlLabel>
                <FormControlLabelText>Nome Hospital</FormControlLabelText>
              </FormControlLabel>
              <Controller
                name="HospitalName"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className="mb-4" size="lg">
                    <InputField
                      id="HospitalName"
                      placeholder="Digite o nome do Hospital"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      returnKeyType="done"
                    />
                  </Input>
                )}
              />
              {errors?.HospitalName && (
                <FormControlError>
                  <FormControlErrorIcon as={AlertTriangle} />
                  <FormControlErrorText>
                    {errors.HospitalName.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
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
            <Button className="w-full" onPress={handleSubmit(onSubmit)}>
              <ButtonText className="font-bold text-lg">Cadastrar</ButtonText>
            </Button>

            <Text className="text-lg font-bold">
              Já possui registro? Faça seu login
            </Text>
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
