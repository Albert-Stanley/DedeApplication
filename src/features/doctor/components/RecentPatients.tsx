import React from "react";
import { TouchableOpacity } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { Box } from "@/components/ui/box";
import { ArrowRight, User, Clock, CheckCircle } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useRecentPatients } from "../services/doctorService";
import { UI_CONFIG } from "../constants";

const RecentPatients: React.FC = () => {
  const router = useRouter();
  const { data: patients, isLoading } = useRecentPatients(
    UI_CONFIG.RECENT_PATIENTS_LIMIT
  );

  const handleShowAllPatients = () => {
    // Navigate to patients list screen
    router.push("/doctor/patients");
  };

  const handlePatientPress = (patientId: string) => {
    // Navigate to patient details or form
    router.push(`/doctor/patients/${patientId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600";
      case "in_progress":
        return "text-yellow-600";
      case "pending":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return CheckCircle;
      case "in_progress":
        return Clock;
      case "pending":
        return Clock;
      default:
        return User;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <VStack space="md">
        <HStack className="items-center justify-between">
          <Heading className="text-typography-900 text-lg font-semibold">
            Meus Pacientes
          </Heading>
        </HStack>

        <VStack space="sm">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="p-4">
              <HStack className="items-center justify-between">
                <HStack space="md" className="flex-1 items-center">
                  <Box className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
                  <VStack className="flex-1">
                    <Box className="w-32 h-4 bg-gray-200 rounded animate-pulse mb-1" />
                    <Box className="w-24 h-3 bg-gray-200 rounded animate-pulse" />
                  </VStack>
                </HStack>
                <Box className="w-6 h-6 bg-gray-200 rounded animate-pulse" />
              </HStack>
            </Card>
          ))}
        </VStack>
      </VStack>
    );
  }

  return (
    <VStack space="md">
      <HStack className="items-center justify-between">
        <Heading className="text-typography-900 text-lg font-semibold">
          Meus Pacientes
        </Heading>
        <Button
          onPress={handleShowAllPatients}
          variant="outline"
          size="sm"
          className="border-primary-300"
        >
          <ButtonText className="text-primary-600">Ver todos</ButtonText>
          <ButtonIcon
            as={ArrowRight}
            className="ml-1 text-primary-600"
            size="sm"
          />
        </Button>
      </HStack>

      <VStack space="sm">
        {patients && patients.length > 0 ? (
          patients.map((patient) => {
            const StatusIcon = getStatusIcon(patient.formStatus);
            return (
              <TouchableOpacity
                key={patient.id}
                onPress={() => handlePatientPress(patient.id)}
                activeOpacity={0.7}
              >
                <Card className="p-4 hover:bg-gray-50 transition-colors">
                  <HStack className="items-center justify-between">
                    <HStack space="md" className="flex-1 items-center">
                      <Box className="bg-primary-100 p-2 rounded-full">
                        <User className="text-primary-600" size={20} />
                      </Box>
                      <VStack className="flex-1">
                        <Text className="text-typography-900 font-semibold text-base">
                          {patient.name}
                        </Text>
                        <Text className="text-typography-500 text-sm">
                          Última atualização:{" "}
                          {formatDate(patient.lastFormUpdate)}
                        </Text>
                      </VStack>
                    </HStack>

                    <HStack space="sm" className="items-center">
                      <StatusIcon
                        className={getStatusColor(patient.formStatus)}
                        size={16}
                      />
                      <ArrowRight className="text-gray-400" size={16} />
                    </HStack>
                  </HStack>
                </Card>
              </TouchableOpacity>
            );
          })
        ) : (
          <Card className="p-6">
            <VStack space="sm" className="items-center">
              <Box className="bg-gray-100 p-4 rounded-full">
                <User className="text-gray-400" size={32} />
              </Box>
              <Text className="text-typography-500 text-center">
                Nenhum paciente encontrado
              </Text>
              <Text className="text-typography-400 text-sm text-center">
                Quando você tiver pacientes, eles aparecerão aqui
              </Text>
            </VStack>
          </Card>
        )}
      </VStack>
    </VStack>
  );
};

export default RecentPatients;
