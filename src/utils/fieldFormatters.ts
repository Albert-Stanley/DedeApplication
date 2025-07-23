// Função para formatar o CRM, removendo qualquer caractere não numérico e garantindo que o valor tenha no máximo 10 caracteres
export const formatCRM = (value: string) => {
  const onlyNumbers = value.replace(/\D/g, "");
  return onlyNumbers.slice(0, 10); // Limita o CRM a 10 caracteres
};

// Função para formatar o RG, removendo qualquer caractere não numérico e garantindo que o valor tenha no máximo 9 caracteres
export const formatRG = (value: string) => {
  const onlyNumbers = value.replace(/\D/g, "");
  return onlyNumbers.slice(0, 9); // Limita o RG a 9 caracteres
};

// Função para formatar o CPF, removendo qualquer caractere não numérico e garantindo que o valor tenha no máximo 11 caracteres
export const formatCPF = (value: string) => {
  const onlyNumbers = value.replace(/\D/g, "");
  const formatted = onlyNumbers
    .slice(0, 11)
    .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  return formatted;
};

// Função para formatar o CNPJ, removendo qualquer caractere não numérico e garantindo que o valor tenha no máximo 14 caracteres
export const formatCNPJ = (value: string) => {
  const onlyNumbers = value.replace(/\D/g, "");
  const formatted = onlyNumbers
    .slice(0, 14)
    .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
  return formatted;
};

// Função para formatar a Data de Nascimento, removendo qualquer caractere não numérico e garantindo que o valor tenha no máximo 8 caracteres
export const formatDataNascimento = (value: string) => {
  const onlyNumbers = value.replace(/\D/g, "");
  const formatted = onlyNumbers
    .slice(0, 8)
    .replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");
  return formatted;
};
