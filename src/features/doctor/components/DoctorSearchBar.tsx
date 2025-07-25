import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField, InputSlot, InputIcon } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { Search, User, X } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useSearchPatients } from "../services/doctorService";
import { UI_CONFIG } from "../constants";
import type { Patient } from "../types";

const DoctorSearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const router = useRouter();
  const searchMutation = useSearchPatients();

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, UI_CONFIG.SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [query]);

  // Execute search when debounced query changes
  useEffect(() => {
    if (debouncedQuery.trim().length >= 2) {
      searchMutation.mutate(debouncedQuery);
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [debouncedQuery]);

  const handlePatientSelect = (patient: Patient) => {
    setQuery("");
    setIsOpen(false);
    router.push(`/doctor/patients/${patient.id}`);
  };

  const clearSearch = () => {
    setQuery("");
    setIsOpen(false);
  };

  const results = searchMutation.data || [];

  return (
    <Box className="relative w-full">
      {/* Search Input */}
      <Card className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl">
        <Box className="p-3">
          <Input size="lg" className="bg-transparent border-0 focus:border-0">
            <InputSlot className="pl-3">
              <InputIcon
                as={Search}
                className="text-gray-400 dark:text-gray-500"
              />
            </InputSlot>
            <InputField
              placeholder="Buscar pacientes por nome, CPF..."
              value={query}
              onChangeText={setQuery}
              onFocus={() => {
                if (debouncedQuery.trim().length >= 2) {
                  setIsOpen(true);
                }
              }}
              className="text-gray-700 dark:text-gray-200"
            />
            {query.length > 0 && (
              <InputSlot className="pr-3">
                <TouchableOpacity
                  onPress={clearSearch}
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <InputIcon
                    as={X}
                    className="text-gray-400 dark:text-gray-500"
                  />
                </TouchableOpacity>
              </InputSlot>
            )}
          </Input>
        </Box>
      </Card>

      {/* Search Results Dropdown */}
      {isOpen && (
        <Card className="absolute top-full left-0 right-0 mt-2 max-h-64 shadow-xl border border-gray-200 dark:border-gray-700 rounded-xl z-[9999] bg-white dark:bg-gray-800">
          <VStack className="overflow-hidden rounded-xl">
            {searchMutation.isPending ? (
              <Box className="p-4">
                <Text className="text-center text-gray-500 dark:text-gray-400">
                  Buscando...
                </Text>
              </Box>
            ) : results.length > 0 ? (
              <>
                {results.map((patient, index) => (
                  <TouchableOpacity
                    key={patient.id}
                    onPress={() => handlePatientSelect(patient)}
                    className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                      index !== results.length - 1
                        ? "border-b border-gray-100 dark:border-gray-700"
                        : ""
                    }`}
                  >
                    <HStack space="md" className="items-center">
                      <Box className="bg-primary-100 dark:bg-primary-900 p-2 rounded-full">
                        <User
                          className="text-primary-600 dark:text-primary-400"
                          size={16}
                        />
                      </Box>
                      <VStack className="flex-1">
                        <Text className="text-gray-900 dark:text-gray-100 font-medium">
                          {patient.name}
                        </Text>
                        <Text className="text-gray-500 dark:text-gray-400 text-sm">
                          CPF: {patient.cpf}
                        </Text>
                      </VStack>
                      <Box
                        className={`px-3 py-1 rounded-full ${
                          patient.formStatus === "completed"
                            ? "bg-green-100 dark:bg-green-900"
                            : patient.formStatus === "in_progress"
                            ? "bg-yellow-100 dark:bg-yellow-900"
                            : "bg-red-100 dark:bg-red-900"
                        }`}
                      >
                        <Text
                          className={`text-xs font-medium ${
                            patient.formStatus === "completed"
                              ? "text-green-700 dark:text-green-300"
                              : patient.formStatus === "in_progress"
                              ? "text-yellow-700 dark:text-yellow-300"
                              : "text-red-700 dark:text-red-300"
                          }`}
                        >
                          {patient.formStatus === "completed"
                            ? "Concluído"
                            : patient.formStatus === "in_progress"
                            ? "Em andamento"
                            : "Pendente"}
                        </Text>
                      </Box>
                    </HStack>
                  </TouchableOpacity>
                ))}
              </>
            ) : (
              <Box className="p-4">
                <Text className="text-center text-gray-500 dark:text-gray-400">
                  {debouncedQuery.trim().length < 2
                    ? "Digite pelo menos 2 caracteres para buscar"
                    : "Nenhum paciente encontrado"}
                </Text>
              </Box>
            )}
          </VStack>
        </Card>
      )}
    </Box>
  );
};

export default DoctorSearchBar;
