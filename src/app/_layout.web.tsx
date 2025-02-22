import "global.css";
import { Stack } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import React from "react";

export default function WebLayout() {
  return (
    <GluestackUIProvider mode="dark">
      <div className="w-screen h-screen flex flex-col bg-neutral-900 text-white">
        <Stack screenOptions={{ headerShown: false }} />
      </div>
    </GluestackUIProvider>
  );
}
