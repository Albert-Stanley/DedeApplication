import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  Actionsheet,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetDragIndicatorWrapper,
  ActionsheetBackdrop,
  ActionsheetDragIndicator,
  ActionsheetScrollView,
} from "../ui/actionsheet"; // Certifique-se de que o caminho está correto
import { Button, ButtonText } from "../ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
} from "../ui/form-control";
import { AlertTriangle } from "lucide-react-native";

const ufs = [
  { title: "Acre", sigla: "AC" },
  { title: "Alagoas", sigla: "AL" },
  { title: "Amapá", sigla: "AP" },
  { title: "Amazonas", sigla: "AM" },
  { title: "Bahia", sigla: "BA" },
  { title: "Ceará", sigla: "CE" },
  { title: "Distrito Federal", sigla: "DF" },
  { title: "Espírito Santo", sigla: "ES" },
  { title: "Goiás", sigla: "GO" },
  { title: "Maranhão", sigla: "MA" },
  { title: "Mato Grosso", sigla: "MT" },
  { title: "Mato Grosso do Sul", sigla: "MS" },
  { title: "Minas Gerais", sigla: "MG" },
  { title: "Pará", sigla: "PA" },
  { title: "Paraíba", sigla: "PB" },
  { title: "Paraná", sigla: "PR" },
  { title: "Pernambuco", sigla: "PE" },
  { title: "Piauí", sigla: "PI" },
  { title: "Rio de Janeiro", sigla: "RJ" },
  { title: "Rio Grande do Norte", sigla: "RN" },
  { title: "Rio Grande do Sul", sigla: "RS" },
  { title: "Rondônia", sigla: "RO" },
  { title: "Roraima", sigla: "RR" },
  { title: "Santa Catarina", sigla: "SC" },
  { title: "São Paulo", sigla: "SP" },
  { title: "Sergipe", sigla: "SE" },
  { title: "Tocantins", sigla: "TO" },
];

interface SelectUFProps {
  value: string;
  onChange: (uf: string) => void;
  error?: string;
}

const SelectUF: React.FC<SelectUFProps> = ({ value, onChange, error }) => {
  const [showActionsheet, setShowActionsheet] = React.useState(false);
  const handleClose = () => setShowActionsheet(false);

  return (
    <FormControl>
      <View>
        <Button
          onPress={() => setShowActionsheet(true)}
          variant="outline"
          size="md"
        >
          <ButtonText>{value || "Selecione..."}</ButtonText>
          <Icon name="keyboard-arrow-down" size={25} color="white" />
        </Button>

        {error && (
          <View className="flex flex-row justify-start items-center mt-1 gap-1">
            <AlertTriangle className="text-error-700 fill-none h-5 w-5" />
            <Text className="text-error-700 text-lg">{error}</Text>
          </View>
        )}
        <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
          <ActionsheetBackdrop />
          <ActionsheetContent>
            <ActionsheetDragIndicatorWrapper>
              <ActionsheetDragIndicator />
            </ActionsheetDragIndicatorWrapper>

            {/* Adicionando scroll para permitir visualizar todas as UFs */}
            <ActionsheetScrollView style={{ maxHeight: 300 }}>
              {ufs.map((uf, index) => (
                <ActionsheetItem
                  key={index}
                  onPress={() => {
                    onChange(uf.sigla);
                    handleClose();
                  }}
                  className="items-center"
                >
                  <ActionsheetItemText className="text-center text-lg">
                    {uf.title} - {uf.sigla}
                  </ActionsheetItemText>
                </ActionsheetItem>
              ))}
            </ActionsheetScrollView>
          </ActionsheetContent>
        </Actionsheet>
      </View>
      {error && (
        <FormControlError>
          <FormControlErrorIcon as={AlertTriangle} />
          <FormControlErrorText>{error}</FormControlErrorText>
        </FormControlError>
      )}
    </FormControl>
  );
};

export default SelectUF;
