import React, { useState } from "react";
import { SafeAreaView, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "expo-router";

import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Spinner } from "@/components/ui/spinner";
import { AlertTriangle } from "lucide-react-native";
import colors from "tailwindcss/colors";

import { useCreateAccessKey } from "../services/doctorService";
import { useAuthStore } from "@/features/auth/store/authStore";
import GoBackArrow from "@/components/common/goBackArrow";

// Validation schema
const createAccessKeySchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
});

type CreateAccessKeyForm = z.infer<typeof createAccessKeySchema>;

const CreateAccessKeyScreen: React.FC = () => {
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const router = useRouter();
  const { user } = useAuthStore();
  const createAccessKeyMutation = useCreateAccessKey();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateAccessKeyForm>({
    resolver: zodResolver(createAccessKeySchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = async (data: CreateAccessKeyForm) => {
    if (!user?.id) {
      Alert.alert("Erro", "Usuário não encontrado. Faça login novamente.");
      return;
    }

    try {
      const result = await createAccessKeyMutation.mutateAsync({
        ...data,
        doctorId: user.id,
      });

      setGeneratedKey(result.accessKey);
      reset();

      Alert.alert(
        "Chave Criada com Sucesso!",
        "A chave de acesso foi gerada. Compartilhe com a secretária responsável."
      );
    } catch (error) {
      Alert.alert(
        "Erro",
        "Não foi possível criar a chave de acesso. Tente novamente."
      );
    }
  };

  const copyToClipboard = () => {
    // TODO: Implement clipboard functionality
    Alert.alert("Copiado!", "Chave copiada para a área de transferência.");
  };

  return (
    <SafeAreaView className="flex-1 bg-background-50">
      <GoBackArrow destinationRoute="/doctor" />

      <Box className="flex-1 mt-16 px-8 pt-4">
        <VStack space="lg" className="w-full">
          {/* Header */}
          <VStack space="sm">
            <Heading className="text-typography-900 text-2xl font-bold">
              Criar Chave de Acesso
            </Heading>
            <Text className="text-typography-600">
              Gere uma chave para que sua secretária possa acessar o sistema
            </Text>
          </VStack>

          <Card className="p-6">
            <VStack space="md">
              {/* Name Field */}
              <FormControl size="lg" isInvalid={!!errors.name}>
                <FormControlLabel>
                  <FormControlLabelText>
                    Nome da Secretária
                  </FormControlLabelText>
                </FormControlLabel>
                <Controller
                  name="name"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input className="mb-1" size="lg">
                      <InputField
                        placeholder="Digite o nome completo"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        returnKeyType="next"
                      />
                    </Input>
                  )}
                />
                {errors.name && (
                  <FormControlError>
                    <FormControlErrorIcon as={AlertTriangle} />
                    <FormControlErrorText>
                      {errors.name.message}
                    </FormControlErrorText>
                  </FormControlError>
                )}
              </FormControl>

              {/* Email Field */}
              <FormControl size="lg" isInvalid={!!errors.email}>
                <FormControlLabel>
                  <FormControlLabelText>
                    Email da Secretária
                  </FormControlLabelText>
                </FormControlLabel>
                <Controller
                  name="email"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input className="mb-1" size="lg">
                      <InputField
                        placeholder="secretaria@exemplo.com"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        keyboardType="email-address"
                        autoComplete="email"
                        returnKeyType="done"
                      />
                    </Input>
                  )}
                />
                {errors.email && (
                  <FormControlError>
                    <FormControlErrorIcon as={AlertTriangle} />
                    <FormControlErrorText>
                      {errors.email.message}
                    </FormControlErrorText>
                  </FormControlError>
                )}
              </FormControl>

              {/* Submit Button */}
              <Button
                className="w-full mt-4"
                onPress={handleSubmit(onSubmit)}
                isDisabled={createAccessKeyMutation.isPending}
              >
                <ButtonText className="font-bold text-lg">
                  {createAccessKeyMutation.isPending ? (
                    <Spinner size="small" color={colors.gray[500]} />
                  ) : (
                    "Gerar Chave de Acesso"
                  )}
                </ButtonText>
              </Button>
            </VStack>
          </Card>

          {/* Generated Key Display */}
          {generatedKey && (
            <Card className="p-6 bg-green-50 border-green-200">
              <VStack space="md">
                <Heading className="text-green-800 text-lg font-semibold">
                  Chave Gerada com Sucesso!
                </Heading>

                <Box className="bg-white p-4 rounded-lg border border-green-300">
                  <Text className="text-center font-mono text-lg font-bold text-green-900">
                    {generatedKey}
                  </Text>
                </Box>

                <Button
                  variant="outline"
                  action="secondary"
                  onPress={copyToClipboard}
                  className="border-green-300"
                >
                  <ButtonText className="text-green-700 font-semibold">
                    Copiar Chave
                  </ButtonText>
                </Button>

                <Text className="text-green-700 text-sm text-center">
                  Compartilhe esta chave com sua secretária para que ela possa
                  se cadastrar no sistema.
                </Text>
              </VStack>
            </Card>
          )}
        </VStack>
      </Box>
    </SafeAreaView>
  );
};

export default CreateAccessKeyScreen;
