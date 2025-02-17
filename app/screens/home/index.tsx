import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import {
  Button,
  ButtonGroup,
  ButtonIcon,
  ButtonText,
} from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { ArrowDown, Scroll, UserRoundPen } from "lucide-react-native";
import { useRouter } from "expo-router";

const homepage = () => {
  const router = useRouter();

  const goProfile = () => {
    router.push("/screens/user/profile");
  };

  const handleShowPatients = () => {
    router.push("/screens/patients/form");
  };

  return (
    <SafeAreaView className="flex-1 bg-background-50">
      <ScrollView>
        <Box className="flex-1 justify-center items-center px-4">
          <VStack space="lg" className="w-full max-w-lg p-6">
            <ButtonGroup className="grid justify-items-end ">
              <Button
                onPress={goProfile}
                action="secondary"
                className="bg-trasparent "
              >
                <Icon as={UserRoundPen} />
              </Button>
            </ButtonGroup>
            {/* Nome e email do Usuário */}
            <View className="items-center mb-6">
              <Text className="text-xl font-bold text-neutral-100">
                Albert Dev
              </Text>
              <Text className="text-neutral-500">albert@email.com</Text>
            </View>
            <Button
              onPress={handleShowPatients}
              variant="solid"
              className="mt-2"
            >
              <ButtonText>Listar pacientes:</ButtonText>
              <ButtonIcon as={ArrowDown} className="ml-2" />
            </Button>
          </VStack>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default homepage;
