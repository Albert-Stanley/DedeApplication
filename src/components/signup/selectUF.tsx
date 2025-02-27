import React, { useState } from "react";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
} from "@/components/ui/form-control";
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectItem,
} from "@/components/ui/select";
import { AlertCircleIcon, ChevronDownIcon } from "@/components/ui/icon";

const ufs = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];

interface SelectUFProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const SelectUF: React.FC<SelectUFProps> = ({ value, onChange, error }) => {
  const [selectedUF, setSelectedUF] = useState<string>(value);

  const handleSelectChange = (uf: string) => {
    setSelectedUF(uf);
    onChange(uf);
  };

  return (
    <FormControl isRequired isInvalid={!!error}>
      <FormControlLabel>
        <FormControlLabelText>Selecione o estado</FormControlLabelText>
      </FormControlLabel>
      <Select onValueChange={handleSelectChange}>
        <SelectTrigger>
          <SelectInput placeholder="Selecione..." className="flex-1" />
          <SelectIcon className="mr-3" as={ChevronDownIcon} />
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent className="max-h-60 overflow-auto">
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>
            {ufs.map((uf) => (
              <SelectItem key={uf} label={uf} value={uf} />
            ))}
          </SelectContent>
        </SelectPortal>
      </Select>
      {error && (
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>{error}</FormControlErrorText>
        </FormControlError>
      )}
      <FormControlHelper>
        <FormControlHelperText>
          Escolha a UF para continuar
        </FormControlHelperText>
      </FormControlHelper>
    </FormControl>
  );
};

export default SelectUF;
