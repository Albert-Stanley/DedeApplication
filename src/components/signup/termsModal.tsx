import React from "react";
import { Modal, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, ButtonText } from "../ui/button";
import { VStack } from "../ui/vstack";
import { Text } from "../ui/text";

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
  return (
    <Modal visible={visible} onRequestClose={onClose} animationType="fade">
      <View className="flex-1 bg-black justify-center items-center">
        <SafeAreaView className="w-11/12 max-h-[80%] bg-background p-6 rounded-2xl shadow-lg">
          <VStack className="space-y-4 items-center">
            <Text className="text-xl font-bold text-white text-center">
              {contentType === "termos"
                ? "Termos de Uso"
                : "Política de Privacidade"}
            </Text>
            <ScrollView className="max-h-[60vh]">
              <Text className="text-base text-white text-center">
                {contentType === "termos" ? TERMS_TEXT : POLICY_TEXT}
              </Text>
            </ScrollView>
            <Button onPress={onClose} className="mt-4 bg-primary w-full">
              <ButtonText className="text-white">Fechar</ButtonText>
            </Button>
          </VStack>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

export default TermsModal;
