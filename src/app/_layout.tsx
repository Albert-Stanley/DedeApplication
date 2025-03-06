import "global.css";
import { Stack } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../context/AuthContext";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import ThemeToggleButton from "@/components/common/ThemeToggleButton";
import { Box } from "@/components/ui/box";

export default function Layout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <ThemeWrapper />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

function ThemeWrapper() {
  const { theme } = useTheme();

  return (
    <GluestackUIProvider mode={theme}>
      {/* Garantindo que o fundo e o layout ocupem toda a tela */}
      <Box className="w-screen h-screen bg-background-50 text-white flex flex-col overflow-hidden">
        {/* O conteúdo principal */}
        <Box className="flex-1 overflow-auto p-4">
          {/* O conteúdo da tela será mostrado aqui */}
          <Stack screenOptions={{ headerShown: false }} />
        </Box>
        {/* O botão de alternância de tema será visível no final da tela */}
        <Box className="absolute top-4 right-4 z-10">
          <ThemeToggleButton />
        </Box>
      </Box>
    </GluestackUIProvider>
  );
}
