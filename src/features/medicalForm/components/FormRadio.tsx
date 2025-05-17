import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
} from "../../../components/ui/form-control";
import { Controller } from "react-hook-form";
import { AlertTriangle, CircleIcon } from "lucide-react-native";
import {
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
} from "../../../components/ui/radio"; // Alterando para usar Radio
import { HStack } from "../../../components/ui/hstack";

interface FormRadioProps {
  name: string;
  label: string;
  control: any;
  errors: any;
  size: "sm" | "md" | "lg"; // Adicionando tamanho do Radio
  options: { label: string; value: string }[]; // Sim/Não opções
}
const FormRadio = ({
  name,
  label,
  control,
  errors,
  size,
  options = [],
}: FormRadioProps) => {
  return (
    <FormControl isInvalid={!!errors?.[name]}>
      <FormControlLabel>
        <FormControlLabelText>{label}</FormControlLabelText>
      </FormControlLabel>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <RadioGroup value={value || ""} onChange={onChange}>
            <HStack space="lg">
              {options.map((option) => (
                <Radio
                  size={size}
                  key={option.value}
                  value={option.value}
                  id={`${name}-${option.value}`}
                >
                  <RadioIndicator>
                    <RadioIcon as={CircleIcon} />
                  </RadioIndicator>
                  <RadioLabel>{option.label}</RadioLabel>
                </Radio>
              ))}
            </HStack>
          </RadioGroup>
        )}
      />
      {errors?.[name] && (
        <FormControlError>
          <FormControlErrorIcon as={AlertTriangle} />
          <FormControlErrorText>{errors[name]?.message}</FormControlErrorText>
        </FormControlError>
      )}
    </FormControl>
  );
};

export default FormRadio;
