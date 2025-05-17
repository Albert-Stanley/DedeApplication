import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
} from "../../../components/ui/form-control";
import { Controller } from "react-hook-form";
import { AlertTriangle } from "lucide-react-native";
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectContent,
  SelectItem,
} from "../../../components/ui/select";
import { ChevronDownIcon } from "../../../components/ui/icon";

interface FormSelectProps {
  name: string;
  label: string;
  control: any;
  errors: any;
  options: { label: string; value: string }[];
  size?: "sm" | "md" | "lg"; // Tamanho do select
}

const FormSelect = ({
  name,
  label,
  control,
  errors,
  options,
  size = "lg",
}: FormSelectProps) => {
  return (
    <FormControl size={size} isInvalid={!!errors?.[name]}>
      <FormControlLabel>
        <FormControlLabelText>{label}</FormControlLabelText>
      </FormControlLabel>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select selectedValue={value} onValueChange={onChange}>
            <SelectTrigger variant="outline" size={size}>
              <SelectInput placeholder="Selecione uma opção" />
              <SelectIcon as={ChevronDownIcon} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option, idx) => (
                <SelectItem key={idx} value={option.value} label={""}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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

export default FormSelect;
