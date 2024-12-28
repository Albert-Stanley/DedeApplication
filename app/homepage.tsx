import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Button } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { FormControl } from "@/components/ui/form-control";
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import { Divider } from "@/components/ui/divider";
import {
  CheckIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  Icon,
} from "@/components/ui/icon";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Tipagem do estado do formulário
interface FormData {
  diagnosticasPendentes: string[];
  nutricao: {
    aporte: string | null;
    progredirDieta: string | null;
    suspenderDieta: string | null;
  };
}

const HomePage = () => {
  // Estado do formulário com tipo especificado
  const [formData, setFormData] = useState<FormData>({
    diagnosticasPendentes: [],
    nutricao: {
      aporte: null,
      progredirDieta: null,
      suspenderDieta: null,
    },
  });

  // Função para atualizar checkboxes gerais
  const handleCheckboxChange = (
    section: keyof FormData,
    field: string,
    value: string | null
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  // Função para atualizar checkboxes da seção "Ferramentas diagnósticas"
  const handleDiagnosticasChange = (value: string, isChecked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      diagnosticasPendentes: isChecked
        ? [...prev.diagnosticasPendentes, value]
        : prev.diagnosticasPendentes.filter((item) => item !== value),
    }));
  };

  // Função para salvar os dados
  const handleSave = () => {
    console.log("Dados salvos:", formData);
  };

  return (
    <SafeAreaView className="flex-1 bg-background-50">
      <ScrollView>
        <VStack
          space="lg"
          className="flex-1 justify-center items-center px-4 space-y--1"
        >
          <Text size="sm" className="text-center font-bold">
            Dados do Paciente:
          </Text>
          <Text size="sm" className="text-center font-bold">
            Nome: João da Silva
          </Text>
          <Text size="sm" className="text-center font-bold">
            Diagnóstico:
          </Text>

          {/* Ferramentas diagnósticas pendentes */}
          <Accordion
            size="md"
            variant="filled"
            type="single"
            isCollapsible={true}
            className="m-5 w-[90%] border border-outline-200"
          >
            <AccordionItem value="form-section">
              <AccordionHeader>
                <AccordionTrigger>
                  {({ isExpanded }) => (
                    <>
                      <Text size="sm" className="font-bold">
                        Ferramentas diagnósticas pendentes
                      </Text>
                      {isExpanded ? (
                        <Icon
                          as={ChevronUpIcon}
                          className="text-typography-500 m-2 w-4 h-4"
                        />
                      ) : (
                        <Icon
                          as={ChevronDownIcon}
                          className="text-typography-500 m-2 w-4 h-4"
                        />
                      )}
                    </>
                  )}
                </AccordionTrigger>
              </AccordionHeader>
              <AccordionContent>
                <View className="flex-1">
                  <FormControl>
                    {/* Checkbox para ferramentas diagnósticas */}
                    <VStack space="sm" className="flex-row flex-wrap">
                      <Checkbox
                        accessible={true}
                        value={"Imagem"}
                        onChange={(isChecked) =>
                          handleDiagnosticasChange("Imagem", isChecked)
                        }
                        className="mr-4 mb-2"
                      >
                        <CheckboxIndicator>
                          <CheckboxIcon as={CheckIcon} />
                        </CheckboxIndicator>
                        <CheckboxLabel>Imagem</CheckboxLabel>
                      </Checkbox>
                      <Checkbox
                        value={"Laboratorial"}
                        onChange={(isChecked) =>
                          handleDiagnosticasChange("Laboratorial", isChecked)
                        }
                        className="mr-4 mb-2"
                      >
                        <CheckboxIndicator>
                          <CheckboxIcon as={CheckIcon} />
                        </CheckboxIndicator>
                        <CheckboxLabel>Laboratorial</CheckboxLabel>
                      </Checkbox>
                      <Checkbox
                        value={"N/A"}
                        onChange={(isChecked) =>
                          handleDiagnosticasChange("N/A", isChecked)
                        }
                        className="mb-2"
                      >
                        <CheckboxIndicator>
                          <CheckboxIcon as={CheckIcon} />
                        </CheckboxIndicator>
                        <CheckboxLabel>N/A</CheckboxLabel>
                      </Checkbox>
                    </VStack>
                    <Divider />
                  </FormControl>
                </View>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Seção Nutrição */}
          <Accordion
            size="md"
            variant="filled"
            type="single"
            isCollapsible={true}
            className="m-5 w-[90%] border border-outline-200"
          >
            <AccordionItem value="nutrition-section">
              <AccordionHeader>
                <AccordionTrigger>
                  {({ isExpanded }) => (
                    <>
                      <Text size="sm" className="font-bold">
                        Nutrição
                      </Text>
                      {isExpanded ? (
                        <Icon
                          as={ChevronUpIcon}
                          className="text-typography-500 m-2 w-4 h-4"
                        />
                      ) : (
                        <Icon
                          as={ChevronDownIcon}
                          className="text-typography-500 m-2 w-4 h-4"
                        />
                      )}
                    </>
                  )}
                </AccordionTrigger>
              </AccordionHeader>
              <AccordionContent>
                <FormControl>
                  <Checkbox
                    value={"Pleno"}
                    onChange={(isChecked) =>
                      handleCheckboxChange(
                        "nutricao",
                        "aporte",
                        isChecked ? "Pleno" : null
                      )
                    }
                  >
                    <CheckboxIndicator>
                      <CheckboxIcon as={CheckIcon} />
                    </CheckboxIndicator>
                    <CheckboxLabel>Aporte Pleno</CheckboxLabel>
                  </Checkbox>
                  <Checkbox
                    value={"Parcial"}
                    onChange={(isChecked) =>
                      handleCheckboxChange(
                        "nutricao",
                        "aporte",
                        isChecked ? "Parcial" : null
                      )
                    }
                  >
                    <CheckboxIndicator>
                      <CheckboxIcon as={CheckIcon} />
                    </CheckboxIndicator>
                    <CheckboxLabel>Aporte Parcial</CheckboxLabel>
                  </Checkbox>
                  <Checkbox
                    value={"Sim"}
                    onChange={(isChecked) =>
                      handleCheckboxChange(
                        "nutricao",
                        "progredirDieta",
                        isChecked ? "Sim" : null
                      )
                    }
                  >
                    <CheckboxIndicator>
                      <CheckboxIcon as={CheckIcon} />
                    </CheckboxIndicator>
                    <CheckboxLabel>Progredir dieta</CheckboxLabel>
                  </Checkbox>
                  <Checkbox
                    value={"Não"}
                    onChange={(isChecked) =>
                      handleCheckboxChange(
                        "nutricao",
                        "suspenderDieta",
                        isChecked ? "Sim" : null
                      )
                    }
                  >
                    <CheckboxIndicator>
                      <CheckboxIcon as={CheckIcon} />
                    </CheckboxIndicator>
                    <CheckboxLabel>Suspender dieta</CheckboxLabel>
                  </Checkbox>
                </FormControl>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Botão para salvar */}
          <Button title="Salvar" onPress={handleSave} />
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;
