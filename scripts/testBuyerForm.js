// Script de prueba para el formulario de Comprador (BuyerForm)
// Ejecutar desde la terminal: node scripts/testBuyerForm.js

console.log("🧪 INICIANDO PRUEBAS DEL FORMULARIO DE COMPRADOR");
console.log("=".repeat(60));

// Datos de prueba válidos
const validBuyerData = {
  // Información personal
  nombre: "Ana María López",
  correo: "ana.lopez@email.com",
  telefono: "3154567890",
  ciudad: "Cali",
  tipoPropiedad: "Apartamento",

  // Información de búsqueda
  habitaciones: 2,
  baños: 2,
  parqueaderos: 1,
  deposito: true,
  formaDePago: "Credito",
  presupuesto: 250000000,

  // Comentarios adicionales
  comentariosAdicionales:
    "Busco apartamento moderno en zona tranquila con buena ubicación.",
};

// Datos de prueba inválidos
const invalidBuyerData = {
  // Información personal inválida
  nombre: "A", // Muy corto
  correo: "correo-sin-formato", // Sin @ ni .
  telefono: "12", // Muy corto
  ciudad: "", // Vacío
  tipoPropiedad: "", // No seleccionado

  // Información de búsqueda inválida
  habitaciones: -1, // Negativo
  baños: -1, // Negativo
  parqueaderos: -1, // Negativo
  presupuesto: 50000, // Muy bajo
};

// Casos de prueba específicos
const testCases = [
  {
    name: "✅ CASO 1: Datos válidos completos",
    data: validBuyerData,
    expected: "success",
    description: "Formulario con toda la información correcta",
  },
  {
    name: "❌ CASO 2: Nombre muy corto",
    data: { ...validBuyerData, nombre: "A" },
    expected: "error",
    description: "Nombre con menos de 2 caracteres",
  },
  {
    name: "❌ CASO 3: Email sin formato válido",
    data: { ...validBuyerData, correo: "email-sin-arroba" },
    expected: "error",
    description: "Email sin @ o sin punto",
  },
  {
    name: "❌ CASO 4: Teléfono muy corto",
    data: { ...validBuyerData, telefono: "123" },
    expected: "error",
    description: "Teléfono con menos de 7 dígitos",
  },
  {
    name: "❌ CASO 5: Ciudad no seleccionada",
    data: { ...validBuyerData, ciudad: "" },
    expected: "error",
    description: "No ha seleccionado ciudad",
  },
  {
    name: "❌ CASO 6: Tipo de propiedad no seleccionado",
    data: { ...validBuyerData, tipoPropiedad: "" },
    expected: "error",
    description: "No ha seleccionado tipo de propiedad",
  },
  {
    name: "❌ CASO 7: Presupuesto muy bajo",
    data: { ...validBuyerData, presupuesto: 50000 },
    expected: "error",
    description: "Presupuesto menor al mínimo",
  },
  {
    name: "✅ CASO 8: Solo campos obligatorios",
    data: {
      nombre: "Carlos Rodríguez",
      correo: "carlos@email.com",
      telefono: "3009876543",
      ciudad: "Pasto",
      tipoPropiedad: "Casa",
      presupuesto: 180000000,
    },
    expected: "success",
    description: "Solo campos mínimos requeridos",
  },
  {
    name: "✅ CASO 9: Búsqueda de lote",
    data: {
      nombre: "Laura Jiménez",
      correo: "laura@email.com",
      telefono: "3201112233",
      ciudad: "Medellín",
      tipoPropiedad: "Lote",
      area: 500,
      formaDePago: "Contado",
      presupuesto: 120000000,
    },
    expected: "success",
    description: "Búsqueda específica para lote",
  },
  {
    name: "✅ CASO 10: Búsqueda de oficina",
    data: {
      nombre: "Roberto Silva",
      correo: "roberto@email.com",
      telefono: "3154445566",
      ciudad: "Bogotá",
      tipoPropiedad: "Oficina",
      area: 80,
      formaDePago: "Credito",
      presupuesto: 200000000,
    },
    expected: "success",
    description: "Búsqueda específica para oficina",
  },
];

// Función para simular validación
function validateBuyerForm(data) {
  const errors = [];

  // Validar información personal
  if (!data.nombre || data.nombre.length < 2) {
    errors.push("Nombre debe tener al menos 2 caracteres");
  }
  if (
    !data.correo ||
    !data.correo.includes("@") ||
    !data.correo.includes(".")
  ) {
    errors.push("Email debe tener formato válido");
  }
  if (!data.telefono || data.telefono.length < 7) {
    errors.push("Teléfono debe tener al menos 7 dígitos");
  }
  if (!data.ciudad) {
    errors.push("Ciudad es obligatoria");
  }
  if (!data.tipoPropiedad) {
    errors.push("Tipo de propiedad es obligatorio");
  }

  // Validar campos numéricos si están presentes
  if (data.habitaciones !== undefined && data.habitaciones < 0) {
    errors.push("Habitaciones no puede ser negativo");
  }
  if (data.baños !== undefined && data.baños < 0) {
    errors.push("Baños no puede ser negativo");
  }
  if (data.parqueaderos !== undefined && data.parqueaderos < 0) {
    errors.push("Parqueaderos no puede ser negativo");
  }
  if (data.area !== undefined && data.area <= 0) {
    errors.push("Área debe ser mayor a 0");
  }

  // Validar presupuesto
  if (data.presupuesto && data.presupuesto < 100000) {
    errors.push("Presupuesto debe ser al menos $100,000 COP");
  }

  return {
    isValid: errors.length === 0,
    errors: errors,
  };
}

// Ejecutar pruebas
function runTests() {
  console.log(`\n📋 Ejecutando ${testCases.length} casos de prueba...\n`);

  let passed = 0;
  let failed = 0;

  testCases.forEach((testCase, index) => {
    console.log(`${testCase.name}`);
    console.log(`   Descripción: ${testCase.description}`);

    const result = validateBuyerForm(testCase.data);
    const success =
      testCase.expected === "success" ? result.isValid : !result.isValid;

    if (success) {
      console.log(`   ✅ PASÓ - Resultado esperado obtenido`);
      passed++;
    } else {
      console.log(`   ❌ FALLÓ - Resultado inesperado`);
      if (result.errors.length > 0) {
        console.log(`   Errores: ${result.errors.join(", ")}`);
      }
      failed++;
    }
    console.log("");
  });

  // Resumen
  console.log("=".repeat(60));
  console.log(`📊 RESUMEN DE PRUEBAS - FORMULARIO DE COMPRADOR`);
  console.log(`✅ Pruebas exitosas: ${passed}`);
  console.log(`❌ Pruebas fallidas: ${failed}`);
  console.log(
    `📈 Porcentaje de éxito: ${Math.round((passed / testCases.length) * 100)}%`
  );
  console.log("=".repeat(60));

  return { passed, failed, total: testCases.length };
}

// Ejecutar si se llama directamente
if (require.main === module) {
  runTests();
}

module.exports = { runTests, validateBuyerForm, testCases };
