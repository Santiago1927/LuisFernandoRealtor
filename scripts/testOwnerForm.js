// Script de prueba para el formulario de Propietario (OwnerForm)
// Ejecutar desde la terminal: node scripts/testOwnerForm.js

console.log("🧪 INICIANDO PRUEBAS DEL FORMULARIO DE PROPIETARIO");
console.log("=".repeat(60));

// Datos de prueba válidos
const validOwnerData = {
  // Preguntas iniciales
  firstQuestion: "true",
  secondQuestion: "true",

  // Información personal
  nombre: "Juan Carlos Pérez",
  correo: "juan.perez@email.com",
  telefono: "3214223931",
  ciudad: "Medellín",
  tipoPropiedad: "Apartamento",

  // Información de la propiedad
  direccion: "Carrera 45 #23-45, El Poblado",
  edadPropiedad: 5,
  areaConstruida: 120,
  habitaciones: 3,
  baños: 2,
  piso: 8,

  // Checkboxes opcionales
  estudio: false,
  deposito: true,
  balcon: true,
  vigilancia: true,
  piscina: true,

  // Parqueadero con campos condicionales
  tieneParqueadero: true,
  numeroParqueaderos: 2,
  areaParqueadero: 25,

  // Terraza con campos condicionales
  tieneTerraza: true,
  areaTerraza: 15,

  // Patio con campos condicionales
  tienePatio: false,

  // Administración con campos condicionales
  tieneAdministracion: true,
  valorAdministracion: 250000,

  // Información financiera
  valorAproximado: 450000000,
  situacionJuridica: "Escritura pública registrada",

  // Comentarios adicionales
  comentariosAdicionales:
    "Apartamento en excelente estado, vista panorámica de la ciudad.",
};

// Datos de prueba inválidos
const invalidOwnerData = {
  // Preguntas iniciales incorrectas
  firstQuestion: "false", // Debería ser "true"
  secondQuestion: "false", // Debería ser "true"

  // Información personal inválida
  nombre: "J", // Muy corto
  correo: "correo-invalido", // Formato incorrecto
  telefono: "123", // Muy corto
  ciudad: "", // Vacío
  tipoPropiedad: "", // No seleccionado

  // Información de propiedad inválida
  direccion: "", // Vacío
  edadPropiedad: -1, // Negativo
  areaConstruida: 0, // Cero
  habitaciones: -1, // Negativo
  baños: 0, // Cero (pero podría ser válido)

  // Campos condicionales problemáticos
  tieneParqueadero: true,
  numeroParqueaderos: 0, // Debería ser >= 1 si tiene parqueadero
  areaParqueadero: 0, // Debería ser > 0 si tiene parqueadero

  tieneTerraza: true,
  areaTerraza: 0, // Debería ser > 0 si tiene terraza

  tienePatio: true,
  areaPatio: 0, // Debería ser > 0 si tiene patio

  tieneAdministracion: true,
  valorAdministracion: 0, // Debería ser > 0 si tiene administración

  valorAproximado: 500000, // Menor al mínimo requerido
};

// Casos de prueba específicos
const testCases = [
  {
    name: "✅ CASO 1: Datos válidos completos",
    data: validOwnerData,
    expected: "success",
    description: "Formulario con toda la información correcta",
  },
  {
    name: "❌ CASO 2: Preguntas iniciales incorrectas",
    data: { ...validOwnerData, firstQuestion: "false" },
    expected: "error",
    description: "No quiere vender rápidamente",
  },
  {
    name: "❌ CASO 3: Email inválido",
    data: { ...validOwnerData, correo: "email-invalido" },
    expected: "error",
    description: "Formato de email incorrecto",
  },
  {
    name: "❌ CASO 4: Parqueadero marcado sin cantidad",
    data: {
      ...validOwnerData,
      tieneParqueadero: true,
      numeroParqueaderos: 0,
      areaParqueadero: 0,
    },
    expected: "error",
    description: "Tiene parqueadero pero no especifica cantidad ni área",
  },
  {
    name: "❌ CASO 5: Terraza marcada sin área",
    data: {
      ...validOwnerData,
      tieneTerraza: true,
      areaTerraza: 0,
    },
    expected: "error",
    description: "Tiene terraza pero no especifica área",
  },
  {
    name: "✅ CASO 6: Solo campos obligatorios",
    data: {
      firstQuestion: "true",
      secondQuestion: "true",
      nombre: "María González",
      correo: "maria@email.com",
      telefono: "3001234567",
      ciudad: "Bogotá",
      tipoPropiedad: "Casa",
      direccion: "Calle 123 #45-67",
      valorAproximado: 300000000,
      situacionJuridica: "Escritura pública",
    },
    expected: "success",
    description: "Solo campos mínimos requeridos",
  },
];

// Función para simular validación
function validateOwnerForm(data) {
  const errors = [];

  // Validar preguntas iniciales
  if (data.firstQuestion !== "true") {
    errors.push("Debe querer vender rápidamente");
  }
  if (data.secondQuestion !== "true") {
    errors.push("Debe aceptar precio de mercado");
  }

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

  // Validar información de propiedad
  if (!data.direccion) {
    errors.push("Dirección es obligatoria");
  }

  // Validar campos condicionales
  if (data.tieneParqueadero === true) {
    if (!data.numeroParqueaderos || data.numeroParqueaderos <= 0) {
      errors.push("Número de parqueaderos es obligatorio");
    }
    if (!data.areaParqueadero || data.areaParqueadero <= 0) {
      errors.push("Área del parqueadero es obligatoria");
    }
  }

  if (data.tieneTerraza === true) {
    if (!data.areaTerraza || data.areaTerraza <= 0) {
      errors.push("Área de la terraza es obligatoria");
    }
  }

  if (data.tienePatio === true) {
    if (!data.areaPatio || data.areaPatio <= 0) {
      errors.push("Área del patio es obligatoria");
    }
  }

  if (data.tieneAdministracion === true) {
    if (!data.valorAdministracion || data.valorAdministracion <= 0) {
      errors.push("Valor de administración es obligatorio");
    }
  }

  // Validar valor aproximado mínimo
  if (data.valorAproximado && data.valorAproximado < 1000000) {
    errors.push("Valor debe ser al menos $1,000,000 COP");
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

    const result = validateOwnerForm(testCase.data);
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
  console.log(`📊 RESUMEN DE PRUEBAS - FORMULARIO DE PROPIETARIO`);
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

module.exports = { runTests, validateOwnerForm, testCases };
