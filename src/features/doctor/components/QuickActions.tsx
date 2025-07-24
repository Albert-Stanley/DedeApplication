import React from 'react';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import CreateForm from './CreateForm';
import CreateAccess from './CreateAccess';

const QuickActions: React.FC = () => {
  return (
    <VStack space="md">
      <Heading className="text-typography-900 text-lg font-semibold mb-2">
        Ações Rápidas
      </Heading>

      <HStack space="md" className="w-full">
        <Card className="flex-1 shadow-sm">
          <CreateForm />
        </Card>
        <Card className="flex-1 shadow-sm">
          <CreateAccess />
        </Card>
      </HStack>
    </VStack>
  );
};

export default QuickActions;
