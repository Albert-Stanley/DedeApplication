import React from "react";
import { Platform, View } from "react-native";
import {
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
} from "../ui/checkbox";
import { Text } from "../ui/text";
import { AlertTriangle, CheckIcon } from "lucide-react-native";
import { VStack } from "../ui/vstack";

interface TermsCheckboxProps {
  isChecked: boolean;
  onChange: (checked: boolean) => void;
  onOpenModal: (content: "termos" | "politica") => void;
  error?: string;
}

const TermsCheckbox: React.FC<TermsCheckboxProps> = ({
  error,
  isChecked,
  onChange,
  onOpenModal,
}) => {
  return (
    <VStack>
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
      {error && (
        <View className="flex flex-row justify-start items-center mt-1 gap-1">
          <AlertTriangle className="text-error-700 fill-none h-5 w-5" />
          <Text className="text-error-700 text-lg">{error}</Text>
        </View>
      )}
    </VStack>
  );
};

export default TermsCheckbox;
