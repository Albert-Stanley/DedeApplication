import React, { useCallback, useRef } from "react";
import { TouchableOpacity, View, Animated, Platform } from "react-native";
import { useTheme, useToggleTheme } from "../../stores/useThemeStore";
import { Ionicons } from "@expo/vector-icons";

export default function ThemeToggleButton() {
  const theme = useTheme();
  const toggleTheme = useToggleTheme();
  const scale = useRef(new Animated.Value(1)).current;

  console.log("Renderizou");

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
        top: 10,
        right: 10,
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
            ...(Platform.OS === "web"
              ? { boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)" }
              : {
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.3,
                  shadowRadius: 4,
                  elevation: 5,
                }),
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
