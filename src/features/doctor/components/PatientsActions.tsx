import React from "react";
import { TouchableOpacity } from "react-native";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import {
  UserPlus,
  FileText,
  Search,
  Filter,
  Download,
  RefreshCw,
} from "lucide-react-native";
import { useRouter } from "expo-router";

interface PatientsActionsProps {
  onRefresh?: () => void;
  onFilter?: () => void;
  onExport?: () => void;
  isRefreshing?: boolean;
}

const PatientsActions: React.FC<PatientsActionsProps> = ({
  onRefresh,
  onFilter,
  onExport,
  isRefreshing = false,
}) => {
  const router = useRouter();

  const handleAddPatient = () => {
    router.push("/doctor/patients/add");
  };

  const handleCreateForm = () => {
    router.push("/medical-form/Step1");
  };

  const quickActions = [
    {
      icon: UserPlus,
      title: "Adicionar",
      subtitle: "Novo paciente",
      color: "bg-green-500",
      onPress: handleAddPatient,
    },
    {
      icon: FileText,
      title: "Formulário",
      subtitle: "Criar novo",
      color: "bg-blue-500",
      onPress: handleCreateForm,
    },
    {
      icon: RefreshCw,
      title: "Atualizar",
      subtitle: "Lista",
      color: "bg-purple-500",
      onPress: onRefresh,
      isLoading: isRefreshing,
    },
    {
      icon: Download,
      title: "Exportar",
      subtitle: "Relatório",
      color: "bg-orange-500",
      onPress: onExport,
    },
  ];

  return (
    <Card className="card-bg shadow-card rounded-xl">
      <Box className="p-4">
        <VStack space="md">
          <Heading className="text-primary text-lg font-semibold text-center">
            Ações Rápidas
          </Heading>

          <HStack space="sm" className="justify-between">
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                onPress={action.onPress}
                disabled={action.isLoading}
                activeOpacity={0.7}
                className="flex-1"
              >
                <Box className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <VStack space="xs" className="items-center">
                    <Box className={`p-2 rounded-full ${action.color}`}>
                      <action.icon className="text-white" size={16} />
                    </Box>
                    <VStack className="items-center">
                      <Text className="text-primary font-semibold text-xs text-center">
                        {action.title}
                      </Text>
                      <Text className="text-secondary text-xs text-center">
                        {action.subtitle}
                      </Text>
                    </VStack>
                  </VStack>
                </Box>
              </TouchableOpacity>
            ))}
          </HStack>
        </VStack>
      </Box>
    </Card>
  );
};

export default PatientsActions;
