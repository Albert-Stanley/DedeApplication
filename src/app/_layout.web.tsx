import "global.css";
import { Stack } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import React, { createContext } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../context/AuthContext";

export default function WebLayout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GluestackUIProvider mode="dark">
          <div className="w-screen h-screen flex flex-col bg-neutral-900 text-white">
            <Stack screenOptions={{ headerShown: false }} />
          </div>
        </GluestackUIProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
