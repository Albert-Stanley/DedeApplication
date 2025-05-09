import React from "react";
import { Pressable } from "@/components/ui/pressable";
import { VStack } from "@/components/ui/vstack";
import { useRouter } from "expo-router";
import { Icon } from "@/components/ui/icon";
import { ChevronLeft } from "lucide-react-native";

const GoBackArrow = () => {
  const router = useRouter();

  const handleBack = () => {
    // Verifica se há uma navegação anterior para voltar
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <VStack className="absolute -top-4 -left-4 right-0 px-4 pt-8 z-10">
      <Pressable
        onPress={handleBack}
        accessibilityRole="button"
        className="w-16 h-16 p-3 items-center justify-center rounded-full bg-transparent hover:bg-background-300 active:bg-background-400"
      >
        <Icon as={ChevronLeft} className="stroke-background-800" size="xl" />
      </Pressable>
    </VStack>
  );
};

export default GoBackArrow;
