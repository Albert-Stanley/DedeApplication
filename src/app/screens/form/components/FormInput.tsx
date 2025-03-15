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

interface FormInputProps {
  name: string;
  label: string;
  control: any;
  errors: any;
  placeholder: string;
  value?: string;
  editable?: boolean;
  size?: "sm" | "md" | "lg"; // Definindo um tamanho padrão, mas pode ser personalizado
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
    <FormControl size={size} isInvalid={!!errors?.[name]}>
      <FormControlLabel>
        <FormControlLabelText>{label}</FormControlLabelText>
      </FormControlLabel>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input size={size}>
            <InputField
              id={name}
              placeholder={placeholder}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              editable={editable}
              returnKeyType="done"
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
  );
};

export default FormInput;
