import React from "react";
import { Card } from "@/components/ui/card";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import type { StatsCardProps } from "../types";

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  bgColor,
  iconBgColor,
  textColor,
  valueColor,
  isLoading = false,
}) => {
  return (
    <Card
      className={`flex-1 ${bgColor} border border-opacity-20 p-4 shadow-sm`}
    >
      <VStack space="sm" className="items-center">
        <Box className={`${iconBgColor} p-3 rounded-full shadow-sm`}>
          <Icon className="text-white" size={24} />
        </Box>
        <Text className={`${textColor} text-sm font-medium text-center`}>
          {title}
        </Text>
        {isLoading ? (
          <Box className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
        ) : (
          <Text className={`${valueColor} text-2xl font-bold`}>{value}</Text>
        )}
      </VStack>
    </Card>
  );
};

export default StatsCard;
