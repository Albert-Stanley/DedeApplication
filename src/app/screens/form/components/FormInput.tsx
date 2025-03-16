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
            <Input size={size} className="w-full min-h-[45px] justify-center">
              <InputField
                id={name}
                placeholder={placeholder}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                editable={editable}
                returnKeyType="done"
                className="h-[45px] px-3 text-left"
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

export default FormInput;
