import React from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../../hooks/useAuth"; // Aponte para o arquivo correto

const LogoutButton = () => {
  const { logout } = useAuth(); // Usando o hook do AuthContext
  const router = useRouter(); // Navegação com o 'useRouter' do Next.js (ou outro que você estiver usando)

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
    >
      Sair
    </button>
  );
};

export default LogoutButton;
