export function formatMoney(amount: number, currency = "USD"): string {
  if (Number.isNaN(amount)) throw new Error("amount inválido");
  if (!Number.isFinite(amount)) throw new Error("amount inválido");

  // Redondeo a 2 decimales
  const fixed = amount.toFixed(2);

  // Formato simple, sin i18n para el ejercicio
  return `${currency} ${fixed}`;
}