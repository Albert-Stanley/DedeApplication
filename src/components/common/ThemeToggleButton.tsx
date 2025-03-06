import React from "react";
import { TouchableOpacity, View, Animated } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  const [isToggled, setIsToggled] = React.useState(theme === "dark");
  const scale = new Animated.Value(1);

  // Animação suave ao pressionar o botão
  const handlePress = () => {
    Animated.sequence([
      Animated.spring(scale, {
        toValue: 1.2,
        friction: 4,
        tension: 40,
        useNativeDriver: false, // Removido o `useNativeDriver` para evitar o erro
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: false, // Removido o `useNativeDriver`
      }),
    ]).start();

    toggleTheme();
    setIsToggled(!isToggled); // Alterna o estado do tema
  };

  return (
    <Animated.View
      style={{
        position: "absolute",
        top: 20, // Ajuste da distância do topo
        right: 20, // Ajuste da distância da direita
        zIndex: 9999, // Garantir que o botão fique no topo de outros elementos
        transform: [{ scale }],
        marginTop: 10, // Adicionando margem superior
      }}
    >
      <TouchableOpacity onPress={handlePress}>
        <View
          style={{
            backgroundColor: theme === "dark" ? "#333" : "#fff", // Cor do botão conforme o tema
            borderRadius: 50,
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)", // Usando `boxShadow` para sombra
          }}
        >
          <Ionicons
            name={isToggled ? "moon" : "sunny"}
            size={24}
            color={isToggled ? "#fff" : "#333"}
          />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}
