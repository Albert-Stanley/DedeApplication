import "@/global.css";
import { Stack } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { StatusBar } from "react-native";

export default function Layout() {
  return (
    <GluestackUIProvider mode="dark">
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <Stack screenOptions={{ headerShown: false }} />
    </GluestackUIProvider>
  );
}
