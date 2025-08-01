import React from "react";
import { Pressable } from "@/components/ui/pressable";
import { VStack } from "@/components/ui/vstack";
import { router } from "expo-router";
import { Icon } from "@/components/ui/icon";
import { ChevronLeft } from "lucide-react-native";

interface GoBackArrowProps {
  destinationRoute?: string;
}

const GoBackArrow = ({ destinationRoute }: GoBackArrowProps) => {
  const handleBack = () => {
    if (destinationRoute) {
      router.push(destinationRoute);
    } else {
      router.back();
    }
  };
  return (
    <VStack className="absolute ml-3 -top-4 -left-6 right-0 px-4 pt-8 z-10">
      <Pressable
        onPress={handleBack}
        accessibilityRole="button"
        className="w-16 h-16 p-3 items-center justify-center rounded-full bg-transparent hover:bg-background-300 active:bg-background-400 z-30"
      >
        <Icon as={ChevronLeft} className="stroke-background-800" size="xl" />
      </Pressable>
    </VStack>
  );
};

export default GoBackArrow;
