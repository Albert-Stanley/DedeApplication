// Bibliotecas externas
import React, { useState } from "react";
import { View, Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon, AlertTriangle } from "lucide-react-native";

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
import GoBackArrow from "@/components/common/goBackArrow";

// Componentes específicos do signup
import SelectUF from "../components/signup/SelectUF";
import TermsCheckbox from "../components/signup/TermsCheckBox";
import TermsModal from "../components/signup/TermsModal";
import {
  formatCPF,
  formatCRM,
  formatCNPJ,
  formatDataNascimento,
} from "@/utils/fieldFormatters";

// Serviços
import { useAuthStore } from "@/features/auth/store/authStore";

// Schema de validação Zod
import { SignupSchema, Signup } from "../schemas/signupSchema";

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

  // Hook de autenticação para cadastro
  const { register, setPendingEmail } = useAuthStore();

  // Mutação para cadastro do usuário
  const signupMutation = useMutation({
    // Renomeado para clareza
    mutationFn: async (data: Signup) => {
      // Chama a função do contexto que encapsula a lógica
      const success = await register({
        Name: data.Name,
        CPF: data.CPF,
        CNPJ: data.CNPJ || "",
        DataNascimento: data.DataNascimento,
        CRM: data.CRM || "",
        HospitalName: data.HospitalName,
        UF: data.UF,
        Email: data.Email,
        Password: data.Password, // Passa a senha original do form
      });

      if (!success) {
        // Se handleRegister retornar false, lança um erro para acionar onError
        // Você pode querer buscar a mensagem de erro específica do contexto/serviço se disponível
        throw new Error(
          "Falha ao registrar usuário ou enviar e-mail de verificação."
        );
      }
      // Retorna os dados originais ou o email para uso no onSuccess, se necessário
      return { success: true, email: data.Email };
    },
    onSuccess: (result) => {
      // result agora contém { success: true, email: ... }
      // setPendingEmail(result.email); // O handleRegister no contexto JÁ FAZ ISSO. Não precisa aqui.
      Alert.alert(
        "Cadastro Iniciado!",
        "Enviamos um código de verificação para o seu e-mail." // Mensagem mais precisa
      );
      router.push("/screens/auth/EmailVerification"); // Navega para verificação
    },
    onError: (error: Error) => {
      // Tipar o erro
      console.error("Erro no processo de cadastro:", error);
      Alert.alert(
        "Erro no Cadastro",
        error.message || "Ocorreu um erro. Tente novamente."
      );
    },
  });

  // Função chamada ao submeter o formulário (adapta a chamada da mutação)
  const onSubmit = (data: Signup) => {
    console.log("Dados do formulário:", data);
    signupMutation.mutate(data); // Chama a mutação corrigida
  };

  return (
    <SafeAreaView className="flex-1 bg-background-50">
      <GoBackArrow destinationRoute="/" />
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
                      autoComplete="name"
                      textContentType="name"
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
              <Text className="text-sm mb-1 -mt-2 text-typography-500">
                Digite apenas números
              </Text>
              <Controller
                control={control}
                name="CPF"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className={"mb-1"} size="lg">
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
              <Text className="text-sm mb-1 -mt-2 text-typography-500">
                Digite apenas números
              </Text>
              <Controller
                control={control}
                name="CNPJ"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className={"mb-1"} size="lg">
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
              <Text className="text-sm mb-1 -mt-2 text-typography-500">
                Digite apenas números
              </Text>
              <Controller
                control={control}
                name="DataNascimento"
                render={({ field: { onChange, value } }) => (
                  <Input className="mb-1" size="lg">
                    <InputField
                      value={value || ""}
                      onChangeText={(text) => {
                        const formattedValue = formatDataNascimento(text); // Formata enquanto digita
                        onChange(formattedValue); // Envia o valor formatado
                      }}
                      placeholder="Digite sua Data de Nascimento"
                      keyboardType="numeric"
                      autoComplete="birthdate-full"
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
              <Text className="text-sm mb-1 -mt-2 text-typography-500">
                Digite apenas números
              </Text>
              <Controller
                control={control}
                name="CRM"
                render={({ field: { onChange, value } }) => (
                  <Input className={"mb-1"} size="lg">
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
            <Text className="text-lg font-bold text-typography-900">
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
                      autoComplete="email"
                      textContentType="emailAddress"
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
                  <Input variant="outline" className="mb-1" size="lg">
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
              isDisabled={signupMutation.isPending}
            >
              <ButtonText className="font-bold text-lg">
                {signupMutation.isPending ? (
                  <Spinner size="small" color={colors.gray[500]} /> // mudar cor para acompanhar o tema
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
              onPress={() => router.push("/Login")}
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
