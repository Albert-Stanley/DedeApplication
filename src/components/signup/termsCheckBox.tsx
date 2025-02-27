import React from "react";
import { Platform } from "react-native";
import {
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
} from "../ui/checkbox";
import { Text } from "../ui/text";
import { CheckIcon } from "lucide-react-native";

interface TermsCheckboxProps {
  isChecked: boolean;
  onChange: (checked: boolean) => void;
  onOpenModal: (content: "termos" | "politica") => void;
}

const TermsCheckbox: React.FC<TermsCheckboxProps> = ({
  isChecked,
  onChange,
  onOpenModal,
}) => {
  return (
    <Checkbox
      size="md"
      value="terms"
      aria-label="terms"
      isChecked={isChecked}
      onChange={onChange}
    >
      <CheckboxIndicator>
        <CheckboxIcon as={CheckIcon} />
      </CheckboxIndicator>
      <CheckboxLabel className="text-md leading-tight text-typography-700 flex-row flex-wrap">
        {Platform.OS === "web" ? (
          <>
            Eu aceito os{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onOpenModal("termos");
              }}
              style={{ color: "#1E90FF", textDecoration: "underline" }}
            >
              Termos de Uso
            </a>{" "}
            &{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onOpenModal("politica");
              }}
              style={{ color: "#1E90FF", textDecoration: "underline" }}
            >
              Política de Privacidade
            </a>
          </>
        ) : (
          <Text className="text-sm leading-tight text-typography-700 flex-row flex-wrap">
            Eu aceito os{" "}
            <Text
              className="text-sm text-primary-500 underline"
              onPress={() => onOpenModal("termos")}
            >
              Termos de Uso
            </Text>{" "}
            &{" "}
            <Text
              className="text-sm text-primary-500 underline"
              onPress={() => onOpenModal("politica")}
            >
              Política de Privacidade
            </Text>
          </Text>
        )}
      </CheckboxLabel>
    </Checkbox>
  );
};

export default TermsCheckbox;
