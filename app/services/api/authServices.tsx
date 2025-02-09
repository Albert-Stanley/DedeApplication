export interface UserData {
  Name: string;
  Email: string;
  Role: "Doctor" | "Secretary";
  CRM?: string;
  Password: string;
  HospitalName: string;
  UF: string;
}

const API_URL = "http://192.168.160.1/Users";

export const signup = async (userData: UserData): Promise<any> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao cadastrar:", error);
    throw error;
  }
};
