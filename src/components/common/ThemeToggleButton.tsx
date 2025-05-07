import React, { useCallback, useRef } from "react";
import { TouchableOpacity, View, Animated } from "react-native";
import { useTheme, useToggleTheme } from "../../stores/useThemeStore";
import { Ionicons } from "@expo/vector-icons";

export default function ThemeToggleButton() {
  const theme = useTheme();
  const toggleTheme = useToggleTheme();
  const scale = useRef(new Animated.Value(1)).current;

  // console.log("Renderizou");

  // Animação suave ao pressionar o botão
  const handlePress = useCallback(() => {
    Animated.sequence([
      Animated.spring(scale, {
        toValue: 1.2,
        friction: 4,
        tension: 40,
        useNativeDriver: false,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: false,
      }),
    ]).start();

    toggleTheme();
  }, [scale, toggleTheme]);

  return (
    <Animated.View
      style={{
        position: "absolute",
        top: 20,
        right: 20,
        zIndex: 9999,
        transform: [{ scale }],
        marginTop: 10,
      }}
    >
      <TouchableOpacity onPress={handlePress}>
        <View
          style={{
            backgroundColor: theme === "dark" ? "#333" : "#fff",
            borderRadius: 50,
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Ionicons
            name={theme === "dark" ? "moon-outline" : "sunny"}
            size={24}
            color={theme === "dark" ? "#d0e0e3" : "	#333333"}
          />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}
