export const isValidCPF = (cpf: string) => {
  const onlyNumbers = cpf.replace(/\D/g, ""); // Remove caracteres não numéricos

  if (onlyNumbers.length !== 11) return false;

  // Evita CPFs com todos os dígitos iguais (000.000.000-00, 111.111.111-11, etc.)
  if (/^(\d)\1+$/.test(onlyNumbers)) return false;

  // Cálculo dos dígitos verificadores
  const calcDigit = (slice: string) => {
    let sum = 0;
    for (let i = 0; i < slice.length; i++) {
      sum += parseInt(slice[i]) * (slice.length + 1 - i);
    }
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const firstDigit = calcDigit(onlyNumbers.slice(0, 9));
  const secondDigit = calcDigit(onlyNumbers.slice(0, 10));

  return (
    firstDigit === parseInt(onlyNumbers[9]) &&
    secondDigit === parseInt(onlyNumbers[10])
  );
};
