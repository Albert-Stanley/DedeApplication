import { useRouter } from "expo-router";
import { SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { LogInIcon, UserPlusIcon, Headset, Route } from "lucide-react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { Text } from "@/components/ui/text";
import { useMutation } from "@tanstack/react-query";

import AnimatedButton from "@/components/common/AnimetedButton";

const App = () => {
  const router = useRouter();

  // Mutations para gerenciar o carregamento
  const loginMutation = useMutation({
    mutationFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/Login");
    },
  });

  const registerMutation = useMutation({
    mutationFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/Signup");
    },
  });

  const nurseMutation = useMutation({
    mutationFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/doctor");
    },
  });

  // const siteMapMutation = useMutation({
  //   mutationFn: async () => {
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //     router.push("/");
  //   },
  // });

  return (
    <SafeAreaView className="flex-1 bg-background-50">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Box className="flex-1 justify-center items-center px-6 space-y-8">
          <Animated.View
            entering={FadeIn.duration(700).springify()}
            className="w-full max-w-lg"
          >
            <Text className="text-center mt-12 text-3xl font-bold">
              Bem-vindo(a) ao App Médico
            </Text>
            <Text className="text-center mt-4 text-lg">
              Escolha uma opção para acessar sua conta
            </Text>
          </Animated.View>

          <VStack space="xl" className="w-full max-w-lg p-6 mt-8">
            <AnimatedButton
              text="Entrar como Médico"
              onPress={() => loginMutation.mutate()}
              isLoading={loginMutation.isPending}
              darkColor="#4A5568"
              icon={LogInIcon}
            />
            <AnimatedButton
              text="Cadastrar-se Médico"
              onPress={() => registerMutation.mutate()}
              isLoading={registerMutation.isPending}
              darkColor="#4A5568"
              icon={UserPlusIcon}
            />
            <AnimatedButton
              text="Entrar como Secretário(a)"
              onPress={() => nurseMutation.mutate()}
              isLoading={nurseMutation.isPending}
              darkColor="#4A5568"
              icon={Headset}
            />
            {/* <AnimatedButton
              text="Rotas da Aplicação"
              onPress={() => siteMapMutation.mutate()}
              isLoading={siteMapMutation.isPending}
              darkColor="#4A5568"
              icon={Route}
            /> */}
          </VStack>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
