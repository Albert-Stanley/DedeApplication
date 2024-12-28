import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Input, InputIcon, InputSlot, InputField } from "@/components/ui/input";

const HomePage = () => {
  return (
    <SafeAreaView className="flex-1 bg-background-50">
      <Box className="flex-1 justify-center items-center px-4">
        <Text size="2xl" className="text-center font-bold text-typography-900">
          Formulário de Atendimento Médico
        </Text>
      </Box>
    </SafeAreaView>
  );
};

export default HomePage;
