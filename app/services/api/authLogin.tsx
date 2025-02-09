const fechDataLogin = async () => {
  try {
    const response = await fetch("http://192.168.160.1/Auth", {
      method: "POST",
      body: JSON.stringify({
        CRMorEmail: "287637",
        Password: "Lorenzo05*",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }

    const data = await response.json();
    console.log("Dados recebidos:", data);
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
};

export default { fechDataLogin };
