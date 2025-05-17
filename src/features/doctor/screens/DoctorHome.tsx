import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { VStack } from "../../../components/ui/vstack";
import { Box } from "../../../components/ui/box";
import { Button, ButtonIcon, ButtonText } from "../../../components/ui/button";
import { ArrowDown } from "lucide-react-native";
import { useRouter } from "expo-router";
import UserQuickMenu from "../components/UserQuickMenu";
import SearchBar from "../components/SearchBar";
import { HStack } from "../../../components/ui/hstack";
import CreateForm from "../components/CreateForm";
import { Divider } from "../../../components/ui/divider";
import CreateAccess from "../components/CreateAccess";

const homepage = () => {
  const router = useRouter();

  const handleShowPatients = () => {
    // router.push("/screens/patients/form");
    //jogar para a tela com os pacientes que o médico tem acesso
    //cada paciente ao ser clicado aparece seu formulario, ao qual o medico pode alterar os dados
  };

  return (
    <SafeAreaView className="flex-1 bg-background-50">
      <ScrollView>
        <Box className="flex-1 justify-center items-center px-4">
          <VStack space="lg" className="w-full max-w-lg p-6">
            {/* Nome e email do Usuário */}
            <HStack className="items-center mb-2">
              <UserQuickMenu />
              {/* Nome e email do médico alinhados à direita */}
              <View className="justify-center ml-16">
                <Text className="text-xl font-bold text-neutral-400">
                  Albert Dev
                </Text>
                <Text className="text-neutral-500">albert@email.com</Text>
              </View>
            </HStack>
            <HStack className="items-center  mb-2">
              <CreateForm />
              <CreateAccess />
            </HStack>
            <SearchBar />
            <Divider className="mb-4" />
            <Button
              onPress={handleShowPatients}
              variant="solid"
              className="mt-2"
            >
              <ButtonText>Listar meus pacientes:</ButtonText>
              <ButtonIcon as={ArrowDown} className="ml-2" />
            </Button>
          </VStack>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default homepage;
