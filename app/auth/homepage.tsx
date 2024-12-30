import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Button } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RadioGroup, RadioIndicator, RadioLabel } from "@/components/ui/radio";
import { Radio, RadioIcon } from "@/components/ui/radio";
import {
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import {
  CheckIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  Icon,
  CircleIcon,
  EditIcon,
} from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Divider } from "@/components/ui/divider";

// Tipagem do estado do formulário
interface FormData {
  diagnosticasPendentes: string[];
  nutricao: {
    aporte: string | null;
    progredirDieta: string | null;
    suspenderDieta: string | null;
    antiemeticosProCineticos: string | null;
    evacuacaoultimas48h: string | null;
  };
}

const HomePage = () => {
  const [formData, setFormData] = useState<FormData>({
    diagnosticasPendentes: [],
    nutricao: {
      aporte: null,
      progredirDieta: null,
      suspenderDieta: null,
      antiemeticosProCineticos: null,
      evacuacaoultimas48h: null,
    },
  });

  const handleCheckboxChange = (
    section: keyof FormData,
    field: keyof FormData["nutricao"],
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

  const handleDiagnosticasChange = (value: string, isChecked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      diagnosticasPendentes: isChecked
        ? [...prev.diagnosticasPendentes, value]
        : prev.diagnosticasPendentes.filter((item) => item !== value),
    }));
  };

  const handleSave = () => {
    console.log("Dados salvos:", JSON.stringify(formData, null, 2));
  };

  return (
    <SafeAreaView className="flex-1 bg-background-50">
      <ScrollView>
        <VStack
          space="lg"
          className="flex-1 justify-center items-center px-4 space-y--1"
        >
          <Text size="sm" className="text-center mt-8 font-bold">
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
                    <VStack space="sm" className="flex-row flex-wrap">
                      <Checkbox
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
                  </FormControl>
                </View>
                <Divider />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Seção Nutrição */}
          <Accordion
            size="md"
            variant="filled"
            type="single"
            isCollapsible={true}
            className="m-2 -mt-8 w-[90%] border border-outline-200"
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
              <AccordionContent className="flex-wrap">
                <FormControl>
                  <FormControlLabel>
                    <FormControlLabelText>Aporte:</FormControlLabelText>
                  </FormControlLabel>
                  <RadioGroup
                    value={formData.nutricao.aporte || ""}
                    onChange={(value) =>
                      handleCheckboxChange("nutricao", "aporte", value)
                    }
                    className="my-2"
                  >
                    <VStack space="sm">
                      <Radio size="sm" value="Pleno">
                        <RadioIndicator>
                          <RadioIcon as={CircleIcon} />
                        </RadioIndicator>
                        <RadioLabel>Pleno</RadioLabel>
                      </Radio>
                      <Radio size="sm" value="Parcial">
                        <RadioIndicator>
                          <RadioIcon as={CircleIcon} />
                        </RadioIndicator>
                        <RadioLabel>Parcial</RadioLabel>
                      </Radio>
                    </VStack>
                  </RadioGroup>
                </FormControl>
                <FormControl>
                  <FormControlLabel>
                    <FormControlLabelText>
                      Progredir dieta:
                    </FormControlLabelText>
                  </FormControlLabel>
                  <RadioGroup
                    value={formData.nutricao.progredirDieta || ""}
                    onChange={(value) =>
                      handleCheckboxChange("nutricao", "progredirDieta", value)
                    }
                    className="my-2"
                  >
                    <VStack space="sm">
                      <Radio size="sm" value="Sim">
                        <RadioIndicator>
                          <RadioIcon as={CircleIcon} />
                        </RadioIndicator>
                        <RadioLabel>Sim</RadioLabel>
                      </Radio>
                      <Radio size="sm" value="Não">
                        <RadioIndicator>
                          <RadioIcon as={CircleIcon} />
                        </RadioIndicator>
                        <RadioLabel>Não</RadioLabel>
                      </Radio>
                    </VStack>
                  </RadioGroup>
                </FormControl>
                <FormControl>
                  <FormControlLabel>
                    <FormControlLabelText>
                      Suspender dieta:
                    </FormControlLabelText>
                  </FormControlLabel>
                  <RadioGroup
                    value={formData.nutricao.suspenderDieta || ""}
                    onChange={(value) =>
                      handleCheckboxChange("nutricao", "suspenderDieta", value)
                    }
                    className="my-2"
                  >
                    <VStack space="sm">
                      <Radio size="sm" value="Sim">
                        <RadioIndicator>
                          <RadioIcon as={CircleIcon} />
                        </RadioIndicator>
                        <RadioLabel>Sim</RadioLabel>
                      </Radio>
                      <Radio size="sm" value="Não">
                        <RadioIndicator>
                          <RadioIcon as={CircleIcon} />
                        </RadioIndicator>
                        <RadioLabel>Não</RadioLabel>
                      </Radio>
                    </VStack>
                  </RadioGroup>
                </FormControl>
                <FormControl>
                  <FormControlLabel>
                    <FormControlLabelText>
                      Antieméticos/pro cinéticos:
                    </FormControlLabelText>
                  </FormControlLabel>
                  <RadioGroup
                    value={formData.nutricao.antiemeticosProCineticos || ""}
                    onChange={(value) =>
                      handleCheckboxChange(
                        "nutricao",
                        "antiemeticosProCineticos",
                        value
                      )
                    }
                    className="my-2"
                  >
                    <VStack space="sm">
                      <Radio size="sm" value="Sim">
                        <RadioIndicator>
                          <RadioIcon as={CircleIcon} />
                        </RadioIndicator>
                        <RadioLabel>Sim</RadioLabel>
                      </Radio>
                      <Radio size="sm" value="Não">
                        <RadioIndicator>
                          <RadioIcon as={CircleIcon} />
                        </RadioIndicator>
                        <RadioLabel>Não</RadioLabel>
                      </Radio>
                    </VStack>
                  </RadioGroup>
                </FormControl>
                <FormControl>
                  <FormControlLabel>
                    <FormControlLabelText>
                      Evacuação últimas 48h:
                    </FormControlLabelText>
                  </FormControlLabel>
                  <RadioGroup
                    value={formData.nutricao.evacuacaoultimas48h || ""}
                    onChange={(value) =>
                      handleCheckboxChange(
                        "nutricao",
                        "evacuacaoultimas48h",
                        value
                      )
                    }
                    className="my-2"
                  >
                    <VStack space="sm">
                      <Radio size="sm" value="Sim">
                        <RadioIndicator>
                          <RadioIcon as={CircleIcon} />
                        </RadioIndicator>
                        <RadioLabel>Sim</RadioLabel>
                      </Radio>
                      <Radio size="sm" value="Não">
                        <RadioIndicator>
                          <RadioIcon as={CircleIcon} />
                        </RadioIndicator>
                        <RadioLabel>Não</RadioLabel>
                      </Radio>
                    </VStack>
                  </RadioGroup>
                </FormControl>
                <View className="my-4">
                  <Text className=" font-bold  mb-2">Ajuste:</Text>
                  <Input>
                    <InputField placeholder="Descreva o ajuste" />
                    <InputSlot>
                      <InputIcon
                        as={EditIcon}
                        className="text-typography-white"
                      />
                    </InputSlot>
                  </Input>
                </View>
                <Divider />
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
