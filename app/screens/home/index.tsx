import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { Button, ButtonGroup } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { UserRoundPen } from "lucide-react-native";
import { useRouter } from "expo-router";

const homepage = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/screens/user/profile");
  };
  return (
    <SafeAreaView className="flex-1 bg-background-50">
      <Box className="flex-1 justify-center items-center px-4">
        <VStack space="lg" className="w-full max-w-lg p-6">
          <ButtonGroup className="grid justify-items-end ">
            <Button
              onPress={handleLogin}
              action="secondary"
              className="bg-trasparent "
            >
              <Icon as={UserRoundPen} />
            </Button>
          </ButtonGroup>
          <Text className="text-center text-2xl font-bold">Bem-vindo!</Text>
          <Text className="text-center text-lg">
            Você está na homepage do app.
          </Text>
        </VStack>
      </Box>
    </SafeAreaView>
  );
};

export default homepage;
