import React from "react";
import { TouchableOpacity } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import {
  FileText,
  UserPlus,
  Key,
  Users,
  Calendar,
  Settings,
  ClipboardList,
  UserCheck,
} from "lucide-react-native";
import { useRouter } from "expo-router";

interface QuickActionProps {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  onPress: () => void;
  color: string;
}

const QuickActionButton: React.FC<QuickActionProps> = ({
  icon: Icon,
  title,
  description,
  onPress,
  color,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Box className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
        <VStack space="sm" className="items-center">
          <Box className={`p-3 rounded-full ${color}`}>
            <Icon className="text-white" size={20} />
          </Box>
          <VStack space="xs" className="items-center">
            <Text className="text-primary font-semibold text-sm text-center">
              {title}
            </Text>
            <Text className="text-secondary text-xs text-center">
              {description}
            </Text>
          </VStack>
        </VStack>
      </Box>
    </TouchableOpacity>
  );
};

const QuickActions: React.FC = () => {
  const router = useRouter();

  const quickActions = [
    {
      icon: FileText,
      title: "Criar Formulário",
      description: "Novo formulário médico",
      color: "bg-blue-500",
      onPress: () => router.push("/medical-form/Step1"),
    },
    {
      icon: UserPlus,
      title: "Adicionar Paciente",
      description: "Cadastrar novo paciente",
      color: "bg-green-500",
      onPress: () => router.push("/doctor/patients/add"),
    },
    {
      icon: Key,
      title: "Dar Acesso",
      description: "Gerar chave de acesso",
      color: "bg-purple-500",
      onPress: () => router.push("/doctor/CreateAccessKey"),
    },
    {
      icon: Users,
      title: "Ver Pacientes",
      description: "Lista completa",
      color: "bg-indigo-500",
      onPress: () => router.push("/doctor/patients"),
    },
    {
      icon: ClipboardList,
      title: "Consultas",
      description: "Agendar e gerenciar",
      color: "bg-orange-500",
      onPress: () => {
        // Future functionality
        console.log("Consultas - Em desenvolvimento");
      },
    },
    {
      icon: UserCheck,
      title: "Perfil",
      description: "Meus dados médicos",
      color: "bg-teal-500",
      onPress: () => router.push("/doctor/Profile"),
    },
    {
      icon: Calendar,
      title: "Agenda",
      description: "Visualizar agenda",
      color: "bg-pink-500",
      onPress: () => {
        // Future functionality
        console.log("Agenda - Em desenvolvimento");
      },
    },
    {
      icon: Settings,
      title: "Configurações",
      description: "Ajustes do app",
      color: "bg-gray-500",
      onPress: () => {
        // Future functionality
        console.log("Configurações - Em desenvolvimento");
      },
    },
  ];

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl">
      <Box className="p-4">
        <VStack space="md" className="w-full">
          <Heading className="text-lg font-semibold text-center text-gray-900 dark:text-gray-100">
            Ações Rápidas
          </Heading>

          {/* Grid of actions - responsive layout */}
          <VStack space="sm" className="web:hidden">
            {/* Mobile: 2 rows of 4 columns */}
            <HStack space="sm" className="w-full justify-between">
              {quickActions.slice(0, 4).map((action, index) => (
                <Box key={index} className="flex-1">
                  <QuickActionButton {...action} />
                </Box>
              ))}
            </HStack>

            <HStack space="sm" className="w-full justify-between">
              {quickActions.slice(4, 8).map((action, index) => (
                <Box key={index + 4} className="flex-1">
                  <QuickActionButton {...action} />
                </Box>
              ))}
            </HStack>
          </VStack>

          {/* Web: 4 columns x 2 rows */}
          <Box className="hidden web:block">
            <div className="grid grid-cols-4 gap-3">
              {quickActions.map((action, index) => (
                <QuickActionButton key={index} {...action} />
              ))}
            </div>
          </Box>
        </VStack>
      </Box>
    </Card>
  );
};

export default QuickActions;
