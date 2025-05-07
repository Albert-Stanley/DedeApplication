export function isValidDataNascimento(data: string): boolean {
  if (!data) return false;

  const onlyNumbers = data.replace(/\D/g, "");
  if (onlyNumbers.length !== 8) return false;

  const regexData = /^(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[0-2])(\d{4})$/;
  if (!regexData.test(onlyNumbers)) return false;

  const [dia, mes, ano] = [
    onlyNumbers.slice(0, 2),
    onlyNumbers.slice(2, 4),
    onlyNumbers.slice(4, 8),
  ].map(Number);

  const dataNascimento = new Date(ano, mes - 1, dia);

  if (
    dataNascimento.getFullYear() !== ano ||
    dataNascimento.getMonth() + 1 !== mes ||
    dataNascimento.getDate() !== dia
  ) {
    return false;
  }

  const hoje = new Date();
  const idade = hoje.getFullYear() - ano;

  return idade >= 18 && idade <= 120; // Idade entre 18 e 120 anos
}
