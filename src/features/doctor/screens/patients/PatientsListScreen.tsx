import React, { useState } from "react";
import { SafeAreaView, ScrollView, RefreshControl } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Input, InputField, InputSlot, InputIcon } from "@/components/ui/input";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { TouchableOpacity } from "react-native";
import {
  Search,
  User,
  Clock,
  CheckCircle,
  Filter,
  Plus,
  ArrowLeft,
  SortAsc,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import { useAllPatients } from "../../services/doctorService";
import type { Patient } from "../../types";
import GoBackArrow from "@/components/common/goBackArrow";

const PatientsListScreen: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"name" | "date">("name");

  const { data: patients, isLoading, refetch } = useAllPatients();

  const handlePatientPress = (patientId: string) => {
    router.push(`/doctor/patients/${patientId}`);
  };

  const handleAddPatient = () => {
    router.push("/doctor/patients/add");
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
        return Clock;
      default:
        return User;
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

  // Filter and sort patients
  const filteredPatients =
    patients
      ?.filter((patient: Patient) => {
        const matchesSearch =
          patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          patient.cpf.includes(searchQuery);
        const matchesFilter =
          filterStatus === "all" || patient.formStatus === filterStatus;
        return matchesSearch && matchesFilter;
      })
      .sort((a: Patient, b: Patient) => {
        if (sortBy === "name") {
          return a.name.localeCompare(b.name);
        } else {
          return (
            new Date(b.lastFormUpdate).getTime() -
            new Date(a.lastFormUpdate).getTime()
          );
        }
      }) || [];

  return (
    <SafeAreaView className="flex-1 screen-bg">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
      >
        {/* Header */}
        <Box className="px-4 pt-4 pb-6 header-bg">
          <HStack className="items-center justify-between mb-4">
            <GoBackArrow />
            <Heading className="text-white text-xl font-semibold flex-1 text-center">
              Todos os Pacientes
            </Heading>
            <TouchableOpacity onPress={handleAddPatient} className="p-2 -mr-2">
              <Plus className="text-white" size={24} />
            </TouchableOpacity>
          </HStack>

          {/* Search and Filters */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl">
            <Box className="p-3">
              <VStack space="sm">
                {/* Search Input */}
                <Input size="md" className="bg-white/20 border-white/30">
                  <InputSlot className="pl-3">
                    <InputIcon as={Search} className="text-white/70" />
                  </InputSlot>
                  <InputField
                    placeholder="Buscar por nome ou CPF..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    className="text-white"
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                  />
                </Input>

                {/* Filter Buttons */}
                <HStack space="sm" className="flex-wrap">
                  <TouchableOpacity
                    onPress={() => setFilterStatus("all")}
                    className={
                      filterStatus === "all"
                        ? "filter-button-active"
                        : "filter-button"
                    }
                  >
                    <Text className="text-white text-sm font-medium">
                      Todos
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setFilterStatus("pending")}
                    className={
                      filterStatus === "pending"
                        ? "filter-button-active"
                        : "filter-button"
                    }
                  >
                    <Text className="text-white text-sm font-medium">
                      Pendentes
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setFilterStatus("in_progress")}
                    className={
                      filterStatus === "in_progress"
                        ? "filter-button-active"
                        : "filter-button"
                    }
                  >
                    <Text className="text-white text-sm font-medium">
                      Em andamento
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setFilterStatus("completed")}
                    className={
                      filterStatus === "completed"
                        ? "filter-button-active"
                        : "filter-button"
                    }
                  >
                    <Text className="text-white text-sm font-medium">
                      Concluídos
                    </Text>
                  </TouchableOpacity>
                </HStack>
              </VStack>
            </Box>
          </Card>
        </Box>

        {/* Content */}
        <Box className="flex-1 px-4 -mt-4">
          <VStack space="md" className="w-full">
            {/* Sort and Results Count */}
            <Card className="card-bg shadow-card rounded-xl">
              <Box className="p-4">
                <HStack className="items-center justify-between">
                  <Text className="text-secondary text-sm">
                    {filteredPatients.length} paciente(s) encontrado(s)
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      setSortBy(sortBy === "name" ? "date" : "name")
                    }
                    className="flex-row items-center"
                  >
                    <SortAsc
                      className="text-primary-600 dark:text-primary-400 mr-1"
                      size={16}
                    />
                    <Text className="text-primary-600 dark:text-primary-400 text-sm font-medium">
                      {sortBy === "name" ? "Nome" : "Data"}
                    </Text>
                  </TouchableOpacity>
                </HStack>
              </Box>
            </Card>

            {/* Patients List */}
            <Card className="card-bg shadow-card rounded-xl">
              <Box className="p-4">
                <VStack space="sm">
                  {isLoading ? (
                    // Loading skeleton
                    Array.from({ length: 5 }).map((_, index) => (
                      <Box
                        key={index}
                        className="p-4 border border-gray-100 dark:border-gray-700 rounded-lg"
                      >
                        <HStack className="items-center justify-between">
                          <HStack space="md" className="flex-1 items-center">
                            <Box className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
                            <VStack className="flex-1">
                              <Box className="w-40 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
                              <Box className="w-32 h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-1" />
                              <Box className="w-28 h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                            </VStack>
                          </HStack>
                          <Box className="w-20 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                        </HStack>
                      </Box>
                    ))
                  ) : filteredPatients.length > 0 ? (
                    filteredPatients.map((patient: Patient) => {
                      const StatusIcon = getStatusIcon(patient.formStatus);
                      return (
                        <TouchableOpacity
                          key={patient.id}
                          onPress={() => handlePatientPress(patient.id)}
                          activeOpacity={0.7}
                        >
                          <Box className="p-4 border-default rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <HStack className="items-center justify-between">
                              <HStack
                                space="md"
                                className="flex-1 items-center"
                              >
                                <Box className="bg-primary-100 dark:bg-primary-900 p-3 rounded-full">
                                  <User
                                    className="text-primary-600 dark:text-primary-400"
                                    size={24}
                                  />
                                </Box>
                                <VStack className="flex-1">
                                  <Text className="text-primary font-semibold text-base">
                                    {patient.name}
                                  </Text>
                                  <Text className="text-secondary text-sm">
                                    CPF: {patient.cpf}
                                  </Text>
                                  <Text className="text-secondary text-sm">
                                    Última atualização:{" "}
                                    {formatDate(patient.lastFormUpdate)}
                                  </Text>
                                </VStack>
                              </HStack>

                              <VStack className="items-end">
                                <Box
                                  className={`px-3 py-1 rounded-full ${getStatusBgColor(
                                    patient.formStatus
                                  )}`}
                                >
                                  <HStack space="xs" className="items-center">
                                    <StatusIcon
                                      className={getStatusColor(
                                        patient.formStatus
                                      )}
                                      size={12}
                                    />
                                    <Text
                                      className={`text-xs font-medium ${getStatusColor(
                                        patient.formStatus
                                      )}`}
                                    >
                                      {getStatusText(patient.formStatus)}
                                    </Text>
                                  </HStack>
                                </Box>
                              </VStack>
                            </HStack>
                          </Box>
                        </TouchableOpacity>
                      );
                    })
                  ) : (
                    <Box className="p-8">
                      <VStack space="md" className="items-center">
                        <Box className="bg-gray-100 dark:bg-gray-800 p-6 rounded-full">
                          <User className="text-secondary" size={48} />
                        </Box>
                        <VStack space="sm" className="items-center">
                          <Text className="text-secondary text-center font-medium">
                            {searchQuery || filterStatus !== "all"
                              ? "Nenhum paciente encontrado"
                              : "Nenhum paciente cadastrado"}
                          </Text>
                          <Text className="text-secondary text-sm text-center opacity-75">
                            {searchQuery || filterStatus !== "all"
                              ? "Tente ajustar os filtros de busca"
                              : "Adicione seu primeiro paciente para começar"}
                          </Text>
                        </VStack>
                        {!searchQuery && filterStatus === "all" && (
                          <Button
                            onPress={handleAddPatient}
                            variant="solid"
                            size="md"
                            className="bg-primary-600 hover:bg-primary-700"
                          >
                            <ButtonIcon as={Plus} className="mr-2" />
                            <ButtonText>Adicionar Paciente</ButtonText>
                          </Button>
                        )}
                      </VStack>
                    </Box>
                  )}
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

export default PatientsListScreen;
