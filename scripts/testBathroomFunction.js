// Simulación de la función renderSafeBathrooms
function renderSafeBathrooms(bathroomsValue) {
  // Si no existe, retorna 0
  if (!bathroomsValue && bathroomsValue !== 0) return 0;

  let cleanValue = bathroomsValue;

  // Si es string, intentar convertir a número
  if (typeof bathroomsValue === "string") {
    cleanValue = bathroomsValue.trim();

    // Si es string vacío, retorna 0
    if (cleanValue === "") return 0;

    // Convertir a número
    cleanValue = parseInt(cleanValue, 10);

    // Si no es un número válido, retorna 0
    if (isNaN(cleanValue)) return 0;
  }

  // Si ya es número
  if (typeof cleanValue === "number") {
    // Si es NaN, retorna 0
    if (isNaN(cleanValue)) return 0;

    // Si es mayor a 20, probablemente es un error (como 30 en lugar de 3)
    // Dividir por 10 si es mayor a 20
    if (cleanValue > 20) {
      cleanValue = Math.floor(cleanValue / 10);
    }

    // Asegurar que esté en rango razonable (0-20)
    cleanValue = Math.max(0, Math.min(20, cleanValue));

    return cleanValue;
  }

  // Si llegamos aquí, retorna 0
  return 0;
}

// Pruebas
console.log("🧪 Probando función renderSafeBathrooms:");
console.log("");

console.log("Caso problemático: 30 baños → ", renderSafeBathrooms(30)); // Debería ser 3
console.log("Caso normal: 3 baños → ", renderSafeBathrooms(3)); // Debería ser 3
console.log('Caso string: "30" → ', renderSafeBathrooms("30")); // Debería ser 3
console.log('Caso string: "3" → ', renderSafeBathrooms("3")); // Debería ser 3
console.log("Caso null: null → ", renderSafeBathrooms(null)); // Debería ser 0
console.log("Caso undefined: undefined → ", renderSafeBathrooms(undefined)); // Debería ser 0
console.log('Caso string vacío: "" → ', renderSafeBathrooms("")); // Debería ser 0
console.log("Caso 0: 0 → ", renderSafeBathrooms(0)); // Debería ser 0
console.log("Caso muy alto: 99 → ", renderSafeBathrooms(99)); // Debería ser 9

console.log("");
console.log("✅ La función debería convertir 30 → 3 correctamente");
