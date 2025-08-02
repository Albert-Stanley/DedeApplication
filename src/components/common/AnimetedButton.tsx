import React, { useCallback } from "react";
import Animated, {
  withSpring,
  useSharedValue,
  useAnimatedStyle,
  FadeIn,
} from "react-native-reanimated";
import { Button, ButtonIcon, ButtonText } from "../ui/button";
import { Text } from "../ui/text";
import { Spinner } from "../ui/spinner";
import { useTheme } from "../../stores/useThemeStore";

interface AnimatedButtonProps {
  text: string;
  onPress: () => void;
  isLoading: boolean;
  icon: any;
}

const AnimatedButton = ({
  text,
  onPress,
  isLoading,
  icon,
}: AnimatedButtonProps) => {
  const theme = useTheme();
  const spinnerColor = theme === "dark" ? "#fff" : "#000";

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: withSpring(scale.value, { damping: 5, stiffness: 100 }) },
    ],
  }));

  const handlePressIn = useCallback(() => {
    scale.value = 0.9;
  }, []);

  const handlePressOut = useCallback(() => {
    scale.value = 1;
  }, []);

  return (
    <Animated.View
      style={animatedStyle}
      entering={FadeIn.duration(500).springify()}
    >
      <Button
        accessibilityLabel={`Botão para ${text}`}
        accessibilityRole="button"
        aria-busy={isLoading}
        size="xl"
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        variant="solid"
        action="primary"
        className="hover:scale-105 transition-transform duration-200 py-3 px-5 rounded-xl flex-row items-center"
      >
        {isLoading ? (
          <Spinner color={spinnerColor} />
        ) : (
          <>
            <ButtonText className="text-lg leading-tight font-bold text-center">
              {text}
            </ButtonText>
            <ButtonIcon as={icon} className="ml-3" />
          </>
        )}
      </Button>
    </Animated.View>
  );
};

export default AnimatedButton;
