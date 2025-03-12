import { Button, ButtonText } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface NextButtonProps {
  onSubmit: (data: any) => void;
  isPending: boolean;
  isValid: boolean;
}

const NextButton = ({ onSubmit, isPending, isValid }: NextButtonProps) => {
  return (
    <Button
      className="w-full"
      onPress={onSubmit}
      disabled={isPending || !isValid} // Desabilita quando estiver pendente ou inválido
    >
      {isPending ? <Spinner size="small" /> : <ButtonText>Próximo</ButtonText>}
    </Button>
  );
};

export default NextButton;
