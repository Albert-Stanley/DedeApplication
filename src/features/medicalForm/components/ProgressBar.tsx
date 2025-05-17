import React from "react";
import { Progress, ProgressFilledTrack } from "../../../components/ui/progress";
import { Center } from "../../../components/ui/center";
import { Text } from "../../../components/ui/text";

interface ProgressBarProps {
  value: number;
  step: string;
}

const ProgressBar = ({ value, step }: ProgressBarProps) => {
  return (
    <Center className="w-full">
      <Text className="text-lg font-bold text-primary-500">{step}</Text>
      <Progress
        value={value}
        size="md"
        orientation="horizontal"
        className="w-full"
      >
        <ProgressFilledTrack />
      </Progress>
    </Center>
  );
};

export default ProgressBar;
