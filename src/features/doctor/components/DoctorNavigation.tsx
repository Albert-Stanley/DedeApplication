import React from "react";
import { TouchableOpacity, Alert } from "react-native";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import {
  FileText,
  Users,
  Calendar,
  BarChart3,
  Settings,
  HelpCircle,
  Bell,
  Bookmark,
} from "lucide-react-native";
import { useRouter } from "expo-router";

interface NavigationAction {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  route?: string;
  color: string;
  available: boolean;
}

const DoctorNavigation: React.FC = () => {
  const router = useRouter();

  const navigationActions: NavigationAction[] = [
    {
      icon: FileText,
      title: "Formulários",
      description: "Criar e gerenciar",
      route: "/medical-form/Step1",
      color: "bg-blue-500",
      available: true,
    },
    {
      icon: Users,
      title: "Pacientes",
      description: "Lista completa",
      route: "/doctor/patients",
      color: "bg-green-500",
      available: true,
    },
    {
      icon: Calendar,
      title: "Agenda",
      description: "Consultas e eventos",
      color: "bg-purple-500",
      available: false,
    },
    {
      icon: BarChart3,
      title: "Relatórios",
      description: "Análise de dados",
      color: "bg-orange-500",
      available: false,
    },
    {
      icon: Bell,
      title: "Notificações",
      description: "Alertas e lembretes",
      color: "bg-red-500",
      available: false,
    },
    {
      icon: Bookmark,
      title: "Favoritos",
      description: "Itens salvos",
      color: "bg-indigo-500",
      available: false,
    },
    {
      icon: Settings,
      title: "Configurações",
      description: "Preferências",
      color: "bg-gray-500",
      available: false,
    },
    {
      icon: HelpCircle,
      title: "Ajuda",
      description: "Suporte e FAQ",
      color: "bg-teal-500",
      available: false,
    },
  ];

  const handleNavigation = (action: NavigationAction) => {
    if (!action.available) {
      Alert.alert(
        "Funcionalidade em desenvolvimento",
        `${action.title} estará disponível em breve.`,
        [{ text: "OK" }]
      );
      return;
    }

    if (action.route) {
      router.push(action.route);
    }
  };

  return (
    <Card className="card-bg shadow-card rounded-xl">
      <Box className="p-4">
        <VStack space="md">
          <Heading className="text-primary text-lg font-semibold text-center">
            Navegação Rápida
          </Heading>

          {/* Grid de navegação - responsivo */}
          <VStack space="sm" className="web:hidden">
            {/* Mobile: 2 colunas */}
            {Array.from({
              length: Math.ceil(navigationActions.length / 2),
            }).map((_, rowIndex) => (
              <HStack key={rowIndex} space="sm" className="justify-between">
                {navigationActions
                  .slice(rowIndex * 2, rowIndex * 2 + 2)
                  .map((action) => (
                    <TouchableOpacity
                      key={action.title}
                      onPress={() => handleNavigation(action)}
                      activeOpacity={0.7}
                      className="flex-1"
                    >
                      <Box
                        className={`p-4 border border-gray-200 dark:border-gray-700 rounded-lg transition-colors ${
                          action.available
                            ? "hover:bg-gray-50 dark:hover:bg-gray-800"
                            : "opacity-60"
                        }`}
                      >
                        <VStack space="sm" className="items-center">
                          <Box
                            className={`p-3 rounded-full ${action.color} ${
                              !action.available ? "opacity-60" : ""
                            }`}
                          >
                            <action.icon className="text-white" size={20} />
                          </Box>
                          <VStack className="items-center">
                            <Text
                              className={`text-primary font-semibold text-sm text-center ${
                                !action.available ? "opacity-60" : ""
                              }`}
                            >
                              {action.title}
                            </Text>
                            <Text
                              className={`text-secondary text-xs text-center ${
                                !action.available ? "opacity-60" : ""
                              }`}
                            >
                              {action.description}
                            </Text>
                            {!action.available && (
                              <Text className="text-yellow-600 dark:text-yellow-400 text-xs text-center font-medium">
                                Em breve
                              </Text>
                            )}
                          </VStack>
                        </VStack>
                      </Box>
                    </TouchableOpacity>
                  ))}
              </HStack>
            ))}
          </VStack>

          {/* Web: 4 colunas */}
          <Box className="hidden web:block">
            <div className="grid grid-cols-4 gap-3">
              {navigationActions.map((action) => (
                <TouchableOpacity
                  key={action.title}
                  onPress={() => handleNavigation(action)}
                  activeOpacity={0.7}
                >
                  <Box
                    className={`p-4 border border-gray-200 dark:border-gray-700 rounded-lg transition-colors cursor-pointer ${
                      action.available
                        ? "hover:bg-gray-50 dark:hover:bg-gray-800"
                        : "opacity-60"
                    }`}
                  >
                    <VStack space="sm" className="items-center">
                      <Box
                        className={`p-3 rounded-full ${action.color} ${
                          !action.available ? "opacity-60" : ""
                        }`}
                      >
                        <action.icon className="text-white" size={20} />
                      </Box>
                      <VStack className="items-center">
                        <Text
                          className={`text-primary font-semibold text-sm text-center ${
                            !action.available ? "opacity-60" : ""
                          }`}
                        >
                          {action.title}
                        </Text>
                        <Text
                          className={`text-secondary text-xs text-center ${
                            !action.available ? "opacity-60" : ""
                          }`}
                        >
                          {action.description}
                        </Text>
                        {!action.available && (
                          <Text className="text-yellow-600 dark:text-yellow-400 text-xs text-center font-medium">
                            Em breve
                          </Text>
                        )}
                      </VStack>
                    </VStack>
                  </Box>
                </TouchableOpacity>
              ))}
            </div>
          </Box>
        </VStack>
      </Box>
    </Card>
  );
};

export default DoctorNavigation;
