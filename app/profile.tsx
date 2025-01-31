import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { LogOut } from "lucide-react-native";
import { router } from "expo-router";
import { Pressable } from "@/components/ui/pressable";
import { Icon, PhoneIcon } from "@/components/ui/icon";
import { Box } from "@/components/ui/box";

const profile = () => {
  const handleLogout = () => {
    router.push("/index");
  };
  return (
    <SafeAreaView className="flex-1 bg-background-50">
      <Box className="flex-1 justify-center items-center px-4">
        <Pressable className="mb-8 gap-3 flex-row items-center hover:bg-background-100 p-2 rounded-md">
          <Icon as={PhoneIcon} size="lg" className="text-typography-600" />
          <Text className="font-bold text-lg text-neutral-100">
            Entre em contato conosco
          </Text>
        </Pressable>
        <View>
          <Button
            onPress={handleLogout}
            className="w-full gap-2"
            variant="solid"
            action="secondary"
          >
            <ButtonText>Sair</ButtonText>
            <ButtonIcon as={LogOut} />
          </Button>
        </View>
      </Box>
    </SafeAreaView>
  );
};

export default profile;
