import React from "react";
import { Controller } from "react-hook-form";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { AlertTriangle } from "lucide-react-native";
import { View } from "react-native";

interface DateInputProps {
  name: string;
  label: string;
  control: any;
  errors: any;
  size?: "sm" | "md" | "lg";
  placeholder: string;
  editable?: boolean;
}

const DateInput = ({
  name,
  label,
  control,
  errors,
  size = "lg",
  placeholder,
  editable = true,
}: DateInputProps) => {
  const formatDate = (input: string) => {
    const numbersOnly = input.replace(/\D/g, ""); // Remove não numéricos
    let formatted = numbersOnly.slice(0, 2);
    if (numbersOnly.length >= 3) formatted += "/" + numbersOnly.slice(2, 4);
    if (numbersOnly.length >= 5) formatted += "/" + numbersOnly.slice(4, 8);
    return formatted;
  };

  return (
    <View className="w-full items-center justify-center">
      <FormControl
        size={size}
        isInvalid={!!errors?.[name]}
        className="w-full mb-3"
      >
        <FormControlLabel>
          <FormControlLabelText>{label}</FormControlLabelText>
        </FormControlLabel>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input size={size} className="w-full justify-center">
              <InputField
                id={name}
                placeholder={placeholder}
                value={value}
                onChangeText={(text) => onChange(formatDate(text))}
                onBlur={onBlur}
                editable={editable}
                returnKeyType="done"
                className="h-[45px] px-3 text-left text-base leading-[20px] min-h-[45px]"
              />
            </Input>
          )}
        />
        {errors?.[name] && (
          <FormControlError>
            <FormControlErrorIcon as={AlertTriangle} />
            <FormControlErrorText>
              {errors[name]?.message || "Erro no campo, por favor verifique."}
            </FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>
    </View>
  );
};

export default DateInput;
