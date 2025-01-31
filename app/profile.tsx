import { View, Text, SafeAreaView, Image } from "react-native";
import React from "react";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { LogOut, MoveLeft, Edit } from "lucide-react-native";
import { router } from "expo-router";
import { Box } from "@/components/ui/box";

const Profile = () => {
  const goBack = () => {
    router.replace("/homepage");
  };

  const handleLogout = () => {
    router.replace("/");
  };

  return (
    <SafeAreaView className="flex-1 bg-background-50">
      <Box className="flex-1 justify-center items-center px-4">
        {/* Nome e email do Usuário */}
        <View className="items-center mb-6">
          <Text className="text-xl font-bold text-neutral-100">Albert Dev</Text>
          <Text className="text-neutral-500">albert@email.com</Text>
        </View>

        {/* Botão de Editar Perfil */}
        <View>
          <Button
            className="w-full mb-6 gap-2"
            variant="solid"
            action="primary"
            onPress={() => router.push("/edit-profile")}
          >
            <ButtonText>Editar Perfil</ButtonText>
            <ButtonIcon as={Edit} />
          </Button>
        </View>

        {/* Botão de Voltar para Home */}
        <View>
          <Button
            onPress={goBack}
            className="w-full mb-4 gap-2"
            variant="outline"
          >
            <ButtonIcon as={MoveLeft} />
            <ButtonText>Voltar para a Home</ButtonText>
          </Button>
        </View>

        {/* Botão de Sair */}
        <View>
          <Button
            onPress={handleLogout}
            className="w-full gap-2"
            variant="solid"
          >
            <ButtonText>Sair da Conta</ButtonText>
            <ButtonIcon as={LogOut} />
          </Button>
        </View>
      </Box>
    </SafeAreaView>
  );
};

export default Profile;
