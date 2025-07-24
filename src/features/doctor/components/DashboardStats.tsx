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
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      iconBgColor: "bg-blue-500",
      textColor: "text-blue-600",
      valueColor: "text-blue-900",
    },
    {
      title: "Formulários",
      value: stats?.totalForms || 0,
      icon: FileText,
      bgColor: "bg-gradient-to-br from-green-50 to-green-100",
      iconBgColor: "bg-green-500",
      textColor: "text-green-600",
      valueColor: "text-green-900",
    },
    {
      title: "Pendentes",
      value: stats?.pendingForms || 0,
      icon: Clock,
      bgColor: "bg-gradient-to-br from-yellow-50 to-yellow-100",
      iconBgColor: "bg-yellow-500",
      textColor: "text-yellow-600",
      valueColor: "text-yellow-900",
    },
    {
      title: "Concluídos",
      value: stats?.completedForms || 0,
      icon: CheckCircle,
      bgColor: "bg-gradient-to-br from-emerald-50 to-emerald-100",
      iconBgColor: "bg-emerald-500",
      textColor: "text-emerald-600",
      valueColor: "text-emerald-900",
    },
  ];

  return (
    <VStack space="md">
      <Heading className="text-typography-900 text-lg font-semibold mb-2">
        Resumo
      </Heading>

      <VStack space="md">
        <HStack space="md">
          <StatsCard {...statsConfig[0]} isLoading={isLoading} />
          <StatsCard {...statsConfig[1]} isLoading={isLoading} />
        </HStack>
        <HStack space="md">
          <StatsCard {...statsConfig[2]} isLoading={isLoading} />
          <StatsCard {...statsConfig[3]} isLoading={isLoading} />
        </HStack>
      </VStack>
    </VStack>
  );
};

export default DashboardStats;
