import React from "react";
import { Pressable } from "../ui/pressable";
import { VStack } from "../ui/vstack";
import { useRouter } from "expo-router";
import { Icon } from "../ui/icon";
import { ArrowLeftIcon } from "lucide-react-native";

const GoBackArrow = () => {
  const router = useRouter();

  const handleBack = () => {
    try {
      router.back();
    } catch (error) {
      // Se não houver histórico de navegação, redireciona para a Home
      router.push("/");
    }
  };

  return (
    <VStack className="absolute top-0 left-0 right-0 px-4 pt-12 z-10">
      <Pressable
        onPress={handleBack}
        accessibilityRole="button"
        className="w-12 h-12 p-2 items-center justify-center rounded-full bg-background-200 hover:bg-background-300 active:bg-background-400"
      >
        <Icon
          as={ArrowLeftIcon}
          className="stroke-background-800"
          size={"lg"}
        />
      </Pressable>
    </VStack>
  );
};

export default GoBackArrow;
