import "../../global.css";
import { Stack } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../context/AuthContext";
import ThemeToggleButton from "@/components/common/ThemeToggleButton";
import { Box } from "@/components/ui/box";
import { useTheme } from "@/stores/useThemeStore";

export default function WebLayout() {
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
      {/* Garantindo que o fundo e o layout ocupem toda a tela */}
      <div
        className={`w-screen h-screen bg-background-50 text-white flex flex-col overflow-hidden`}
      >
        <ThemeToggleButton />
        {/* Aqui vai o conteúdo principal */}
        <Box className="flex-1 overflow-auto p-4 ">
          {/* O conteúdo da tela será mostrado aqui */}
          <Stack screenOptions={{ headerShown: false }} />
        </Box>
      </div>
    </GluestackUIProvider>
  );
}
