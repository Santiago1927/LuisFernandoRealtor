// Script de prueba para el formulario de Contacto General (ContactForm)
// Ejecutar desde la terminal: node scripts/testContactForm.js

console.log("🧪 INICIANDO PRUEBAS DEL FORMULARIO DE CONTACTO GENERAL");
console.log("=".repeat(60));

// Datos de prueba válidos
const validContactData = {
  // Información personal
  nombre: "Fernando Martínez",
  correo: "fernando.martinez@email.com",
  telefono: "3187654321",
  asunto: "Consulta sobre servicios inmobiliarios",
  mensaje:
    "Hola, me gustaría obtener más información sobre sus servicios de asesoría inmobiliaria. Estoy interesado en conocer el proceso para evaluar una propiedad que tengo en Medellín.",
};

// Datos de prueba inválidos
const invalidContactData = {
  // Información personal inválida
  nombre: "F", // Muy corto
  correo: "correo-invalido", // Sin @ ni .
  telefono: "12", // Muy corto
  asunto: "", // Vacío
  mensaje: "Hola", // Muy corto
};

// Casos de prueba específicos
const testCases = [
  {
    name: "✅ CASO 1: Datos válidos completos",
    data: validContactData,
    expected: "success",
    description: "Formulario con toda la información correcta",
  },
  {
    name: "❌ CASO 2: Nombre muy corto",
    data: { ...validContactData, nombre: "F" },
    expected: "error",
    description: "Nombre con menos de 2 caracteres",
  },
  {
    name: "❌ CASO 3: Email sin formato válido",
    data: { ...validContactData, correo: "email-sin-formato" },
    expected: "error",
    description: "Email sin @ o sin punto",
  },
  {
    name: "❌ CASO 4: Teléfono muy corto",
    data: { ...validContactData, telefono: "12" },
    expected: "error",
    description: "Teléfono con menos de 7 dígitos",
  },
  {
    name: "❌ CASO 5: Asunto vacío",
    data: { ...validContactData, asunto: "" },
    expected: "error",
    description: "Asunto no especificado",
  },
  {
    name: "❌ CASO 6: Mensaje muy corto",
    data: { ...validContactData, mensaje: "Hola" },
    expected: "error",
    description: "Mensaje con menos de 10 caracteres",
  },
  {
    name: "✅ CASO 7: Consulta sobre avalúo",
    data: {
      nombre: "Patricia González",
      correo: "patricia@email.com",
      telefono: "3201234567",
      asunto: "Avalúo de propiedad",
      mensaje:
        "Necesito información sobre el proceso de avalúo para una casa en Bogotá.",
    },
    expected: "success",
    description: "Consulta específica sobre avalúo",
  },
  {
    name: "✅ CASO 8: Consulta sobre inversión",
    data: {
      nombre: "Diego Ramírez",
      correo: "diego.ramirez@email.com",
      telefono: "3159876543",
      asunto: "Asesoría en inversión inmobiliaria",
      mensaje:
        "Me interesa invertir en bienes raíces en Medellín. ¿Podrían asesorarme sobre las mejores zonas y tipos de propiedad para inversión?",
    },
    expected: "success",
    description: "Consulta sobre inversión inmobiliaria",
  },
  {
    name: "✅ CASO 9: Consulta sobre documentación",
    data: {
      nombre: "Carmen Lucía Herrera",
      correo: "carmen.herrera@email.com",
      telefono: "3186543210",
      asunto: "Documentación legal",
      mensaje:
        "Tengo una propiedad heredada y necesito asesoría sobre los documentos necesarios para ponerla en venta.",
    },
    expected: "success",
    description: "Consulta sobre documentación legal",
  },
  {
    name: "❌ CASO 10: Nombre con números",
    data: { ...validContactData, nombre: "Juan123" },
    expected: "error",
    description: "Nombre con caracteres no válidos",
  },
  {
    name: "❌ CASO 11: Email sin punto",
    data: { ...validContactData, correo: "usuario@dominio" },
    expected: "error",
    description: "Email sin punto en el dominio",
  },
  {
    name: "✅ CASO 12: Mensaje largo válido",
    data: {
      ...validContactData,
      mensaje:
        "Estimados, me dirijo a ustedes para solicitar información detallada sobre los servicios que ofrecen. Estoy particularmente interesado en conocer sobre los procesos de compra y venta de propiedades comerciales, así como los tiempos estimados y costos asociados. Agradezco su atención y quedo atento a su respuesta.",
    },
    expected: "success",
    description: "Mensaje extenso con consulta detallada",
  },
];

// Función para simular validación
function validateContactForm(data) {
  const errors = [];

  // Validar información personal
  if (!data.nombre || data.nombre.length < 2) {
    errors.push("Nombre debe tener al menos 2 caracteres");
  }

  // Validar que el nombre solo contenga letras y espacios
  if (data.nombre && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(data.nombre)) {
    errors.push("Nombre solo puede contener letras y espacios");
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

  if (!data.asunto || data.asunto.trim().length === 0) {
    errors.push("Asunto es obligatorio");
  }

  if (!data.mensaje || data.mensaje.length < 10) {
    errors.push("Mensaje debe tener al menos 10 caracteres");
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

    const result = validateContactForm(testCase.data);
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
  console.log(`📊 RESUMEN DE PRUEBAS - FORMULARIO DE CONTACTO GENERAL`);
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

module.exports = { runTests, validateContactForm, testCases };
