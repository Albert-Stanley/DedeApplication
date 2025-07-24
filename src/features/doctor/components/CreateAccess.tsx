import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { AddIcon } from "@/components/ui/icon";
import { useRouter } from "expo-router";
import React from "react";

const CreateAccess = () => {
  const router = useRouter();

  const handleCreateAccess = () => {
    router.push("/doctor/CreateAccessKey");
  };

  return (
    <Button
      className="rounded-lg mb-6"
      variant="outline"
      action="primary"
      onPress={handleCreateAccess}
    >
      <ButtonText>Dar acesso</ButtonText>
      <ButtonIcon as={AddIcon} />
    </Button>
  );
};

export default CreateAccess;
