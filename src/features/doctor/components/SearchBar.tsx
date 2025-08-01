import React from "react";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { SearchIcon } from "lucide-react-native";

const SearchBar = () => {
  return (
    <Input
      variant="rounded"
      size="md"
      className="w-full"
      label="Buscar paciente"
    >
      <InputSlot className="pl-3">
        <InputIcon as={SearchIcon} className="text-gray-400" />
      </InputSlot>
      <InputField />
    </Input>
  );
};

export default SearchBar;
