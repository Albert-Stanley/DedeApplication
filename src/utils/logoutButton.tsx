import React from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../hooks/useAuth"; // Aponte para o arquivo correto

const LogoutButton = () => {
  const { logout } = useAuth(); // Usando o hook do AuthContext
  const router = useRouter(); // Navegação com o 'useRouter' do Next.js (ou outro que você estiver usando)

  const handleLogout = async () => {
    await logout(); // Executa a função de logout que limpa o token e o usuário
    // Redireciona o usuário para a página de login após o logout
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
