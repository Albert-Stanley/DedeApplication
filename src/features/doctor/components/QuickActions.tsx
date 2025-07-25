import React from "react";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Box } from "@/components/ui/box";
import CreateForm from "./CreateForm";
import CreateAccess from "./CreateAccess";

const QuickActions: React.FC = () => {
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl">
      <Box className="p-4">
        <VStack space="md" className="w-full">
          <Heading className="text-lg font-semibold text-center text-gray-900 dark:text-gray-100">
            Ações Rápidas
          </Heading>
          <HStack space="md" className="w-full justify-center">
            <Box className="flex-1">
              <CreateForm />
            </Box>
            <Box className="flex-1">
              <CreateAccess />
            </Box>
          </HStack>
        </VStack>
      </Box>
    </Card>
  );
};

export default QuickActions;
