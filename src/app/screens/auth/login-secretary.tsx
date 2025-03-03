import { View, SafeAreaView } from "react-native";
import React from "react";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";

const loginSecretary = () => {
  return (
    <SafeAreaView className="flex-1 bg-background-50">
      <Box className="flex-1 justify-center items-center px-4">
        <VStack space="lg" className="w-full max-w-lg p-6">
          <Text className="text-center mt-6 text-3xl  font-bold">
            EM BREVE...
          </Text>
        </VStack>
      </Box>
    </SafeAreaView>
  );
};

export default loginSecretary;
