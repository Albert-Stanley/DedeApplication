import React from "react";
import { Pressable } from "../ui/pressable";
import { VStack } from "../ui/vstack";
import { useRouter, usePathname } from "expo-router";
import { Icon } from "../ui/icon";
import { ArrowLeftIcon } from "lucide-react-native";

const GoBackArrow = () => {
  const router = useRouter();
  const pathname = usePathname(); // Obtém o caminho atual da rota

  const handleBack = () => {
    // Tenta voltar para a página anterior
    router.back();

    // Se não funcionar, redireciona para a página inicial
    setTimeout(() => {
      // Verifica se o caminho atual é a página inicial
      if (pathname === "/") {
        router.push("/"); // Redireciona para a página inicial
      }
    }, 500); // Um pequeno delay para garantir que a navegação foi tentada
  };

  return (
    <VStack className="absolute top-0 -left-2 right-0 px-4 pt-12 z-10">
      <Pressable
        onPress={handleBack}
        accessibilityRole="button"
        className="w-12 h-12 p-2 items-center justify-center rounded-full bg-background-200 hover:bg-background-300 active:bg-background-400"
      >
        <Icon as={ArrowLeftIcon} className="stroke-background-800" size="lg" />
      </Pressable>
    </VStack>
  );
};

export default GoBackArrow;
