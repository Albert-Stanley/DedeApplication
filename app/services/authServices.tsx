const fetchDataCadastro = async () => {
  try {
    const response = await fetch("http://192.168.160.1/Users", {
      method: "POST",
      body: JSON.stringify({
        Name: "Nicholas Peixoto",
        Email: "lorenzomendes@magma3.com.br",
        Role: "Doctor",
        CRM: "806722",
        Password: "Lorenzo05*",
        HospitalName: "HospitalABC",
        UF: "Rj",
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

export default { fetchDataCadastro };
