// 🤖 SCRIPT DE AUTO-RELLENO Y ENVÍO DE FORMULARIOS DE CONTACTO
// Este script rellena automáticamente los 3 formularios de /contacto y los envía

console.log("🤖 INICIANDO AUTO-RELLENO DE FORMULARIOS DE CONTACTO");
console.log("=".repeat(70));

// Datos de prueba para cada formulario
const testData = {
  owner: {
    name: "Juan Propietario",
    email: "juan.propietario@test.com",
    phone: "3001234567",
    city: "MEDELLIN",
    propertyType: "CASA",
    address: "Calle 123 #45-67",
    propertyAge: "5",
    builtArea: "120",
    rooms: "3",
    bathrooms: "2",
    approximateValue: "500000000",
    legalSituation: "LISTA_PARA_ESCRITURAR",
    comments: "Propiedad en excelente estado, lista para venta inmediata",
  },
  buyer: {
    name: "María Compradora",
    email: "maria.compradora@test.com",
    phone: "3009876543",
    city: "BOGOTA",
    propertyType: "APARTAMENTO",
    budget: "300000000",
    paymentMethod: "CREDITO_HIPOTECARIO_LEASING",
    preferredAreas: "Zona Norte, Chapinero",
    rooms: "2",
    bathrooms: "2",
    comments:
      "Busco apartamento moderno en zona tranquila con fácil acceso al transporte",
  },
  contact: {
    name: "Carlos Consultor",
    email: "carlos.consultor@test.com",
    phone: "3005555555",
    subject: "Consulta General",
    message:
      "Necesito asesoría sobre el proceso de compra de vivienda y financiación disponible",
  },
};

// Función para simular delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Función para llenar un campo
const fillField = async (selector, value, type = "input") => {
  const element = document.querySelector(selector);
  if (!element) {
    console.warn(`⚠️ No se encontró el elemento: ${selector}`);
    return false;
  }

  try {
    if (type === "select") {
      // Para elementos select
      element.value = value;
      element.dispatchEvent(new Event("change", { bubbles: true }));
    } else if (type === "radio") {
      // Para radio buttons
      const radioOption = document.querySelector(
        `input[name="${selector}"][value="${value}"]`
      );
      if (radioOption) {
        radioOption.checked = true;
        radioOption.dispatchEvent(new Event("change", { bubbles: true }));
      }
    } else if (type === "textarea") {
      // Para textareas
      element.value = value;
      element.dispatchEvent(new Event("input", { bubbles: true }));
    } else {
      // Para inputs normales
      element.value = value;
      element.dispatchEvent(new Event("input", { bubbles: true }));
    }

    console.log(`✅ Campo ${selector} rellenado con: ${value}`);
    return true;
  } catch (error) {
    console.error(`❌ Error al llenar ${selector}:`, error);
    return false;
  }
};

// Función para hacer clic en elementos
const clickElement = async (selector) => {
  const element = document.querySelector(selector);
  if (!element) {
    console.warn(`⚠️ No se encontró el elemento para click: ${selector}`);
    return false;
  }

  element.click();
  console.log(`🖱️ Click en: ${selector}`);
  return true;
};

// Función para rellenar formulario de Propietario
const fillOwnerForm = async () => {
  console.log("📝 Rellenando formulario de PROPIETARIO...");

  // Seleccionar pestaña de propietario
  (await clickElement('button[data-role="OWNER"]')) ||
    (await clickElement('button:contains("Soy Propietario")'));
  await delay(1000);

  // Responder preguntas iniciales (Sí a ambas)
  await clickElement('input[type="radio"][value="true"]');
  await delay(500);

  // Buscar todos los radio buttons con value true y hacer click en ellos
  const radioButtons = document.querySelectorAll(
    'input[type="radio"][value="true"]'
  );
  for (let radio of radioButtons) {
    radio.click();
    await delay(200);
  }

  // Información personal
  await fillField('input[name="nombre"]', testData.owner.name);
  await delay(200);
  await fillField('input[name="correo"]', testData.owner.email);
  await delay(200);
  await fillField('input[name="telefono"]', testData.owner.phone);
  await delay(200);

  // Información de propiedad
  await fillField('select[name="ciudad"]', testData.owner.city, "select");
  await delay(200);
  await fillField(
    'select[name="tipoPropiedad"]',
    testData.owner.propertyType,
    "select"
  );
  await delay(500);

  // Campos específicos de propiedad (dependen del tipo)
  await fillField('input[name="direccion"]', testData.owner.address);
  await delay(200);
  await fillField('input[name="edadPropiedad"]', testData.owner.propertyAge);
  await delay(200);
  await fillField('input[name="areaConstruida"]', testData.owner.builtArea);
  await delay(200);
  await fillField('input[name="habitaciones"]', testData.owner.rooms);
  await delay(200);
  await fillField('input[name="baños"]', testData.owner.bathrooms);
  await delay(200);
  await fillField(
    'input[name="valorAproximado"]',
    testData.owner.approximateValue
  );
  await delay(200);

  // Comentarios adicionales
  await fillField(
    'textarea[name="comentariosAdicionales"]',
    testData.owner.comments,
    "textarea"
  );
  await delay(500);

  console.log("✅ Formulario de propietario rellenado");
  return true;
};

// Función para rellenar formulario de Comprador
const fillBuyerForm = async () => {
  console.log("📝 Rellenando formulario de COMPRADOR...");

  // Seleccionar pestaña de comprador
  (await clickElement('button[data-role="BUYER"]')) ||
    (await clickElement('button:contains("Soy Comprador")'));
  await delay(1000);

  // Información personal
  await fillField('input[name="nombre"]', testData.buyer.name);
  await delay(200);
  await fillField('input[name="correo"]', testData.buyer.email);
  await delay(200);
  await fillField('input[name="telefono"]', testData.buyer.phone);
  await delay(200);

  // Preferencias de búsqueda
  await fillField('select[name="ciudad"]', testData.buyer.city, "select");
  await delay(200);
  await fillField(
    'select[name="tipoPropiedad"]',
    testData.buyer.propertyType,
    "select"
  );
  await delay(200);
  await fillField('input[name="presupuesto"]', testData.buyer.budget);
  await delay(200);
  await fillField(
    'select[name="formaDePago"]',
    testData.buyer.paymentMethod,
    "select"
  );
  await delay(200);

  // Comentarios
  await fillField(
    'textarea[name="comentariosAdicionales"]',
    testData.buyer.comments,
    "textarea"
  );
  await delay(500);

  console.log("✅ Formulario de comprador rellenado");
  return true;
};

// Función para rellenar formulario de Contacto General
const fillContactForm = async () => {
  console.log("📝 Rellenando formulario de CONTACTO GENERAL...");

  // Seleccionar pestaña de contacto
  (await clickElement('button[data-role="contact"]')) ||
    (await clickElement('button:contains("Contacto General")'));
  await delay(1000);

  // Información de contacto
  await fillField('input[name="nombre"]', testData.contact.name);
  await delay(200);
  await fillField('input[name="correo"]', testData.contact.email);
  await delay(200);
  await fillField('input[name="telefono"]', testData.contact.phone);
  await delay(200);
  await fillField('input[name="asunto"]', testData.contact.subject);
  await delay(200);

  // Mensaje
  await fillField(
    'textarea[name="mensaje"]',
    testData.contact.message,
    "textarea"
  );
  await delay(500);

  console.log("✅ Formulario de contacto general rellenado");
  return true;
};

// Función para enviar formulario
const submitForm = async () => {
  console.log("📧 Enviando formulario...");

  const submitButton =
    document.querySelector('button[type="submit"]') ||
    document.querySelector('button:contains("Enviar")') ||
    document.querySelector(".bg-gradient-to-r");

  if (submitButton) {
    submitButton.click();
    console.log("🚀 Formulario enviado");
    return true;
  } else {
    console.error("❌ No se encontró el botón de envío");
    return false;
  }
};

// Función principal para probar todos los formularios
const testAllForms = async () => {
  console.log("🚀 INICIANDO PRUEBA DE TODOS LOS FORMULARIOS");
  console.log("=".repeat(70));

  const forms = [
    { name: "PROPIETARIO", fill: fillOwnerForm },
    { name: "COMPRADOR", fill: fillBuyerForm },
    { name: "CONTACTO GENERAL", fill: fillContactForm },
  ];

  for (const form of forms) {
    try {
      console.log(`\n📋 PROBANDO FORMULARIO: ${form.name}`);
      console.log("-".repeat(50));

      // Rellenar formulario
      const filled = await form.fill();
      if (!filled) {
        console.error(`❌ Error al rellenar formulario ${form.name}`);
        continue;
      }

      // Esperar un momento antes de enviar
      await delay(1000);

      // Enviar formulario
      const sent = await submitForm();
      if (sent) {
        console.log(`✅ Formulario ${form.name} enviado exitosamente`);

        // Esperar respuesta/confirmación
        await delay(3000);

        // Verificar si apareció mensaje de éxito
        const successMessage =
          document.querySelector(".alert-success") ||
          document.querySelector("[data-success]") ||
          document.querySelector(':contains("exitosamente")');

        if (successMessage) {
          console.log(`🎉 Confirmación recibida para ${form.name}`);
        } else {
          console.warn(`⚠️ No se detectó confirmación para ${form.name}`);
        }
      } else {
        console.error(`❌ Error al enviar formulario ${form.name}`);
      }

      // Esperar antes del siguiente formulario
      await delay(2000);
    } catch (error) {
      console.error(`💥 Error completo en formulario ${form.name}:`, error);
    }
  }

  console.log("\n🏁 PRUEBA DE FORMULARIOS COMPLETADA");
  console.log("=".repeat(70));
};

// Función para ejecutar una sola vez
const testSingleForm = async (formType) => {
  console.log(`🎯 PROBANDO FORMULARIO ESPECÍFICO: ${formType.toUpperCase()}`);

  try {
    let fillFunction;
    switch (formType.toLowerCase()) {
      case "owner":
      case "propietario":
        fillFunction = fillOwnerForm;
        break;
      case "buyer":
      case "comprador":
        fillFunction = fillBuyerForm;
        break;
      case "contact":
      case "contacto":
        fillFunction = fillContactForm;
        break;
      default:
        console.error(
          "❌ Tipo de formulario no válido. Use: owner, buyer, o contact"
        );
        return;
    }

    const filled = await fillFunction();
    if (filled) {
      await delay(1000);
      await submitForm();
    }
  } catch (error) {
    console.error("💥 Error:", error);
  }
};

// Exponer funciones globalmente para uso manual
window.testAllForms = testAllForms;
window.testSingleForm = testSingleForm;
window.fillOwnerForm = fillOwnerForm;
window.fillBuyerForm = fillBuyerForm;
window.fillContactForm = fillContactForm;
window.submitForm = submitForm;

// Instrucciones de uso
console.log("📖 INSTRUCCIONES DE USO:");
console.log("=".repeat(70));
console.log("1. Navegar a: http://localhost:3000/contacto");
console.log("2. Abrir DevTools (F12) → Console");
console.log("3. Pegar este script y presionar Enter");
console.log("4. Ejecutar uno de estos comandos:");
console.log("");
console.log("   🔄 Probar todos: testAllForms()");
console.log("   🎯 Probar uno:   testSingleForm('owner')");
console.log("                   testSingleForm('buyer')");
console.log("                   testSingleForm('contact')");
console.log("");
console.log("   📝 Solo llenar: fillOwnerForm()");
console.log("                  fillBuyerForm()");
console.log("                  fillContactForm()");
console.log("");
console.log("   📧 Solo enviar: submitForm()");
console.log("");
console.log("🎉 SCRIPT CARGADO - LISTO PARA USAR");
console.log("=".repeat(70));
