import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { ArrowDown, Users, FileText, Key, Calendar } from "lucide-react-native";
import { useRouter } from "expo-router";
import UserQuickMenu from "../components/UserQuickMenu";
import SearchBar from "../components/SearchBar";
import { HStack } from "@/components/ui/hstack";
import CreateForm from "../components/CreateForm";
import { Divider } from "@/components/ui/divider";
import CreateAccess from "../components/CreateAccess";
import PatientFormCard from "../components/PatientFormCard";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";

const homepage = () => {
  const router = useRouter();

  const handleShowPatients = () => {
    // router.push("medical-form/Step1");
    //jogar para a tela com os pacientes que o médico tem acesso
    //cada paciente ao ser clicado aparece seu formulario, ao qual o medico pode alterar os dados
  };

  return (
    <SafeAreaView className="flex-1 bg-background-0">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <Box className=" px-6 pt-4 pb-8">
          <HStack className="items-center justify-between mb-6">
            <UserQuickMenu />
            <View className="items-end">
              <Text className="text-lg font-bold text-white">
                Dr. Albert Dev
              </Text>
              <Text className="text-primary-100 text-sm">albert@email.com</Text>
            </View>
          </HStack>

          {/* Welcome Card */}
          <Card className=" backdrop-blur-sm border-white/20 p-4 mb-4">
            <VStack space="sm">
              <Heading className="text-white text-xl font-semibold">
                Bem-vindo de volta! 👋
              </Heading>
              <Text className="text-primary-100 text-sm">
                Gerencie seus pacientes e formulários médicos
              </Text>
            </VStack>
          </Card>
        </Box>

        {/* Main Content */}
        <Box className="flex-1 px-6 -mt-6">
          <VStack space="lg" className="w-full">
            {/* Search Section */}
            <Card className="bg-white shadow-sm border border-outline-200 p-4">
              <SearchBar />
            </Card>

            {/* Quick Actions */}
            <VStack space="md">
              <Heading className="text-typography-900 text-lg font-semibold mb-2">
                Ações Rápidas
              </Heading>

              <HStack space="md" className="w-full">
                <Card className="flex-1 bg-white shadow-sm border border-outline-200">
                  <CreateForm />
                </Card>
                <Card className="flex-1 bg-white shadow-sm border border-outline-200">
                  <CreateAccess />
                </Card>
              </HStack>
            </VStack>

            {/* Statistics Cards */}
            <VStack space="md">
              <Heading className="text-typography-900 text-lg font-semibold mb-2">
                Resumo
              </Heading>

              <HStack space="md">
                <Card className="flex-1 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 p-4">
                  <VStack space="sm" className="items-center">
                    <Box className="bg-blue-500 p-3 rounded-full">
                      <Users className="text-white" size={24} />
                    </Box>
                    <Text className="text-blue-600 text-sm font-medium">
                      Pacientes
                    </Text>
                    <Text className="text-blue-900 text-2xl font-bold">24</Text>
                  </VStack>
                </Card>

                <Card className="flex-1 bg-gradient-to-br from-green-50 to-green-100 border border-green-200 p-4">
                  <VStack space="sm" className="items-center">
                    <Box className="bg-green-500 p-3 rounded-full">
                      <FileText className="text-white" size={24} />
                    </Box>
                    <Text className="text-green-600 text-sm font-medium">
                      Formulários
                    </Text>
                    <Text className="text-green-900 text-2xl font-bold">
                      12
                    </Text>
                  </VStack>
                </Card>
              </HStack>
            </VStack>

            {/* Patients Section */}
            <VStack space="md">
              <HStack className="items-center justify-between">
                <Heading className="text-typography-900 text-lg font-semibold">
                  Meus Pacientes
                </Heading>
                <Button
                  onPress={handleShowPatients}
                  variant="outline"
                  size="sm"
                  className="border-primary-300"
                >
                  <ButtonText className="text-primary-600">
                    Ver todos
                  </ButtonText>
                  <ButtonIcon
                    as={ArrowDown}
                    className="ml-1 text-primary-600"
                    size="sm"
                  />
                </Button>
              </HStack>

              <PatientFormCard />
            </VStack>

            {/* Bottom Spacing */}
            <Box className="h-6" />
          </VStack>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default homepage;
