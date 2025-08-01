import React, { useEffect, useRef } from "react";
import { Animated, TextInputProps } from "react-native";
import { FormControl } from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";

interface FloatingLabelInputProps extends Omit<TextInputProps, "placeholder"> {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  isRequired?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "outline" | "underlined" | "rounded";
  isDisabled?: boolean;
  isReadOnly?: boolean;
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  label,
  value,
  onChangeText,
  error,
  isRequired = false,
  size = "md",
  variant = "outline",
  isDisabled = false,
  isReadOnly = false,
  ...textInputProps
}) => {
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;
  const [isFocused, setIsFocused] = React.useState(false);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value, animatedValue]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const labelStyle = {
    position: "absolute" as const,
    left: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    top: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [18, -8],
    }),
    fontSize: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["rgba(107, 114, 128, 0.7)", "#4A90E2"],
    }),
    backgroundColor: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["transparent", "#FFFFFF"],
    }),
    paddingHorizontal: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 4],
    }),
    zIndex: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 10],
    }),
  };

  const getInputHeight = () => {
    switch (size) {
      case "sm":
        return 40;
      case "lg":
        return 56;
      default:
        return 48;
    }
  };

  return (
    <FormControl
      isInvalid={!!error}
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
    >
      <Box className="relative">
        <Input
          variant={variant}
          size={size}
          isDisabled={isDisabled}
          isReadOnly={isReadOnly}
          className={`
            ${
              error
                ? "border-red-500"
                : "border-gray-300 focus:border-primary-500"
            }
            bg-white dark:bg-gray-800
            ${isDisabled ? "opacity-50" : ""}
          `}
          style={{ height: getInputHeight() }}
        >
          <InputField
            value={value}
            onChangeText={onChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`
              text-gray-900 dark:text-gray-100
              ${
                size === "sm"
                  ? "text-sm"
                  : size === "lg"
                  ? "text-lg"
                  : "text-base"
              }
              pt-2
            `}
            {...textInputProps}
          />
        </Input>

        <Animated.Text style={labelStyle}>
          {label}
          {isRequired && " *"}
        </Animated.Text>
      </Box>

      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
    </FormControl>
  );
};

export default FloatingLabelInput;
