import React from "react";
import { Input, InputField, InputIcon } from "@/components/ui/input";
import { SearchIcon } from "lucide-react-native";

const SearchBar = () => {
  return (
    <Input variant="rounded" size="md" className="w-full ">
      <InputField placeholder="Pesquisar paciente" />
      <InputIcon as={SearchIcon} className="mr-2" />
    </Input>
  );
};

export default SearchBar;
