import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { TouchableOpacity } from "react-native";
import {
  ArrowLeft,
  User,
  Calendar,
  FileText,
  Phone,
  Mail,
  MapPin,
  Edit,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

const PatientDetailScreen: React.FC = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  // Mock data - replace with actual API call
  const patient = {
    id: id,
    name: "João Silva Santos",
    cpf: "123.456.789-00",
    email: "joao.silva@email.com",
    phone: "(11) 99999-9999",
    birthDate: "1985-03-15",
    address: "Rua das Flores, 123 - São Paulo, SP",
    formStatus: "in_progress" as const,
    lastFormUpdate: "2024-01-15",
    createdAt: "2024-01-10",
    medicalHistory: [
      {
        id: "1",
        date: "2024-01-15",
        type: "Consulta",
        status: "completed",
        description: "Consulta de rotina - Tudo normal",
      },
      {
        id: "2",
        date: "2024-01-10",
        type: "Formulário",
        status: "in_progress",
        description: "Formulário médico em andamento",
      },
    ],
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleEditPatient = () => {
    router.push(`/doctor/patients/${id}/edit`);
  };

  const handleViewForm = () => {
    router.push(`/doctor/patients/${id}/form`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 dark:text-green-400";
      case "in_progress":
        return "text-yellow-600 dark:text-yellow-400";
      case "pending":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 dark:bg-green-900";
      case "in_progress":
        return "bg-yellow-100 dark:bg-yellow-900";
      case "pending":
        return "bg-red-100 dark:bg-red-900";
      default:
        return "bg-gray-100 dark:bg-gray-900";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return CheckCircle;
      case "in_progress":
        return Clock;
      case "pending":
        return AlertCircle;
      default:
        return Clock;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Concluído";
      case "in_progress":
        return "Em andamento";
      case "pending":
        return "Pendente";
      default:
        return "Desconhecido";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
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
              Detalhes do Paciente
            </Heading>
            <TouchableOpacity onPress={handleEditPatient} className="p-2 -mr-2">
              <Edit className="text-white" size={24} />
            </TouchableOpacity>
          </HStack>

          {/* Patient Summary Card */}
          <Card className="bg-white/10 dark:bg-white/5 backdrop-blur-sm border-white/20 rounded-xl">
            <Box className="p-4">
              <HStack space="md" className="items-center">
                <Box className="bg-white/20 p-4 rounded-full">
                  <User className="text-white" size={32} />
                </Box>
                <VStack className="flex-1">
                  <Heading className="text-white text-lg font-semibold">
                    {patient.name}
                  </Heading>
                  <Text className="text-white/80 text-sm">
                    {calculateAge(patient.birthDate)} anos • CPF: {patient.cpf}
                  </Text>
                  <HStack space="xs" className="items-center mt-1">
                    {React.createElement(getStatusIcon(patient.formStatus), {
                      className: "text-white",
                      size: 16,
                    })}
                    <Text className="text-white text-sm font-medium">
                      {getStatusText(patient.formStatus)}
                    </Text>
                  </HStack>
                </VStack>
              </HStack>
            </Box>
          </Card>
        </Box>

        {/* Content */}
        <Box className="flex-1 px-4 -mt-4">
          <VStack space="md" className="w-full">
            {/* Action Buttons */}
            <Card className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl">
              <Box className="p-4">
                <VStack space="sm">
                  <Button
                    onPress={handleViewForm}
                    variant="solid"
                    size="md"
                    className="bg-primary-600 hover:bg-primary-700"
                  >
                    <ButtonIcon as={FileText} className="mr-2" />
                    <ButtonText>Ver Formulário Médico</ButtonText>
                  </Button>

                  <Button
                    onPress={handleEditPatient}
                    variant="outline"
                    size="md"
                    className="border-gray-300 dark:border-gray-600"
                  >
                    <ButtonIcon
                      as={Edit}
                      className="mr-2 text-gray-600 dark:text-gray-400"
                    />
                    <ButtonText className="text-gray-700 dark:text-gray-300">
                      Editar Dados
                    </ButtonText>
                  </Button>
                </VStack>
              </Box>
            </Card>

            {/* Personal Information */}
            <Card className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl">
              <Box className="p-4">
                <Heading className="text-gray-900 dark:text-gray-100 text-lg font-semibold mb-4">
                  Informações Pessoais
                </Heading>
                <VStack space="md">
                  <HStack space="md" className="items-center">
                    <Box className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                      <Calendar
                        className="text-blue-600 dark:text-blue-400"
                        size={20}
                      />
                    </Box>
                    <VStack className="flex-1">
                      <Text className="text-gray-500 dark:text-gray-400 text-sm">
                        Data de Nascimento
                      </Text>
                      <Text className="text-gray-900 dark:text-gray-100 font-medium">
                        {formatDate(patient.birthDate)} (
                        {calculateAge(patient.birthDate)} anos)
                      </Text>
                    </VStack>
                  </HStack>

                  <HStack space="md" className="items-center">
                    <Box className="bg-green-100 dark:bg-green-900 p-2 rounded-lg">
                      <Mail
                        className="text-green-600 dark:text-green-400"
                        size={20}
                      />
                    </Box>
                    <VStack className="flex-1">
                      <Text className="text-gray-500 dark:text-gray-400 text-sm">
                        E-mail
                      </Text>
                      <Text className="text-gray-900 dark:text-gray-100 font-medium">
                        {patient.email}
                      </Text>
                    </VStack>
                  </HStack>

                  <HStack space="md" className="items-center">
                    <Box className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg">
                      <Phone
                        className="text-purple-600 dark:text-purple-400"
                        size={20}
                      />
                    </Box>
                    <VStack className="flex-1">
                      <Text className="text-gray-500 dark:text-gray-400 text-sm">
                        Telefone
                      </Text>
                      <Text className="text-gray-900 dark:text-gray-100 font-medium">
                        {patient.phone}
                      </Text>
                    </VStack>
                  </HStack>

                  <HStack space="md" className="items-center">
                    <Box className="bg-orange-100 dark:bg-orange-900 p-2 rounded-lg">
                      <MapPin
                        className="text-orange-600 dark:text-orange-400"
                        size={20}
                      />
                    </Box>
                    <VStack className="flex-1">
                      <Text className="text-gray-500 dark:text-gray-400 text-sm">
                        Endereço
                      </Text>
                      <Text className="text-gray-900 dark:text-gray-100 font-medium">
                        {patient.address}
                      </Text>
                    </VStack>
                  </HStack>
                </VStack>
              </Box>
            </Card>

            {/* Medical History */}
            <Card className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl">
              <Box className="p-4">
                <Heading className="text-gray-900 dark:text-gray-100 text-lg font-semibold mb-4">
                  Histórico Médico
                </Heading>
                <VStack space="sm">
                  {patient.medicalHistory.map((record) => {
                    const StatusIcon = getStatusIcon(record.status);
                    return (
                      <Box
                        key={record.id}
                        className="p-4 border border-gray-100 dark:border-gray-700 rounded-lg"
                      >
                        <HStack className="items-center justify-between">
                          <HStack space="md" className="flex-1 items-center">
                            <Box
                              className={`p-2 rounded-lg ${getStatusBgColor(
                                record.status
                              )}`}
                            >
                              <StatusIcon
                                className={getStatusColor(record.status)}
                                size={16}
                              />
                            </Box>
                            <VStack className="flex-1">
                              <Text className="text-gray-900 dark:text-gray-100 font-medium">
                                {record.type}
                              </Text>
                              <Text className="text-gray-500 dark:text-gray-400 text-sm">
                                {record.description}
                              </Text>
                              <Text className="text-gray-400 dark:text-gray-500 text-xs">
                                {formatDate(record.date)}
                              </Text>
                            </VStack>
                          </HStack>
                          <Box
                            className={`px-2 py-1 rounded-full ${getStatusBgColor(
                              record.status
                            )}`}
                          >
                            <Text
                              className={`text-xs font-medium ${getStatusColor(
                                record.status
                              )}`}
                            >
                              {getStatusText(record.status)}
                            </Text>
                          </Box>
                        </HStack>
                      </Box>
                    );
                  })}
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

export default PatientDetailScreen;
