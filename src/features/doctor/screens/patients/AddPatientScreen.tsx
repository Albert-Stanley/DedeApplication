import React, { useState } from "react";
import { SafeAreaView, ScrollView, Alert } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { TouchableOpacity } from "react-native";
import { ArrowLeft, Save, User } from "lucide-react-native";
import { useRouter } from "expo-router";

const AddPatientScreen: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    cpf: "",
    email: "",
    phone: "",
    birthDate: "",
    address: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleGoBack = () => {
    router.back();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    const { name, cpf, email, phone, birthDate } = formData;

    if (!name.trim()) {
      Alert.alert("Erro", "Nome é obrigatório");
      return false;
    }

    if (!cpf.trim()) {
      Alert.alert("Erro", "CPF é obrigatório");
      return false;
    }

    if (!email.trim()) {
      Alert.alert("Erro", "E-mail é obrigatório");
      return false;
    }

    if (!phone.trim()) {
      Alert.alert("Erro", "Telefone é obrigatório");
      return false;
    }

    if (!birthDate.trim()) {
      Alert.alert("Erro", "Data de nascimento é obrigatória");
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Mock API call - replace with actual API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      Alert.alert("Sucesso", "Paciente adicionado com sucesso!", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Erro ao adicionar paciente. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background-50 dark:bg-background-950">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Box className="px-4 pt-4 pb-6 bg-gradient-to-br from-primary-500 to-primary-700 dark:from-primary-600 dark:to-primary-800">
          <HStack className="items-center justify-between mb-4">
            <TouchableOpacity onPress={handleGoBack} className="p-2 -ml-2">
              <ArrowLeft className="text-white" size={24} />
            </TouchableOpacity>
            <Heading className="text-white text-xl font-semibold flex-1 text-center">
              Adicionar Paciente
            </Heading>
            <Box className="w-10" />
          </HStack>

          {/* Header Card */}
          <Card className="bg-white/10 dark:bg-white/5 backdrop-blur-sm border-white/20 rounded-xl">
            <Box className="p-4">
              <HStack space="md" className="items-center">
                <Box className="bg-white/20 p-3 rounded-full">
                  <User className="text-white" size={24} />
                </Box>
                <VStack>
                  <Heading className="text-white text-lg font-semibold">
                    Novo Paciente
                  </Heading>
                  <Text className="text-white/80 text-sm">
                    Preencha as informações básicas do paciente
                  </Text>
                </VStack>
              </HStack>
            </Box>
          </Card>
        </Box>

        {/* Content */}
        <Box className="flex-1 px-4 -mt-4">
          <VStack space="md" className="w-full">
            {/* Form */}
            <Card className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl">
              <Box className="p-4">
                <VStack space="md">
                  <Heading className="text-gray-900 dark:text-gray-100 text-lg font-semibold mb-2">
                    Informações Pessoais
                  </Heading>

                  <FormControl>
                    <Text className="text-gray-700 dark:text-gray-300 font-medium mb-2">
                      Nome Completo *
                    </Text>
                    <Input size="md">
                      <InputField
                        placeholder="Digite o nome completo"
                        value={formData.name}
                        onChangeText={(value) =>
                          handleInputChange("name", value)
                        }
                      />
                    </Input>
                  </FormControl>

                  <FormControl>
                    <Text className="text-gray-700 dark:text-gray-300 font-medium mb-2">
                      CPF *
                    </Text>
                    <Input size="md">
                      <InputField
                        placeholder="000.000.000-00"
                        value={formData.cpf}
                        onChangeText={(value) =>
                          handleInputChange("cpf", value)
                        }
                        keyboardType="numeric"
                      />
                    </Input>
                  </FormControl>

                  <FormControl>
                    <Text className="text-gray-700 dark:text-gray-300 font-medium mb-2">
                      E-mail *
                    </Text>
                    <Input size="md">
                      <InputField
                        placeholder="email@exemplo.com"
                        value={formData.email}
                        onChangeText={(value) =>
                          handleInputChange("email", value)
                        }
                        keyboardType="email-address"
                        autoCapitalize="none"
                      />
                    </Input>
                  </FormControl>

                  <FormControl>
                    <Text className="text-gray-700 dark:text-gray-300 font-medium mb-2">
                      Telefone *
                    </Text>
                    <Input size="md">
                      <InputField
                        placeholder="(11) 99999-9999"
                        value={formData.phone}
                        onChangeText={(value) =>
                          handleInputChange("phone", value)
                        }
                        keyboardType="phone-pad"
                      />
                    </Input>
                  </FormControl>

                  <FormControl>
                    <Text className="text-gray-700 dark:text-gray-300 font-medium mb-2">
                      Data de Nascimento *
                    </Text>
                    <Input size="md">
                      <InputField
                        placeholder="DD/MM/AAAA"
                        value={formData.birthDate}
                        onChangeText={(value) =>
                          handleInputChange("birthDate", value)
                        }
                        keyboardType="numeric"
                      />
                    </Input>
                  </FormControl>

                  <FormControl>
                    <Text className="text-gray-700 dark:text-gray-300 font-medium mb-2">
                      Endereço
                    </Text>
                    <Input size="md">
                      <InputField
                        placeholder="Rua, número, bairro, cidade"
                        value={formData.address}
                        onChangeText={(value) =>
                          handleInputChange("address", value)
                        }
                        multiline
                        numberOfLines={2}
                      />
                    </Input>
                  </FormControl>

                  <Text className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                    * Campos obrigatórios
                  </Text>
                </VStack>
              </Box>
            </Card>

            {/* Actions */}
            <Card className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl">
              <Box className="p-4">
                <VStack space="sm">
                  <Button
                    onPress={handleSave}
                    variant="solid"
                    size="md"
                    className="bg-primary-600 hover:bg-primary-700"
                    disabled={isLoading}
                  >
                    <ButtonIcon as={Save} className="mr-2" />
                    <ButtonText>
                      {isLoading ? "Salvando..." : "Salvar Paciente"}
                    </ButtonText>
                  </Button>

                  <Button
                    onPress={handleGoBack}
                    variant="outline"
                    size="md"
                    className="border-gray-300 dark:border-gray-600"
                    disabled={isLoading}
                  >
                    <ButtonText className="text-gray-700 dark:text-gray-300">
                      Cancelar
                    </ButtonText>
                  </Button>
                </VStack>
              </Box>
            </Card>

            {/* Bottom Spacing */}
            <Box className="h-8" />
          </VStack>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddPatientScreen;
