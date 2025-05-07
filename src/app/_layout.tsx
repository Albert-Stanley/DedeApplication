import "global.css";
import { Stack } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../context/AuthContext";
import ThemeToggleButton from "@/components/common/ThemeToggleButton";
import { Box } from "@/components/ui/box";
import { useTheme } from "@/stores/useThemeStore";
import { StatusBar } from "react-native";

export default function Layout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeWrapper />
      </AuthProvider>
    </QueryClientProvider>
  );
}

function ThemeWrapper() {
  const theme = useTheme();

  return (
    <GluestackUIProvider mode={theme}>
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
      <Box className="w-screen h-screen bg-background-50 text-white flex flex-col overflow-hidden">
        <Box className="flex-1 overflow-auto p-4">
          <Stack screenOptions={{ headerShown: false }} />
        </Box>
        <Box className="absolute top-4 right-4 z-10">
          <ThemeToggleButton />
        </Box>
      </Box>
    </GluestackUIProvider>
  );
}
