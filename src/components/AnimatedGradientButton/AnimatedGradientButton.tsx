import React, { useCallback } from "react";
import { TouchableOpacity, ActivityIndicator, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  withSpring,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { ButtonIcon } from "../ui/button"; // Ajuste para o seu componente de ícone
import { Text } from "../ui/text"; // Ajuste para o seu componente de texto

interface AnimatedGradientButtonProps {
  text: string;
  onPress: () => void;
  isLoading: boolean;
  icon?: any;
}

const AnimatedGradientButton = ({
  text,
  onPress,
  isLoading,
  icon,
}: AnimatedGradientButtonProps) => {
  const scale = useSharedValue(1); // Valor para controlar a animação de escala

  // Animação para o botão
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: withSpring(scale.value, { damping: 5, stiffness: 100 }) },
    ],
  }));

  // Detectar pressionamento do botão
  const handlePressIn = useCallback(() => {
    scale.value = 0.95; // Reduz a escala do botão quando pressionado
  }, []);

  const handlePressOut = useCallback(() => {
    scale.value = 1; // Restaura a escala quando o toque é liberado
  }, []);

  return (
    <Animated.View
      style={[animatedStyle, { borderRadius: 12, overflow: "hidden" }]}
    >
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        style={{ paddingVertical: 12, paddingHorizontal: 24 }}
      >
        <LinearGradient
          colors={["#4A5568", "#2D3748"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            borderRadius: 12,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 12,
            paddingHorizontal: 24,
          }}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <Text className="text-white text-lg font-semibold">{text}</Text>
              {icon && <ButtonIcon as={icon} className="ml-3 text-white" />}
            </>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default AnimatedGradientButton;
