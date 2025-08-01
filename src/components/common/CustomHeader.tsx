import React from "react";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import GoBackArrow from "@/components/common/goBackArrow";
import ThemeToggleButton from "@/components/common/ThemeToggleButton";

interface CustomHeaderProps {
  title?: string;
  showBackButton?: boolean;
  showThemeToggle?: boolean;
  backgroundColor?: string;
  titleColor?: string;
  compact?: boolean;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  showBackButton = true,
  showThemeToggle = true,
  backgroundColor = "bg-transparent",
  titleColor = "text-primary",
  compact = false,
}) => {
  const paddingY = compact ? "py-2" : "py-4";
  const titleSize = compact ? "text-base" : "text-lg";

  return (
    <Box className={`px-4 pt-2 ${paddingY} ${backgroundColor} relative z-50`}>
      <HStack className="items-center justify-between min-h-[44px]">
        <Box className="w-12 h-12 justify-center items-start">
          {showBackButton && <GoBackArrow />}
        </Box>

        <Box className="flex-1 items-center px-2">
          {title && (
            <Heading
              className={`${titleColor} ${titleSize} font-semibold text-center`}
            >
              {title}
            </Heading>
          )}
        </Box>

        <Box className="w-12 h-12 justify-center items-end">
          {showThemeToggle && (
            <ThemeToggleButton
              position="relative"
              size={compact ? "sm" : "md"}
            />
          )}
        </Box>
      </HStack>
    </Box>
  );
};

export default CustomHeader;
