// Guía de pruebas manuales para formularios de email
// Este documento explica cómo probar manualmente el envío real de emails

console.log("📋 GUÍA DE PRUEBAS MANUALES DE FORMULARIOS");
console.log("=".repeat(50));

const instructions = {
  setup: {
    title: "🔧 CONFIGURACIÓN PREVIA",
    steps: [
      "1. Asegúrate de que el servidor esté ejecutándose: npm run dev",
      "2. Abre http://localhost:3000 en tu navegador",
      "3. Confirma que RESEND_API_KEY esté en .env.local (✅ Ya configurada)",
      "4. Ten abierta tu bandeja de entrada para verificar recepción",
    ],
  },

  ownerForm: {
    title: "🏠 PRUEBAS FORMULARIO DE PROPIETARIO",
    url: "http://localhost:3000/contacto (pestaña 'SOY PROPIETARIO')",
    testCases: [
      {
        name: "Caso 1: Apartamento completo",
        data: {
          "Primera pregunta": "Sí",
          "Segunda pregunta": "Sí",
          Nombre: "María Elena Rodríguez",
          Correo: "test.propietario1@email.com",
          Teléfono: "3145678901",
          Ciudad: "Medellín",
          "Tipo de propiedad": "Apartamento",
          Dirección: "Carrera 43A #15-20, El Poblado",
          Edad: "3",
          "Área construida": "95",
          Habitaciones: "2",
          Baños: "2",
          Piso: "12",
          Parqueadero: "✓ Sí → Cantidad: 1, Área: 12",
          Terraza: "✓ Sí → Área: 25",
          Patio: "No",
          Administración: "✓ Sí → Valor: 320000",
          "Valor aproximado": "380000000",
          Comentarios: "Apartamento premium con vista panorámica",
        },
      },
      {
        name: "Caso 2: Casa familiar",
        data: {
          "Primera pregunta": "Sí",
          "Segunda pregunta": "Sí",
          Nombre: "Carlos Andrés Mejía",
          Correo: "test.propietario2@email.com",
          Teléfono: "3012345678",
          Ciudad: "Envigado",
          "Tipo de propiedad": "Casa",
          Dirección: "Calle 35 Sur #45-67, La Paz",
          Habitaciones: "4",
          Baños: "3",
          Parqueadero: "✓ Sí → Cantidad: 2, Área: 30",
          Patio: "✓ Sí → Área: 45",
          "Valor aproximado": "520000000",
        },
      },
    ],
  },

  buyerForm: {
    title: "🏪 PRUEBAS FORMULARIO DE COMPRADOR",
    url: "http://localhost:3000/contacto (pestaña 'SOY COMPRADOR')",
    testCases: [
      {
        name: "Caso 1: Joven profesional",
        data: {
          Nombre: "Alejandra Morales",
          Correo: "test.comprador1@email.com",
          Teléfono: "3187654321",
          Ciudad: "Medellín",
          "Tipo de propiedad": "Apartamento",
          Presupuesto: "350000000",
          Habitaciones: "2",
          Baños: "2",
          "Área mínima": "70",
          "Área máxima": "100",
          Comentarios: "Busco apartamento cerca al metro",
        },
      },
      {
        name: "Caso 2: Familia con niños",
        data: {
          Nombre: "Roberto y Patricia Hernández",
          Correo: "test.comprador2@email.com",
          Teléfono: "3209876543",
          Ciudad: "Envigado",
          "Tipo de propiedad": "Casa",
          Presupuesto: "550000000",
          Habitaciones: "4",
          Baños: "3",
          Comentarios: "Casa con patio para niños",
        },
      },
    ],
  },

  contactForm: {
    title: "📧 PRUEBAS FORMULARIO DE CONTACTO",
    url: "http://localhost:3000/contacto (pestaña 'CONTACTO')",
    testCases: [
      {
        name: "Caso 1: Consulta avalúo",
        data: {
          Nombre: "Juliana Restrepo",
          Correo: "test.contacto1@email.com",
          Teléfono: "3198765432",
          Asunto: "Consulta sobre avalúo comercial",
          Mensaje:
            "Necesito avalúo de apartamento en El Poblado. Información sobre costos y tiempos por favor.",
        },
      },
      {
        name: "Caso 2: Inversión",
        data: {
          Nombre: "Eduardo Ramírez",
          Correo: "test.contacto2@email.com",
          Teléfono: "3156789012",
          Asunto: "Oportunidades de inversión",
          Mensaje:
            "Inversionista busca propiedades con potencial de valorización en Valle de Aburrá.",
        },
      },
    ],
  },

  verification: {
    title: "✅ VERIFICACIÓN DE RESULTADOS",
    steps: [
      "1. Confirma que cada formulario muestre mensaje de éxito",
      "2. Verifica que lleguen emails a davidandradesantacruz9.3@gmail.com",
      "3. Revisa que los asuntos sean correctos:",
      "   - Propietario: '🏘️ Nueva propiedad para vender - [Tipo]'",
      "   - Comprador: '🏠 Nueva consulta de comprador - [Nombre]'",
      "   - Contacto: '💌 Nuevo mensaje de contacto - [Asunto]'",
      "4. Confirma que el contenido del email sea completo y formateado",
      "5. Verifica que no haya errores en la consola del navegador",
    ],
  },
};

// Mostrar las instrucciones
Object.values(instructions).forEach((section) => {
  console.log(`\n${section.title}`);
  console.log("-".repeat(section.title.length - 2));

  if (section.url) {
    console.log(`🌐 URL: ${section.url}\n`);
  }

  if (section.steps) {
    section.steps.forEach((step) => console.log(`   ${step}`));
  }

  if (section.testCases) {
    section.testCases.forEach((testCase, index) => {
      console.log(`\n   📋 ${testCase.name}:`);
      Object.entries(testCase.data).forEach(([field, value]) => {
        console.log(`      • ${field}: ${value}`);
      });
    });
  }
});

console.log("\n" + "=".repeat(50));
console.log("🎯 RESUMEN DE PRUEBAS A REALIZAR");
console.log("=".repeat(50));
console.log("📊 Total de casos de prueba: 6");
console.log("   🏠 Propietario: 2 casos");
console.log("   🏪 Comprador: 2 casos");
console.log("   📧 Contacto: 2 casos");
console.log("");
console.log("⏱️ Tiempo estimado: 15-20 minutos");
console.log("📧 Emails esperados: 6 emails");
console.log("");
console.log("💡 TIPS IMPORTANTES:");
console.log("   • Usa emails de prueba (test.*@email.com)");
console.log("   • Revisa que los campos condicionales aparezcan/desaparezcan");
console.log("   • Confirma validaciones (ej: campos obligatorios)");
console.log("   • Verifica que la bandeja de entrada reciba todos los emails");
console.log("=".repeat(50));
