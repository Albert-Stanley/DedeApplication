import React from "react";
import { View } from "react-native";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import UserQuickMenu from "./UserQuickMenu";
import { useAuthStore } from "@/features/auth/store/authStore";

const DashboardHeader: React.FC = () => {
  const { user } = useAuthStore();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  };

  const formatName = (fullName: string) => {
    const names = fullName.split(" ");
    if (names.length > 1) {
      return `Dr. ${names[0]} ${names[names.length - 1]}`;
    }
    return `Dr. ${names[0]}`;
  };

  return (
    <Box className="px-4 pt-4 pb-6 bg-gradient-to-br ">
      <HStack className="items-center justify-between mb-4">
        <UserQuickMenu />
        <View className="mr-10 items-end">
          <Text className="text-lg font-bold">
            {user?.name ? formatName(user.name) : "Dr. Usuário"}
          </Text>
          <Text className="text-primary-300 text-sm">
            ID: {user?.CRMorEmail || "N/A"}
          </Text>
        </View>
      </HStack>

      {/* Welcome Card */}
      {/* <Card className="bg-white/10 dark:bg-gray-800backdrop-blur-sm border-white/20 rounded-xl shadow-lg"> */}
      <Card className="bg-white/10 dark:bg-gray-800  border-white/20 rounded-xl shadow-lg">
        <Box className="p-4">
          <VStack space="sm">
            <Heading className=" text-xl font-semibold">
              {getGreeting()}, seja bem-vindo de volta!
            </Heading>
            <Text className="text-primary-300 text-sm">
              Gerencie seus pacientes e formulários médicos de forma eficiente
            </Text>
          </VStack>
        </Box>
      </Card>
    </Box>
  );
};

export default DashboardHeader;
