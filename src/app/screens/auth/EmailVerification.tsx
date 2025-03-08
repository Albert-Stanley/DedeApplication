import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth"; // Importe o hook que você criou
import { Alert, TextInput, Button, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import GoBackArrow from "@/components/common/goBackArrow";
import { VStack } from "@/components/ui/vstack";
import { Box, Mail } from "lucide-react-native";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";

const EmailVerificationScreen = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const { handleEmailVerification } = useAuth(); // Usando o hook de autenticação
  const router = useRouter();

  const onVerify = async () => {
    try {
      const verificationSuccess = await handleEmailVerification(
        verificationCode
      );

      if (verificationSuccess) {
        Alert.alert(
          "Verificação concluída!",
          "Seu e-mail foi verificado com sucesso."
        );
        router.push("/screens/auth/Login"); // Redireciona para a tela de login
      } else {
        Alert.alert("Erro", "Código de verificação inválido. Tente novamente.");
      }
    } catch (error) {
      Alert.alert(
        "Erro",
        "Ocorreu um erro ao verificar o código. Tente novamente."
      );
      console.error("Erro na verificação:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background-50">
      <GoBackArrow />
      <Box className="flex-1 justify-center items-center px-4">
        <VStack space="lg" className="w-full max-w-lg p-6">
          {/* // value={verificationCode}
          // onChangeText={setVerificationCode}
     
          <Button title="Verificar" onPress={onVerify} /> */}
        </VStack>
      </Box>
    </SafeAreaView>
  );
};

export default EmailVerificationScreen;
