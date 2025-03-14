import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
} from "@/components/ui/form-control";
import { Controller } from "react-hook-form";
import { AlertTriangle } from "lucide-react-native";
import {
  Checkbox,
  CheckboxGroup,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxIcon,
} from "@/components/ui/checkbox";
import { CheckIcon } from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";

interface FormCheckboxProps {
  name: string;
  label: string;
  control: any;
  errors: any;
  options: { label: string; value: string }[];
}

const FormCheckbox = ({
  name,
  label,
  control,
  errors,
  options,
}: FormCheckboxProps) => {
  return (
    <FormControl isInvalid={!!errors?.[name]}>
      <FormControlLabel>
        <FormControlLabelText>{label}</FormControlLabelText>
      </FormControlLabel>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <CheckboxGroup value={value} onChange={onChange}>
            <VStack space="md">
              {options.map((option, idx) => (
                <Checkbox key={idx} value={option.value}>
                  <CheckboxIndicator>
                    <CheckboxIcon as={CheckIcon} />
                  </CheckboxIndicator>
                  <CheckboxLabel>{option.label}</CheckboxLabel>
                </Checkbox>
              ))}
            </VStack>
          </CheckboxGroup>
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

export default FormCheckbox;
