const authLogin = async (data: { email: string; password: string }) => {
  try {
    const response = await fetch("http://192.168.160.1/Auth", {
      method: "POST",
      body: JSON.stringify({
        CRMorEmail: data.email,
        Password: data.password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }

    return await response.json(); // Retorna os dados corretamente
  } catch (error) {
    return { success: false, message: "Usuário ou senha incorretos." };
  }
};

export default authLogin;
