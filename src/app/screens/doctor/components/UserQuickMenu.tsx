import { Button, ButtonIcon } from "@/components/ui/button";
import {
  Menu,
  MenuItem,
  MenuItemLabel,
  MenuSeparator,
} from "@/components/ui/menu";
import { Icon, MenuIcon, PhoneIcon, SettingsIcon } from "@/components/ui/icon";
import {
  Headset,
  HelpCircleIcon,
  LifeBuoy,
  MessageSquare,
  User,
} from "lucide-react-native";
import { useRouter } from "expo-router";

const UserQuickMenu = () => {
  const router = useRouter();

  const goProfile = () => {
    router.push("/screens/doctor/Profile");
  };
  return (
    <Menu
      offset={5}
      trigger={({ ...triggerProps }) => {
        return (
          <Button {...triggerProps} size="xs">
            <ButtonIcon as={MenuIcon} size="md" />
          </Button>
        );
      }}
    >
      <MenuItem
        onPress={goProfile}
        key="Perfil"
        textValue="Perfil"
        className="p-2"
      >
        <Icon as={User} size="lg" className="mr-2" />
        <MenuItemLabel size="md">Meu Perfil</MenuItemLabel>
      </MenuItem>
      <MenuItem
        key="Configurações"
        textValue="Configurações"
        className="p-2 web:min-w-[294px] min-w-[225px]"
      >
        <Icon as={SettingsIcon} size="md" className="mr-2" />
        <MenuItemLabel size="md">Configurações</MenuItemLabel>
      </MenuItem>

      <MenuSeparator />
      <MenuItem
        key="Ajuda e Suporte"
        textValue="Ajuda e Suporte"
        className="p-2"
      >
        <Icon as={Headset} size="md" className="mr-2" />
        <MenuItemLabel size="md">Ajuda e Suporte</MenuItemLabel>
      </MenuItem>

      <MenuItem
        key="Enviar Feedback"
        textValue="Enviar Feedback"
        className="p-2"
      >
        <Icon as={MessageSquare} size="md" className="mr-2" />
        <MenuItemLabel size="md">Enviar Feedback</MenuItemLabel>
      </MenuItem>
    </Menu>
  );
};

export default UserQuickMenu;
