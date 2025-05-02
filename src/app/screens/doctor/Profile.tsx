import { View, Text, SafeAreaView, Image } from "react-native";
import React from "react";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { LogOut, MoveLeft, Edit } from "lucide-react-native";
import { router } from "expo-router";
import GoBackArrow from "@/components/common/goBackArrow";

const Profile = () => {
  const goBack = () => {
    router.replace("/screens/home");
  };

  const handleLogout = () => {
    router.replace("/");
  };

  return (
    <SafeAreaView className="flex-1 justify-center text-center items-center px-4 bg-background-50">
      <GoBackArrow />
      {/* Nome e email do Usuário */}
      <View className="items-center mb-6">
        <Text className="text-xl font-bold text-neutral-100">Albert Dev</Text>
        <Text className="text-neutral-500">albert@email.com</Text>
      </View>

      {/* Botão de Editar Perfil */}
      <Button
        className="rounded-lg mb-6"
        variant="solid"
        action="primary"
        onPress={() => router.push("/edit-profile")}
      >
        <ButtonText>Editar Perfil</ButtonText>
        <ButtonIcon as={Edit} />
      </Button>

      {/* Botão de Voltar para Home */}
      <Button onPress={goBack} className="rounded-lg mb-6" variant="outline">
        <ButtonIcon as={MoveLeft} />
        <ButtonText>Voltar para a Home</ButtonText>
      </Button>

      {/* Botão de Sair */}

      <Button
        onPress={handleLogout}
        className="rounded-lg mb-6"
        variant="solid"
      >
        <ButtonText>Sair da Conta</ButtonText>
        <ButtonIcon as={LogOut} />
      </Button>
    </SafeAreaView>
  );
};

export default Profile;
