import { Button, ButtonText } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { View } from "react-native";

interface NextButtonProps {
  onSubmit: () => void;
  isPending: boolean;
  isValid: boolean;
}

const NextButton = ({ onSubmit, isPending, isValid }: NextButtonProps) => {
  return (
    <View>
      <Button
        size="md"
        variant="outline"
        action="positive"
        className="w-full"
        onPress={onSubmit}
        isDisabled={isPending || !isValid} // Desabilita quando estiver pendente ou inválido
      >
        <ButtonText className="font-bold text-lg">
          {isPending ? <Spinner size="small" /> : "Próximo"}
        </ButtonText>
      </Button>
    </View>
  );
};

export default NextButton;
