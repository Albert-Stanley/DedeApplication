import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { Button, ButtonText, ButtonIcon } from "../../../components/ui/button";
import { LogOut, Edit, MoveLeft } from "lucide-react-native";
import { router } from "expo-router";
import GoBackArrow from "../../../components/common/goBackArrow";
import { VStack } from "../../../components/ui/vstack";
import { Divider } from "../../../components/ui/divider";

const Profile = () => {
  const goBack = () => {
    router.replace("/screens/doctor/DoctorHome");
  };

  const handleLogout = () => {
    router.replace("/");
  };

  return (
    <SafeAreaView className="flex-1 justify-center text-center items-center px-4 bg-background-50">
      <GoBackArrow destinationRoute="/screens/doctor/DoctorHome" />
      {/* Nome e email do Usuário */}
      <View className="items-start mb-6">
        <Text className="text-xl font-bold text-neutral-400">Albert Dev</Text>
        <Text className="text-neutral-500">albert@email.com</Text>
      </View>

      {/* Botão de Editar Perfil */}
      <Button
        className="rounded-lg w-full mb-6"
        variant="outline"
        action="primary"
        onPress={() => router.push("/edit-profile")}
      >
        <ButtonText>Editar Perfil</ButtonText>
        <ButtonIcon as={Edit} />
      </Button>

      {/* Botão de Voltar para Home */}

      <Divider className="mb-4" />

      <VStack space="md" className="w-full">
        <Button
          onPress={goBack}
          className="rounded-lg w-full"
          variant="outline"
          action="secondary" // Para consistência visual
        >
          <ButtonIcon as={MoveLeft} className="mr-2" />
          <ButtonText>Voltar para a Home</ButtonText>
        </Button>

        <Button
          onPress={handleLogout}
          className="rounded-lg w-full"
          variant="outline"
          action="negative"
        >
          <ButtonIcon as={LogOut} className="mr-2" />
          <ButtonText>Sair da Conta</ButtonText>
        </Button>
      </VStack>
    </SafeAreaView>
  );
};

export default Profile;
