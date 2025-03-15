import { useState, useCallback } from "react";
import { Platform, TouchableOpacity, View, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useController } from "react-hook-form";

// Componente de DatePicker
const DatePicker = ({
  name,
  control,
  errors,
  label,
  placeholder,
  ...props
}: any) => {
  const { field, fieldState } = useController({ name, control });
  const [showPicker, setShowPicker] = useState(false);

  // Função para lidar com a seleção da data
  const handleDateChange = useCallback(
    (event: any, date?: Date) => {
      if (date) {
        const newDate = new Date(date);
        newDate.setHours(0, 0, 0, 0); // Remove a hora, minuto, segundo e milissegundo
        field.onChange(newDate); // Atualiza o valor no formulário
      }
      setShowPicker(false);
    },
    [field]
  );

  // Picker para Web
  if (Platform.OS === "web") {
    return (
      <View>
        {label && <Text>{label}</Text>}
        <input
          {...props}
          type="date"
          value={
            field.value ? new Date(field.value).toISOString().split("T")[0] : ""
          }
          onChange={(e) => field.onChange(new Date(e.target.value))}
        />
        {fieldState?.error && (
          <Text style={{ color: "red" }}>{fieldState.error.message}</Text>
        )}
      </View>
    );
  }

  // Picker para Mobile
  return (
    <View>
      {label && <Text>{label}</Text>}
      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <View>
          <Text>
            {field.value
              ? new Date(field.value).toLocaleDateString("pt-BR")
              : placeholder}
          </Text>
        </View>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={field.value || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {fieldState?.error && (
        <Text style={{ color: "red" }}>{fieldState.error.message}</Text>
      )}
    </View>
  );
};

export default DatePicker;
