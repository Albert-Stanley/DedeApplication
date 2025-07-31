import React, { useCallback, useRef } from "react";
import { TouchableOpacity, View, Animated, Platform } from "react-native";
import { useTheme, useToggleTheme } from "../../stores/useThemeStore";
import { Ionicons } from "@expo/vector-icons";

interface ThemeToggleButtonProps {
  position?: "absolute" | "relative";
  size?: "sm" | "md" | "lg";
}

export default function ThemeToggleButton({
  position = "absolute",
  size = "md",
}: ThemeToggleButtonProps) {
  const theme = useTheme();
  const toggleTheme = useToggleTheme();
  const scale = useRef(new Animated.Value(1)).current;

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return { padding: 8, iconSize: 18 };
      case "lg":
        return { padding: 12, iconSize: 28 };
      default:
        return { padding: 10, iconSize: 24 };
    }
  };

  const { padding, iconSize } = getSizeStyles();

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

  const containerStyle =
    position === "absolute"
      ? {
          position: "absolute" as const,
          top: 10,
          right: 10,
          zIndex: 9999,
          transform: [{ scale }],
          marginTop: 10,
        }
      : {
          transform: [{ scale }],
        };

  return (
    <Animated.View style={containerStyle}>
      <TouchableOpacity onPress={handlePress}>
        <View
          style={{
            backgroundColor: theme === "dark" ? "#333" : "#fff",
            borderRadius: 50,
            padding,
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
            size={iconSize}
            color={theme === "dark" ? "#d0e0e3" : "	#333333"}
          />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}
