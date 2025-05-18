// src/app/_layout.tsx or your main web layout file (e.g., WebLayout.tsx)
import "../../global.css";
import { Stack } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeToggleButton from "@/components/common/ThemeToggleButton";
import { Box } from "@/components/ui/box";
import { useTheme } from "@/stores/useThemeStore";
import { useAuthStore } from "@/features/auth/store/authStore";
import React, { useEffect } from "react"; // Import useEffect
import { Spinner } from "@/components/ui/spinner"; // Assuming you have a spinner

export default function WebLayout() {
  const queryClient = new QueryClient();
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  const isAuthLoading = useAuthStore((state) => state.isLoading); // Get the global auth loading state

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // While initializing auth, you might want to show a global loader
  if (isAuthLoading) {
    return (
      <GluestackUIProvider>
        {/* Basic provider for the spinner */}
        <Box className="flex-1 justify-center align-center">
          <Spinner size="large" />
        </Box>
      </GluestackUIProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeWrapper />
    </QueryClientProvider>
  );
}

function ThemeWrapper() {
  const theme = useTheme();

  return (
    <GluestackUIProvider mode={theme}>
      <div
        className={`w-screen h-screen bg-background-50 text-white flex flex-col overflow-hidden`}
      >
        <ThemeToggleButton />
        <Box className="flex-1 overflow-auto p-4 ">
          <Stack screenOptions={{ headerShown: false }} />
        </Box>
      </div>
    </GluestackUIProvider>
  );
}
