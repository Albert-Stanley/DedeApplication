import { SafeAreaView } from "react-native";
import React from "react";
import GoBackArrow from "@/components/common/goBackArrow";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";

const SecretaryDashboard = () => {
  return (
    <SafeAreaView className="flex-1 bg-background-50">
      <GoBackArrow destinationRoute={""} />
      <VStack className="flex-1 items-center justify-center px-4">
        <Text size="4xl">Secretary Dashboard</Text>
      </VStack>
    </SafeAreaView>
  );
};

export default SecretaryDashboard;
