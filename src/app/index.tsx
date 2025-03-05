import { useRouter } from "expo-router";
import { SafeAreaView, ActivityIndicator, ScrollView } from "react-native";
import React, { useCallback } from "react";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonIcon } from "@/components/ui/button";
import { LogInIcon, UserPlusIcon, StethoscopeIcon } from "lucide-react-native";
import Animated, {
  withSpring,
  useSharedValue,
  useAnimatedStyle,
  FadeIn,
} from "react-native-reanimated";
import { Text } from "@/components/ui/text";
import { useMutation } from "@tanstack/react-query";

// Definição do componente AnimatedButton com suporte para hover
interface AnimatedButtonProps {
  text: string;
  onPress: () => void;
  isLoading: boolean;
  darkColor: string;
  icon: any;
}

const AnimatedButton = ({
  text,
  onPress,
  isLoading,
  darkColor,
  icon,
}: AnimatedButtonProps) => {
  const scale = useSharedValue(1); // Valor compartilhado para escalar o botão
  const spinnerColor = "white"; // Cor do spinner

  // Estilos animados para aumentar o botão no hover ou pressionamento
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: withSpring(scale.value, { damping: 5, stiffness: 100 }) },
    ],
  }));

  // Detectar pressionamento do botão (para simular hover em dispositivos móveis)
  const handlePressIn = useCallback(() => {
    scale.value = 0.9; // Diminui a escala quando o botão é pressionado
  }, []);

  const handlePressOut = useCallback(() => {
    scale.value = 1; // Restaura a escala quando o toque é liberado
  }, []);

  return (
    <Animated.View
      style={animatedStyle}
      entering={FadeIn.duration(500).springify()}
    >
      <Button
        size="xl"
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        variant="outline"
        className="hover:scale-105 transition-transform duration-200 py-3 px-5 rounded-xl flex-row items-center"
      >
        {isLoading ? (
          <ActivityIndicator color={spinnerColor} />
        ) : (
          <>
            <Text className="text-lg leading-tight  font-semibold text-center">
              {text}
            </Text>
            <ButtonIcon as={icon} className="ml-3" />
          </>
        )}
      </Button>
    </Animated.View>
  );
};

const App = () => {
  const router = useRouter();

  // Mutations para gerenciar o carregamento
  const loginMutation = useMutation({
    mutationFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/screens/auth/Login");
    },
  });

  const registerMutation = useMutation({
    mutationFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/screens/auth/Signup");
    },
  });

  const nurseMutation = useMutation({
    mutationFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/screens/auth/LoginSecretary");
    },
  });

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
              text="Entrar como Enfermeiro(a)"
              onPress={() => nurseMutation.mutate()}
              isLoading={nurseMutation.isPending}
              darkColor="#4A5568"
              icon={StethoscopeIcon}
            />
          </VStack>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
