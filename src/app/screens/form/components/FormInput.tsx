import {
  FormControl,
  FormControlLabel,
  FormControlErrorText,
  FormControlLabelText,
  FormControlErrorIcon,
  FormControlError,
} from "@/components/ui/form-control";
import { Controller } from "react-hook-form";
import { AlertTriangle } from "lucide-react-native";
import { Input, InputField } from "@/components/ui/input";
import { View } from "react-native";
import { useTheme } from "@/stores/useThemeStore";

interface FormInputProps {
  name: string;
  label: string;
  control: any;
  errors: any;
  placeholder: string;
  value?: string;
  editable?: boolean;
  size?: "sm" | "md" | "lg";
}

const FormInput = ({
  name,
  label,
  control,
  errors,
  placeholder,
  editable = true,
  size = "lg",
}: FormInputProps) => {
  //tema global da aplicação
  const theme = useTheme();
  return (
    <View className="w-full items-center justify-center">
      <FormControl
        size={size}
        isInvalid={!!errors?.[name]}
        className="w-full mb-3"
      >
        <FormControlLabel>
          <FormControlLabelText size="md">{label}</FormControlLabelText>
        </FormControlLabel>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input size={size} className="w-full justify-center">
              <InputField
                id={name}
                placeholder={placeholder}
                value={value ?? ""}
                onChangeText={onChange}
                onBlur={onBlur}
                editable={editable}
                returnKeyType="done"
                keyboardAppearance={theme === "dark" ? "dark" : "light"}
                className="h-[45px]  px-3 text-left text-base leading-[20px] min-h-[45px] overflow-x-auto whitespace-nowrap"
              />
            </Input>
          )}
        />
        {errors?.[name] && (
          <FormControlError className="mt-1">
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

export default FormInput;
