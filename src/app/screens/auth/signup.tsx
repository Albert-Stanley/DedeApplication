// Bibliotecas externas
import React, { useState } from "react";
import { View, Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  EyeIcon,
  EyeOffIcon,
  AlertTriangle,
  ArrowLeftIcon,
} from "lucide-react-native";

// Componentes UI internos
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Spinner } from "@/components/ui/spinner";
import colors from "tailwindcss/colors";
import GoBackArrow from "@/utils/goBackArrow";

// Componentes específicos do signup
import SelectUF from "@/components/signup/selectUF";
import TermsCheckbox from "@/components/signup/termsCheckBox";
import TermsModal from "@/components/signup/termsModal";
import {
  formatCPF,
  formatCRM,
  formatCNPJ,
  formatDataNascimento,
} from "@/utils/fieldFormatters";
import {
  isValidCPF,
  isValidCNPJ,
  isValidDataNascimento,
} from "@/utils/validations";

// Serviços
import { registerUser } from "@/services/authServices";

//
const SignupSchema = z
  .object({
    Name: z
      .string()
      .min(1, "O nome é obrigatório.")
      .max(100, "O nome deve ter no máximo 100 caracteres.")
      .regex(
        /^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/,
        "O nome não pode conter números ou caracteres especiais."
      )
      .trim(),

    CPF: z
      .string()
      .refine(
        (val) => {
          const cleaned = val.replace(/\D/g, ""); // Limpeza para remover qualquer caractere não numérico
          return cleaned.length === 11 && isValidCPF(cleaned); // Verifica a validade do CPF
        },
        {
          message: "CPF inválido. Formato esperado: 111.111.111-11.",
        }
      )
      .transform((val) => {
        const cleaned = val.replace(/\D/g, ""); // Limpeza dos caracteres não numéricos
        return formatCPF(cleaned); // Formata o CPF após a validação
      }),

    CNPJ: z
      .string()
      .refine(
        (val) => {
          const cleaned = val.replace(/\D/g, ""); // Limpeza dos caracteres não numéricos
          return cleaned.length === 14 && isValidCNPJ(cleaned); // Verifica a validade do CNPJ
        },
        {
          message: "CNPJ inválido. Formato esperado: 11.111.111/1111-11.",
        }
      )
      .transform((val) => {
        const cleaned = val.replace(/\D/g, ""); // Limpeza dos caracteres não numéricos
        return formatCNPJ(cleaned); // Formata o CNPJ após a validação
      }),

    DataNascimento: z
      .string()
      .refine(
        (val) => {
          const cleaned = val.replace(/\D/g, ""); // Remove os caracteres não numéricos
          return cleaned.length === 8 && isValidDataNascimento(cleaned); // Verifica a validade da Data de Nascimento
        },
        {
          message: "Data de nascimento inválida. Formato esperado: dd/mm/aaaa.",
        }
      )
      .transform((val) => {
        const cleaned = val.replace(/\D/g, ""); // Limpeza do valor
        return formatDataNascimento(cleaned); // Formata a Data de Nascimento após a validação
      }),

    CRM: z
      .string()
      .min(1, "O CRM é obrigatório.")
      .max(10, "O CRM deve ter no máximo 10 caracteres.")
      .regex(/^\d+$/, "O CRM deve conter apenas números.")
      .length(10, "O CRM deve ter exatamente 10 caracteres.") // Valida tamanho exato
      .trim(),

    HospitalName: z
      .string()
      .min(1, "O nome do hospital é obrigatório.")
      .max(100, "O nome do hospital deve ter no máximo 100 caracteres.")
      .trim(),

    UF: z
      .string()
      .length(2, "Por favor, selecione sua UF.")
      .refine((uf) => uf.includes(uf.toUpperCase()), {
        message: "UF inválida. Escolha uma UF válida.",
      }),

    Email: z
      .string()
      .email("E-mail inválido.")
      .min(5, "O E-mail é obrigatório.")
      .max(150, "Máximo de 150 caracteres."),

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

    isTermsAccepted: z.boolean().refine((val) => val === true, {
      message: "Você deve aceitar os termos de uso.",
    }),
  })
  .refine((data) => data.Password === data.ConfirmPassword, {
    message: "As senhas não coincidem.",
    path: ["ConfirmPassword"], // Campo que receberá a mensagem de erro
  });

// Tipo inferido do schema Zod
type Signup = z.infer<typeof SignupSchema>;

// Componente de tela para o cadastro
const SignupScreen = () => {
  // Hooks de estado para exibir ou ocultar a senha
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Estado do modal (para termos de uso ou política)
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
  } = useForm<Signup>({
    resolver: zodResolver(SignupSchema), // Conectar com o schema de validação Zod
    defaultValues: {
      Name: "",
      CPF: "",
      CNPJ: "",
      DataNascimento: "",
      CRM: "",
      HospitalName: "",
      UF: "",
      Email: "",
      Password: "",
      ConfirmPassword: "",
      isTermsAccepted: false,
    },
  });

  // Hook de roteamento para navegação entre as telas
  const router = useRouter();

  // Mutação para cadastro do usuário
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: Signup) => {
      return registerUser(
        data.Name,
        data.CPF,
        data.CNPJ || "",
        data.DataNascimento,
        data.Email,
        data.CRM || "",
        data.Password,
        data.HospitalName,
        data.UF
      );
    },
    onSuccess: (response) => {
      // Exibe a resposta do backend para depuração
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
      // Exibe o erro completo no console para depuração
      console.log("Erro ao tentar cadastrar:", error);
      Alert.alert(
        "Erro",
        "Ocorreu um erro ao tentar cadastrar. Tente novamente mais tarde."
      );
      console.error("Erro no cadastro:", error);
    },
  });

  // Função chamada ao submeter o formulário
  const onSubmit = (data: Signup) => {
    console.log("Dados do formulário:", data);
    mutate(data); // Inicia a mutação para cadastro
  };

  return (
    <SafeAreaView className="flex-1 bg-background-50">
      <GoBackArrow />
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
                  <Input className="mb-1" size="lg">
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

            {/* Campo CPF */}
            <FormControl size="lg" isInvalid={!!errors.CPF}>
              <FormControlLabel>
                <FormControlLabelText>CPF</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                name="CPF"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    className={`mb-1 ${
                      value && !errors.CPF ? "border-gray-300" : ""
                    }`}
                    size="lg"
                  >
                    <InputField
                      value={value}
                      onChangeText={(text) => onChange(formatCPF(text))}
                      onBlur={onBlur}
                      placeholder="Digite seu CPF"
                      keyboardType="numeric"
                      returnKeyType="done"
                    />
                  </Input>
                )}
              />
              {errors?.CPF && (
                <FormControlError>
                  <FormControlErrorIcon as={AlertTriangle} />
                  <FormControlErrorText>
                    {errors.CPF.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>

            {/* Campo CNPJ */}
            <FormControl size="lg" isInvalid={!!errors.CNPJ}>
              <FormControlLabel>
                <FormControlLabelText>CNPJ</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                name="CNPJ"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    className={`mb-1 ${
                      value && !errors.CNPJ ? "border-gray-300" : ""
                    }`}
                    size="lg"
                  >
                    <InputField
                      value={value}
                      onChangeText={(text) => onChange(formatCNPJ(text))}
                      onBlur={onBlur}
                      placeholder="Digite seu CNPJ"
                      keyboardType="numeric"
                      returnKeyType="done"
                    />
                  </Input>
                )}
              />
              {errors?.CNPJ && (
                <FormControlError>
                  <FormControlErrorIcon as={AlertTriangle} />
                  <FormControlErrorText>
                    {errors.CNPJ.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>

            {/* Campo Data de Nascimento */}
            <FormControl size="lg" isInvalid={!!errors.DataNascimento}>
              <FormControlLabel>
                <FormControlLabelText>Data de Nascimento</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                name="DataNascimento"
                render={({ field: { onChange, value } }) => (
                  <Input size="lg">
                    <InputField
                      value={value || ""}
                      onChangeText={(text) => {
                        const formattedValue = formatDataNascimento(text); // Formata enquanto digita
                        onChange(formattedValue); // Envia o valor formatado
                      }}
                      placeholder="Digite sua Data de Nascimento"
                      keyboardType="numeric"
                    />
                  </Input>
                )}
              />
              {errors?.DataNascimento && (
                <FormControlError>
                  <FormControlErrorIcon as={AlertTriangle} />
                  <FormControlErrorText>
                    {errors.DataNascimento.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>

            {/* Campo CRM */}
            <FormControl size="lg" isInvalid={!!errors.CRM}>
              <FormControlLabel>
                <FormControlLabelText>CRM</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                name="CRM"
                render={({ field: { onChange, value } }) => (
                  <Input
                    className={`mb-1 ${
                      value && !errors.CRM ? "border-gray-300" : ""
                    }`}
                    size="lg"
                  >
                    <InputField
                      value={value || ""}
                      onChangeText={(text) => onChange(formatCRM(text))}
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

            {/* Campo Imput Nome do Hospital*/}
            <FormControl size="lg" isInvalid={!!errors?.HospitalName}>
              <FormControlLabel>
                <FormControlLabelText>Nome Hospital</FormControlLabelText>
              </FormControlLabel>
              <Controller
                name="HospitalName"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className="mb-1" size="lg">
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

            {/* Campo de Email */}
            <FormControl size="lg" isInvalid={!!errors?.Email}>
              <FormControlLabel>
                <FormControlLabelText>Email</FormControlLabelText>
              </FormControlLabel>
              <Controller
                name="Email"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className="mb-1" size="lg">
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

            {/* Campo de Senha */}
            <FormControl size="lg" isInvalid={!!errors?.Password}>
              <FormControlLabel>
                <FormControlLabelText>Senha</FormControlLabelText>
              </FormControlLabel>
              <Controller
                name="Password"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className="mb-1" size="lg">
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
                  <Input variant="rounded" className="mb-1" size="lg">
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
            {/* Ir para o Login */}
            <Button
              variant="outline"
              action="secondary"
              className="rounded-lg border-primary-200"
              onPress={() => router.push("/screens/auth/login")}
            >
              <ButtonText className="font-bold text-primary-500 text-lg">
                Ir para o Login
              </ButtonText>
            </Button>
          </VStack>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignupScreen;
