import { Button, ButtonText } from "../../../components/ui/button";
import { Spinner } from "../../../components/ui/spinner";
import React from "react";

interface NextButtonProps {
  onPress: () => void;
  isPending?: boolean;
  isDisabled?: boolean;
  title?: string;
}

const NextButton = ({
  onPress,
  isPending = false,
  isDisabled = false,
  title = "Continuar",
}: NextButtonProps) => {
  return (
    <Button
      size="lg"
      variant="solid"
      action="primary"
      onPress={onPress}
      isDisabled={isDisabled || isPending}
      className="mb-4 w-full"
    >
      {isPending ? (
        <Spinner size="small" color="$textLight50" />
      ) : (
        <ButtonText className="font-bold text-lg">{title}</ButtonText>
      )}
      {/* <ButtonIcon as={ChevronRight} /> */}
    </Button>
  );
};

export default NextButton;
