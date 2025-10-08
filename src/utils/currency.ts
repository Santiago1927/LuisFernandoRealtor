/**
 * Formatea un valor numérico a formato de moneda colombiana
 * Ejemplo: 1500000 -> "$1.500.000"
 */
export const formatCurrency = (value: string | number): string => {
  const numericValue =
    typeof value === "string" ? parseFloat(value.replace(/\D/g, "")) : value;

  if (isNaN(numericValue)) return "";

  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(numericValue)
    .replace("COP", "$");
};

/**
 * Extrae solo números de un string con formato de moneda
 * Ejemplo: "$1.500.000" -> "1500000"
 */
export const parseCurrency = (value: string): string => {
  return value.replace(/\D/g, "");
};

/**
 * Formatea un valor mientras se escribe, agregando puntos como separadores de miles
 * Ejemplo: "1500000" -> "$1.500.000"
 */
export const formatCurrencyInput = (value: string): string => {
  // Remover todo excepto números
  const numbers = value.replace(/\D/g, "");

  if (!numbers) return "";

  // Formatear con puntos como separadores de miles
  const formatted = numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `$${formatted}`;
};

/**
 * Hook personalizado para manejar el formateo de campos de moneda
 */
export const useCurrencyInput = (
  value: string,
  onChange: (value: string) => void
) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numericValue = parseCurrency(inputValue);
    onChange(numericValue);
  };

  const displayValue = formatCurrencyInput(value);

  return {
    value: displayValue,
    onChange: handleChange,
  };
};
