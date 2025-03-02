import React from "react";
import {
  Modal,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, ButtonIcon, ButtonText } from "../ui/button";
import { VStack } from "../ui/vstack";
import { CircleX } from "lucide-react-native";
import { Box } from "../ui/box";

interface TermsModalProps {
  visible: boolean;
  onClose: () => void;
  contentType: "termos" | "politica";
}

const TERMS_TEXT = `
📜 Termos de Uso
1. Introdução
Bem-vindo ao nosso aplicativo! Ao utilizar nossos serviços, você concorda com os seguintes termos. Caso não concorde, por favor, não utilize o aplicativo.

2. Uso do Aplicativo
- O uso deste aplicativo deve estar em conformidade com as leis locais.
- Você não pode utilizar nossos serviços para atividades ilegais ou não autorizadas.
- Qualquer tentativa de invasão, engenharia reversa ou uso indevido resultará no bloqueio da conta.

3. Responsabilidades do Usuário
- Você é responsável por manter suas credenciais de acesso seguras.
- Qualquer atividade realizada com sua conta será de sua responsabilidade.

4. Modificações nos Termos
Podemos atualizar estes termos a qualquer momento. Recomendamos que você revise periodicamente para se manter informado.
`;

const POLICY_TEXT = `
🔒 Política de Privacidade
1. Coleta de Dados
Coletamos informações básicas para melhorar sua experiência, incluindo:
- Nome, e-mail e outras informações fornecidas no cadastro.
- Dados de uso para aprimorar nossos serviços.

2. Uso das Informações
Suas informações podem ser utilizadas para:
- Melhorar a experiência do usuário.
- Personalizar conteúdos e notificações.
- Garantir a segurança da plataforma.

3. Compartilhamento de Dados
Seus dados não serão vendidos. Podemos compartilhá-los apenas:
- Quando exigido por lei.
- Com parceiros que ajudam a melhorar nossos serviços (exemplo: provedores de análise).

4. Segurança
Tomamos medidas para proteger suas informações, mas não podemos garantir 100% de segurança.

5. Seus Direitos
Você pode solicitar a exclusão ou alteração dos seus dados entrando em contato conosco.
`;

const TermsModal: React.FC<TermsModalProps> = ({
  visible,
  onClose,
  contentType,
}) => {
  const content = contentType === "termos" ? TERMS_TEXT : POLICY_TEXT;

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      animationType="fade"
      transparent
    >
      <View className="flex-1 justify-center items-center bg-black/80 p-4">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="w-full max-w-lg"
        >
          <SafeAreaView className="w-full max-h-[80%] bg-gray-900 p-6 rounded-2xl shadow-xl border border-gray-700">
            <VStack className="space-y-4 items-center ">
              <Text className="text-xl font-bold text-center text-white">
                {contentType === "termos"
                  ? "Termos de Uso"
                  : "Política de Privacidade"}
              </Text>
              <View className="h-64 w-full border border-gray-600 rounded-lg overflow-hidden bg-gray-800 p-2">
                <ScrollView
                  className="h-full w-full"
                  showsVerticalScrollIndicator={true}
                  contentContainerStyle={{ paddingBottom: 20 }}
                  scrollIndicatorInsets={{ right: 1 }}
                  persistentScrollbar={true}
                >
                  <Text className="text-base text-gray-300 p-1 -mt-3 leading-6">
                    {content}
                  </Text>
                </ScrollView>
              </View>
              <Box>
                <Button
                  variant="solid"
                  action="secondary"
                  size="md"
                  onPress={onClose}
                  className="mt-4 bg-gray-700 rounded-lg "
                >
                  <ButtonText className="text-white text-lg font-semibold">
                    Fechar
                  </ButtonText>
                  <ButtonIcon as={CircleX} className="ml-2 text-white" />
                </Button>
              </Box>
            </VStack>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default TermsModal;
