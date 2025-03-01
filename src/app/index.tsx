import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native";
import React from "react";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { LogInIcon } from "lucide-react-native";
import Animated, {
  Easing,
  withSpring,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Text } from "@/components/ui/text";

const App = () => {
  const router = useRouter();

  // Valor compartilhado para animar a escala do botão
  const scale = useSharedValue(1);

  // Estilo animado do botão
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: withSpring(scale.value, { damping: 5, stiffness: 100 }) },
      ],
    };
  });

  // Função de manipulação do clique
  const handleGoToLogin = () => {
    scale.value = 0.9; // Encolhe o botão ao ser pressionado
    setTimeout(() => {
      scale.value = 1; // Restaura o tamanho após 200ms
      router.push("/screens/auth/login");
    }, 200);
  };

  const handleGoToRegister = () => {
    scale.value = 0.9; // Encolhe o botão ao ser pressionado
    setTimeout(() => {
      scale.value = 1; // Restaura o tamanho após 200ms
      router.push("/screens/auth/signup");
    }, 200);
  };

  return (
    <SafeAreaView className="flex-1 bg-background-50">
      <Box className="flex-1 justify-center items-center px-4">
        <VStack space="lg" className="w-full max-w-lg p-6">
          <Text className="text-center text-2xl font-bold">Bem Vindo(a)</Text>

          {/* Direciona Para a Página de Login */}
          <Animated.View style={animatedStyle}>
            <Button onPress={handleGoToLogin} variant="solid" className="mt-2">
              <ButtonText>Fazer Login Como Médico</ButtonText>
              <ButtonIcon as={LogInIcon} className="ml-2" />
            </Button>
          </Animated.View>

          {/* Direciona Para a Página de Cadastro de Médicos */}
          <Animated.View style={animatedStyle}>
            <Button
              onPress={handleGoToRegister}
              variant="solid"
              className="mt-2"
            >
              <ButtonText>Fazer Cadastro Como Médico</ButtonText>
              <ButtonIcon as={LogInIcon} className="ml-2" />
            </Button>
          </Animated.View>

          {/* Direciona Para a Página de Entrar como enfermeiro(a) ou secretario(a)  */}
          <Animated.View style={animatedStyle}>
            <Button onPress={handleGoToLogin} variant="solid" className="mt-2">
              <ButtonText>Fazer Login Como Médico</ButtonText>
              <ButtonIcon as={LogInIcon} className="ml-2" />
            </Button>
          </Animated.View>
        </VStack>
      </Box>
    </SafeAreaView>
  );
};

export default App;
