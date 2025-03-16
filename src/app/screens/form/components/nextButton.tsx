import { Button, ButtonText } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { View } from "react-native";

interface NextButtonProps {
  onSubmit: () => void;
  isPending: boolean;
}

const NextButton = ({ onSubmit, isPending }: NextButtonProps) => {
  return (
    <View>
      <Button
        size="md"
        variant="solid"
        action="primary"
        className="w-full"
        onPress={onSubmit}
      >
        <ButtonText className="font-bold text-lg">
          {isPending ? <Spinner size="small" /> : "Próximo"}
        </ButtonText>
      </Button>
    </View>
  );
};

export default NextButton;
