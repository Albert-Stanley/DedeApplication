import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native";
import React from "react";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { LogInIcon } from "lucide-react-native";
import Animated, {
  withSpring,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Text } from "@/components/ui/text";

const App = () => {
  const router = useRouter();

  // Valor compartilhado para animar a escala do botão
  const scaleLogin = useSharedValue(1);
  const scaleRegister = useSharedValue(1);
  const scaleNurse = useSharedValue(1);

  // Estilo animado de cada botão
  const animatedStyleLogin = useAnimatedStyle(() => ({
    transform: [
      { scale: withSpring(scaleLogin.value, { damping: 5, stiffness: 100 }) },
    ],
  }));

  const animatedStyleRegister = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withSpring(scaleRegister.value, { damping: 5, stiffness: 100 }),
      },
    ],
  }));

  const animatedStyleNurse = useAnimatedStyle(() => ({
    transform: [
      { scale: withSpring(scaleNurse.value, { damping: 5, stiffness: 100 }) },
    ],
  }));

  // Função de manipulação do clique para Login
  const handleGoToLogin = () => {
    scaleLogin.value = 0.9; // Encolhe o botão ao ser pressionado
    setTimeout(() => {
      scaleLogin.value = 1; // Restaura o tamanho após 200ms
      router.push("/screens/auth/login");
    }, 200);
  };

  // Função de manipulação do clique para Registro
  const handleGoToRegister = () => {
    scaleRegister.value = 0.9; // Encolhe o botão ao ser pressionado
    setTimeout(() => {
      scaleRegister.value = 1; // Restaura o tamanho após 200ms
      router.push("/screens/auth/signup");
    }, 200);
  };

  // Função de manipulação do clique para Enfermeiro(a)
  const handleGoToNurse = () => {
    scaleNurse.value = 0.9; // Encolhe o botão ao ser pressionado
    setTimeout(() => {
      scaleNurse.value = 1; // Restaura o tamanho após 200ms
      router.push("/screens/auth/login-secretary");
    }, 200);
  };

  return (
    <SafeAreaView className="flex-1 bg-background-50">
      <Text className="text-center mt-6 text-3xl font-bold">Bem Vindo(a)</Text>
      <Box className="flex-1 justify-center items-center px-4">
        <VStack space="lg" className="w-full max-w-lg p-6">
          {/* Direciona Para a Página de Login */}
          <Animated.View style={animatedStyleLogin}>
            <Button
              size="xl"
              onPress={handleGoToLogin}
              variant="solid"
              className="mt-2 rounded-xl"
            >
              <ButtonText>Fazer Login Como Médico</ButtonText>
              <ButtonIcon as={LogInIcon} className="ml-2" />
            </Button>
          </Animated.View>

          {/* Direciona Para a Página de Cadastro de Médicos */}
          <Animated.View style={animatedStyleRegister}>
            <Button
              size="xl"
              onPress={handleGoToRegister}
              variant="solid"
              className="mt-2 rounded-xl"
            >
              <ButtonText>Fazer Cadastro Como Médico</ButtonText>
              <ButtonIcon as={LogInIcon} className="ml-2" />
            </Button>
          </Animated.View>

          {/* Direciona Para a Página de Entrar como enfermeiro(a) ou secretario(a)  */}
          <Animated.View style={animatedStyleNurse}>
            <Button
              size="xl"
              onPress={handleGoToNurse}
              variant="solid"
              className="mt-2 rounded-xl"
            >
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
