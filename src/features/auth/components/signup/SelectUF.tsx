import React, { useState } from "react";
import { View, Text } from "react-native";

// Componentes personalizados
import {
  Actionsheet,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetDragIndicatorWrapper,
  ActionsheetBackdrop,
  ActionsheetDragIndicator,
  ActionsheetScrollView,
} from "@/components/ui/actionsheet";
import { Button, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
} from "@/components/ui/form-control";
import { Icon } from "@/components/ui/icon";
import { AlertTriangle, ArrowDown } from "lucide-react-native";

// Lista de estados(unidades federativas) do Brasil
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

// Definição dos tipos das props do componente
interface SelectUFProps {
  value: string;
  onChange: (uf: string) => void;
  error?: string | null;
}

// Componente para selecionar um estado brasileiro
function SelectUF({ value, onChange, error }: SelectUFProps) {
  const [showActionsheet, setShowActionsheet] = useState(false);

  // Fecha o Actionsheet
  const handleClose = () => setShowActionsheet(false);

  return (
    <FormControl>
      <View>
        {/* Botão para abrir a lista de estados */}
        <Button
          onPress={() => setShowActionsheet(true)}
          variant="outline"
          size="md"
        >
          <ButtonText>{value || "Selecione..."}</ButtonText>
          <Icon as={ArrowDown} />
        </Button>

        {/* Exibe erro, se houver */}
        {error && (
          <View className="flex flex-row justify-start items-center mt-1 gap-1">
            <AlertTriangle className="text-error-700 fill-none h-5 w-5" />
            <Text className="text-error-700 text-lg">{error}</Text>
          </View>
        )}

        {/* Actionsheet para exibir a lista de estados */}
        <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
          <ActionsheetBackdrop />
          <ActionsheetContent>
            <ActionsheetDragIndicatorWrapper>
              <ActionsheetDragIndicator />
            </ActionsheetDragIndicatorWrapper>

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

      {/* Exibe erro no FormControl, se houver */}
      {error && (
        <FormControlError>
          <FormControlErrorIcon as={AlertTriangle} />
          <FormControlErrorText>{error}</FormControlErrorText>
        </FormControlError>
      )}
    </FormControl>
  );
}

export default SelectUF;
