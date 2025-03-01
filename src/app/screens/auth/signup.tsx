// Bibliotecas externas
import React, { useEffect, useState } from "react";
import { View, Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { EyeIcon, EyeOffIcon, AlertTriangle } from "lucide-react-native";

// Componentes UI internos
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { CircleIcon } from "@/components/ui/icon";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import {
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
} from "@/components/ui/radio";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Spinner } from "@/components/ui/spinner";
import colors from "tailwindcss/colors";
// Componentes específicos do signup
import SelectUF from "@/components/signup/selectUF";
import TermsCheckbox from "@/components/signup/termsCheckBox";
import TermsModal from "@/components/signup/termsModal";

// Serviços
import { registerUser } from "@/services/authServices";

const SignupSchema = z
  .object({
    Name: z
      .string()
      .min(1, "Por favor, insira seu nome.")
      .max(100, "O nome deve ter no máximo 100 caracteres.")
      .regex(
        /^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/,
        "O nome não pode conter números ou caracteres especiais."
      )
      .trim(),
    Email: z
      .string()
      .email("E-mail inválido.")
      .max(150, "Máximo de 150 caracteres."),
    Role: z
      .string()
      .min(1, "Por favor, selecione sua profissão.")
      .refine(
        (value) => value === "" || value === "Médico" || value === "Secretário",
        {
          message: "Profissão inválida.",
        }
      )
      .default(""), // Permite valor inicial vazio
    CRM: z
      .string()
      .max(10, "O CRM deve ter no máximo 10 caracteres.")
      // .regex(/^\d+$/, "O CRM deve conter apenas números.")
      .trim()
      .optional(),
    Password: z
      .string()
      .min(6, "A senha deve ter pelo menos 6 caracteres.")
      .max(100, "A senha deve ter no máximo 100 caracteres.")
      .regex(/[A-Z]/, "A senha deve conter ao menos uma letra maiúscula.")
      .regex(/[0-9]/, "A senha deve conter ao menos um número.")
      .regex(/[\W_]/, "A senha deve conter ao menos um caractere especial.")
      .trim(),
    ConfirmPassword: z
      .string()
      .min(6, "A senha deve ter pelo menos 6 caracteres.")
      .max(100, "A senha deve ter no máximo 100 caracteres.")
      .regex(/[A-Z]/, "A senha deve conter ao menos uma letra maiúscula.")
      .regex(/[0-9]/, "A senha deve conter ao menos um número.")
      .regex(/[\W_]/, "A senha deve conter ao menos um caractere especial.")
      .trim(),
    HospitalName: z
      .string()
      .min(1, "Por favor, insira o nome do hospital.")
      .max(100, "O nome do hospital deve ter no máximo 100 caracteres.")
      .trim(),
    UF: z
      .string()
      .length(2, "Por favor, selecione sua uf.")
      .refine((uf) => uf.includes(uf.toUpperCase()), {
        message: "UF inválida. Escolha uma UF válida.",
      }),
    isTermsAccepted: z.boolean().refine((val) => val === true, {
      message: "Você deve aceitar os termos de uso.",
    }),
  })
  .refine((data) => data.Password === data.ConfirmPassword, {
    message: "As senhas não coincidem.",
    path: ["ConfirmPassword"], // Especificamos o campo que receberá a mensagem de erro
  })
  .refine(
    (data) => {
      if (data.Role === "Médico" && !data.CRM) {
        return false; // Validação do CRM apenas se o Role for "Médico"
      }
      return true;
    },
    {
      message: "CRM é necessário para médicos.",
      path: ["CRM"],
    }
  );

type Signup = z.infer<typeof SignupSchema>;

const SignupScreen = () => {
  // Hooks de estado para exibir ou ocultar a senha
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<"termos" | "politica">(
    "termos"
  );

  // Função para abrir o modal com conteúdo dinâmico
  const openModal = (content: "termos" | "politica") => {
    setModalContent(content);
    setIsModalVisible(true);
  };

  // Hook de formulários com validação Zod
  const {
    watch,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    trigger,
  } = useForm<Signup>({
    resolver: zodResolver(SignupSchema), // Conectar com o schema de validação Zod
    defaultValues: {
      Name: "",
      Email: "",
      CRM: "",
      Role: "",
      Password: "",
      ConfirmPassword: "",
      HospitalName: "",
      UF: "",
      isTermsAccepted: false,
    },
  });

  // Função para formatar o CRM removendo qualquer caracter não numérico
  const formatCRM = (value: string) => value.replace(/\D/g, "");

  // Obtém o valor da 'Role' em tempo real para manipulação do formulário
  const selectedRole = watch("Role") || "";

  // Hook de roteamento para navegar entre as telas
  const router = useRouter();

  // Limpa o campo CRM caso a profissão seja "Secretário"
  useEffect(() => {
    if (selectedRole === "Secretário") {
      setValue("CRM", ""); // Limpa o CRM quando a profissão for "Secretário"
    }
  }, [selectedRole, setValue]);

  // Efeito para limpar o CRM e revalidar sempre que a profissão não for "Médico"
  useEffect(() => {
    if (selectedRole !== "Médico") {
      setValue("CRM", ""); // Limpa o CRM caso a profissão não seja "Médico"
      trigger("CRM"); // Revalida o campo CRM
    }
  }, [selectedRole, setValue, trigger]);

  // Mutação para cadastro do usuário
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: Signup) => {
      return registerUser(
        data.Name,
        data.Email,
        data.Role,
        data.CRM || "",
        data.Password,
        data.HospitalName,
        data.UF
      );
    },
    onSuccess: (response) => {
      // Exibir a resposta completa no console para depuração
      console.log("Resposta do backend:", response);
      if (response.success) {
        Alert.alert(
          "Cadastro realizado!",
          "Os dados foram enviados com sucesso."
        );
        router.push("/success");
      } else {
        Alert.alert("Erro", response.message || "Erro ao cadastrar.");
      }
    },
    onError: (error) => {
      // Exibir erro completo no console
      console.log("Erro ao tentar cadastrar:", error);

      Alert.alert(
        "Erro",
        "Ocorreu um erro ao tentar cadastrar. Tente novamente mais tarde."
      );
      console.error("Erro no cadastro:", error);
    },
  });

  const onSubmit = (data: Signup) => {
    console.log("Dados do formulário:", data);

    mutate(data);
  };

  return (
    <SafeAreaView className="flex-1 bg-background-50">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Box className="flex-1 justify-center items-center px-4 space-y-1">
          <VStack space="sm" className="w-full max-w-lg p-6">
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
            <FormControl className="mb-3" size="lg" isInvalid={!!errors.Role}>
              <FormControlLabel>
                <FormControlLabelText>Profissão</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                name="Role"
                render={({ field: { onChange, value } }) => (
                  <RadioGroup
                    className="mr-6"
                    value={value}
                    onChange={(newValue: string) => {
                      onChange(newValue);
                      // Limpa o CRM e revalida ao mudar para "Secretário"
                      if (newValue !== "Médico") {
                        setValue("CRM", "");
                        trigger("CRM");
                      }
                    }}
                  >
                    <HStack space="md">
                      <Radio id="Médico" value="Médico">
                        <RadioIndicator>
                          <RadioIcon as={CircleIcon} />
                        </RadioIndicator>
                        <RadioLabel>Médico(a)</RadioLabel>
                      </Radio>
                      <Radio id="Secretário" value="Secretário">
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
                <FormControlError className="mt-1">
                  <FormControlErrorIcon as={AlertTriangle} />
                  <FormControlErrorText>
                    {errors.Role.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>

            {/* Exibe o campo CRM apenas se a profissão for "Médico" */}
            {selectedRole === "Médico" && (
              <FormControl size="lg" isInvalid={!!errors.CRM}>
                <FormControlLabel>
                  <FormControlLabelText>CRM</FormControlLabelText>
                </FormControlLabel>
                <Controller
                  control={control}
                  name="CRM"
                  render={({ field }) => (
                    <Input>
                      <InputSlot></InputSlot>
                      <InputField
                        value={field.value || ""}
                        onChangeText={(text) => {
                          const formattedText = formatCRM(text);
                          field.onChange(formattedText); // Formata e atualiza o CRM
                        }}
                        placeholder="Digite seu CRM"
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
            <FormControl size="lg" isInvalid={!!errors?.Password}>
              <FormControlLabel>
                <FormControlLabelText>Senha</FormControlLabelText>
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

            {/* Campo de UF */}
            <Text className="text-lg font-bold font-medium text-typography-900">
              Selecione sua UF
            </Text>
            <Controller
              name="UF"
              control={control}
              render={({ field }) => (
                <SelectUF
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.UF?.message}
                />
              )}
            />

            {/* Checkbox de Termos de Uso */}
            <View className="mt-4">
              <TermsCheckbox
                isChecked={watch("isTermsAccepted")}
                onChange={(checked) => setValue("isTermsAccepted", checked)}
                onOpenModal={openModal}
                error={errors.isTermsAccepted?.message ?? ""}
              />
            </View>

            {/* Modal de Termos de Uso e Política de Privacidade */}
            <TermsModal
              visible={isModalVisible}
              onClose={() => setIsModalVisible(false)}
              contentType={modalContent}
            />

            {/* Botão de Cadastro */}
            <Button
              className="w-full"
              onPress={handleSubmit(onSubmit)}
              isDisabled={isPending}
            >
              <ButtonText className="font-bold text-lg">
                {isPending ? (
                  <Spinner size="small" color={colors.gray[500]} />
                ) : (
                  "Cadastrar"
                )}
              </ButtonText>
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
