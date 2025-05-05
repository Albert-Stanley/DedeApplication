import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";

interface BackButtonProps {
  destinationRoute: string;
}

const BackButton = ({ destinationRoute }: BackButtonProps) => {
  const handleBack = () => {
    router.push(destinationRoute);
  };
  return (
    <Button onPress={handleBack} size="md" variant="outline" action="primary">
      <ButtonIcon as={ChevronLeft} />
      <ButtonText className="font-bold text-lg">Voltar</ButtonText>
    </Button>
  );
};

export default BackButton;
