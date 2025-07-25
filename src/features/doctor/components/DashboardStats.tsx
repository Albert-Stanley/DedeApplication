import React from "react";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Users, FileText, Clock, CheckCircle } from "lucide-react-native";
import StatsCard from "./StatsCard";
import { useDoctorStats } from "../services/doctorService";

const DashboardStats: React.FC = () => {
  const { data: stats, isLoading } = useDoctorStats();

  const statsConfig = [
    {
      title: "Total Pacientes",
      value: stats?.totalPatients || 0,
      icon: Users,
      bgColor:
        "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20",
      iconBgColor: "bg-blue-500 dark:bg-blue-600",
      textColor: "text-blue-600 dark:text-blue-400",
      valueColor: "text-blue-900 dark:text-blue-100",
    },
    {
      title: "Formulários",
      value: stats?.totalForms || 0,
      icon: FileText,
      bgColor:
        "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20",
      iconBgColor: "bg-green-500 dark:bg-green-600",
      textColor: "text-green-600 dark:text-green-400",
      valueColor: "text-green-900 dark:text-green-100",
    },
    {
      title: "Pendentes",
      value: stats?.pendingForms || 0,
      icon: Clock,
      bgColor:
        "bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20",
      iconBgColor: "bg-yellow-500 dark:bg-yellow-600",
      textColor: "text-yellow-600 dark:text-yellow-400",
      valueColor: "text-yellow-900 dark:text-yellow-100",
    },
    {
      title: "Concluídos",
      value: stats?.completedForms || 0,
      icon: CheckCircle,
      bgColor:
        "bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20",
      iconBgColor: "bg-emerald-500 dark:bg-emerald-600",
      textColor: "text-emerald-600 dark:text-emerald-400",
      valueColor: "text-emerald-900 dark:text-emerald-100",
    },
  ];

  return (
    <VStack space="md" className="w-full">
      <Heading className="text-gray-900 dark:text-gray-100 text-lg font-semibold">
        Resumo
      </Heading>

      <VStack space="sm" className="w-full">
        <HStack space="sm" className="w-full">
          <StatsCard {...statsConfig[0]} isLoading={isLoading} />
          <StatsCard {...statsConfig[1]} isLoading={isLoading} />
        </HStack>
        <HStack space="sm" className="w-full">
          <StatsCard {...statsConfig[2]} isLoading={isLoading} />
          <StatsCard {...statsConfig[3]} isLoading={isLoading} />
        </HStack>
      </VStack>
    </VStack>
  );
};

export default DashboardStats;
