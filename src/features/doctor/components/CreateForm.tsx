import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { AddIcon } from "@/components/ui/icon";
import React from "react";

const CreateForm = () => {
  return (
    <Button
      className="rounded-lg  mb-6"
      variant="outline"
      action="primary"
    >
      <ButtonText>Criar Formulário</ButtonText>
      <ButtonIcon as={AddIcon} />
    </Button>
  );
};

export default CreateForm;
