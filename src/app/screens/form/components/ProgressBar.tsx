import React from "react";
import { Progress, ProgressFilledTrack } from "@/components/ui/progress";
import { Center } from "@/components/ui/center";

interface ProgressBarProps {
  value: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
  return (
    <Center className="w-full">
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
