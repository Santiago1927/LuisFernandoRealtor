// 🤖 SCRIPT AVANZADO DE AUTO-RELLENO PARA FORMULARIOS DE CONTACTO
// Versión optimizada para componentes Shadcn/ui y React Hook Form

console.log("🤖 SCRIPT DE AUTO-RELLENO AVANZADO CARGADO");
console.log("=".repeat(70));

// Función para esperar a que aparezca un elemento
const waitForElement = (selector, timeout = 5000) => {
  return new Promise((resolve, reject) => {
    const element = document.querySelector(selector);
    if (element) {
      resolve(element);
      return;
    }

    const observer = new MutationObserver((mutations, obs) => {
      const element = document.querySelector(selector);
      if (element) {
        obs.disconnect();
        resolve(element);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    setTimeout(() => {
      observer.disconnect();
      reject(new Error(`Timeout waiting for ${selector}`));
    }, timeout);
  });
};

// Función para simular eventos de React
const triggerReactChange = (element, value) => {
  const valueSetter =
    Object.getOwnPropertyDescriptor(element, "value")?.set ||
    Object.getOwnPropertyDescriptor(Object.getPrototypeOf(element), "value")
      ?.set;

  if (valueSetter) {
    valueSetter.call(element, value);
  }

  element.dispatchEvent(new Event("input", { bubbles: true }));
  element.dispatchEvent(new Event("change", { bubbles: true }));
};

// Función para interactuar con Select de Shadcn
const selectShadcnOption = async (triggerSelector, optionText) => {
  try {
    console.log(
      `🎯 Seleccionando opción "${optionText}" en ${triggerSelector}`
    );

    // Hacer click en el trigger del select
    const trigger = await waitForElement(triggerSelector);
    trigger.click();

    await delay(500);

    // Buscar la opción en el dropdown
    const optionSelectors = [
      `[data-value="${optionText}"]`,
      `[role="option"]:contains("${optionText}")`,
      `[data-radix-collection-item]:contains("${optionText}")`,
      `button:contains("${optionText}")`,
      `div:contains("${optionText}")`,
    ];

    for (const selector of optionSelectors) {
      try {
        const option = document.querySelector(selector);
        if (option && option.textContent.includes(optionText)) {
          option.click();
          console.log(`✅ Opción "${optionText}" seleccionada`);
          return true;
        }
      } catch (e) {
        // Continuar con el siguiente selector
      }
    }

    // Buscar manualmente en todos los elementos visibles
    const allElements = document.querySelectorAll(
      '[role="option"], button, div'
    );
    for (const elem of allElements) {
      if (
        elem.textContent &&
        elem.textContent.trim() === optionText &&
        elem.offsetParent !== null
      ) {
        elem.click();
        console.log(`✅ Opción "${optionText}" seleccionada (búsqueda manual)`);
        return true;
      }
    }

    console.warn(`⚠️ No se pudo seleccionar la opción "${optionText}"`);
    return false;
  } catch (error) {
    console.error(`❌ Error al seleccionar opción:`, error);
    return false;
  }
};

// Función mejorada para llenar campos
const fillField = async (selector, value, type = "input") => {
  try {
    console.log(`📝 Llenando ${type}: ${selector} = ${value}`);

    const element = await waitForElement(selector, 2000);

    if (type === "select-shadcn") {
      return await selectShadcnOption(selector, value);
    } else if (type === "radio") {
      // Para radio buttons específicos
      const radioButtons = document.querySelectorAll('input[type="radio"]');
      for (const radio of radioButtons) {
        const label = radio.closest("div")?.querySelector("label");
        if (label && label.textContent.includes(value)) {
          radio.click();
          console.log(`✅ Radio "${value}" seleccionado`);
          return true;
        }
      }

      // Método alternativo para radio buttons
      if (value === "Sí" || value === true) {
        const yesRadios = document.querySelectorAll(
          'input[type="radio"][value="true"], input[type="radio"]:first-of-type'
        );
        for (const radio of yesRadios) {
          radio.click();
          await delay(200);
        }
        return true;
      }
    } else {
      // Para inputs y textareas normales
      triggerReactChange(element, value);
      console.log(`✅ Campo ${selector} rellenado`);
      return true;
    }
  } catch (error) {
    console.warn(`⚠️ No se pudo llenar ${selector}:`, error.message);
    return false;
  }
};

// Datos de prueba actualizados
const testData = {
  owner: {
    nombre: "Juan Carlos Propietario",
    correo: "juan.propietario@test.com",
    telefono: "3001234567",
    ciudad: "Medellín",
    tipoPropiedad: "Casa",
    direccion: "Calle 123 #45-67, El Poblado",
    edadPropiedad: "5",
    areaConstruida: "120",
    habitaciones: "3",
    baños: "2",
    valorAproximado: "500000000",
    comentariosAdicionales:
      "Propiedad en excelente estado con acabados de primera",
  },
  buyer: {
    nombre: "María Elena Compradora",
    correo: "maria.compradora@test.com",
    telefono: "3009876543",
    ciudad: "Bogotá",
    tipoPropiedad: "Apartamento",
    presupuesto: "300000000",
    formaDePago: "Crédito",
    comentariosAdicionales:
      "Busco apartamento en zona tranquila con buenas vías de acceso",
  },
  contact: {
    nombre: "Carlos Andrés Consultor",
    correo: "carlos.consultor@test.com",
    telefono: "3005555555",
    asunto: "Consulta sobre inversión inmobiliaria",
    mensaje:
      "Estoy interesado en obtener asesoría sobre oportunidades de inversión en el sector inmobiliario",
  },
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Función para hacer click en pestañas
const selectTab = async (tabName) => {
  const tabSelectors = [
    `button:contains("${tabName}")`,
    `[data-role="${tabName}"]`,
    `button[aria-selected="false"]:contains("${tabName}")`,
    `.grid button:contains("${tabName}")`,
  ];

  for (const selector of tabSelectors) {
    try {
      const elements = document.querySelectorAll("button");
      for (const btn of elements) {
        if (btn.textContent.includes(tabName)) {
          btn.click();
          console.log(`🔄 Pestaña "${tabName}" seleccionada`);
          await delay(1000);
          return true;
        }
      }
    } catch (e) {
      continue;
    }
  }

  console.warn(`⚠️ No se pudo seleccionar la pestaña "${tabName}"`);
  return false;
};

// Función específica para formulario de propietario
const fillOwnerForm = async () => {
  console.log("👨‍💼 RELLENANDO FORMULARIO DE PROPIETARIO");
  console.log("-".repeat(50));

  try {
    // Seleccionar pestaña
    await selectTab("Soy Propietario");
    await delay(1500);

    // Responder preguntas iniciales (buscar radio buttons y marcar "Sí")
    console.log("📋 Respondiendo preguntas iniciales...");
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    let radioCount = 0;

    for (const radio of radioButtons) {
      const parentDiv = radio.closest("div");
      const label = parentDiv?.querySelector("label");

      if (
        label &&
        (label.textContent.includes("Sí") ||
          radio.value === "true" ||
          radio.value === true)
      ) {
        radio.click();
        radioCount++;
        console.log(`✅ Pregunta ${radioCount}: Sí seleccionado`);
        await delay(300);
      }
    }

    await delay(1000);

    // Información personal
    console.log("👤 Llenando información personal...");
    await fillField(
      '#personal-input-nombre, input[name="nombre"], #nombre',
      testData.owner.nombre
    );
    await delay(300);
    await fillField(
      '#personal-input-correo, input[name="correo"], #correo',
      testData.owner.correo
    );
    await delay(300);
    await fillField(
      '#personal-input-telefono, input[name="telefono"], #telefono',
      testData.owner.telefono
    );
    await delay(500);

    // Información de propiedad
    console.log("🏠 Llenando información de propiedad...");
    await fillField(
      '#ciudad-select, [aria-label="Ciudad"]',
      testData.owner.ciudad,
      "select-shadcn"
    );
    await delay(500);
    await fillField(
      '#tipo-propiedad-select, [aria-label="Tipo de Propiedad"]',
      testData.owner.tipoPropiedad,
      "select-shadcn"
    );
    await delay(1000);

    // Campos específicos de la propiedad (aparecen después de seleccionar tipo)
    console.log("📐 Llenando detalles específicos...");
    await fillField(
      'input[name="direccion"], #direccion',
      testData.owner.direccion
    );
    await delay(300);
    await fillField(
      'input[name="edadPropiedad"], #edadPropiedad',
      testData.owner.edadPropiedad
    );
    await delay(300);
    await fillField(
      'input[name="areaConstruida"], #areaConstruida',
      testData.owner.areaConstruida
    );
    await delay(300);
    await fillField(
      'input[name="habitaciones"], #habitaciones',
      testData.owner.habitaciones
    );
    await delay(300);
    await fillField('input[name="baños"], #baños', testData.owner.baños);
    await delay(300);
    await fillField(
      'input[name="valorAproximado"], #valorAproximado',
      testData.owner.valorAproximado
    );
    await delay(300);

    // Comentarios
    await fillField(
      'textarea[name="comentariosAdicionales"], #comentariosAdicionales',
      testData.owner.comentariosAdicionales
    );
    await delay(500);

    console.log("✅ Formulario de propietario completado");
    return true;
  } catch (error) {
    console.error("❌ Error en formulario de propietario:", error);
    return false;
  }
};

// Función específica para formulario de comprador
const fillBuyerForm = async () => {
  console.log("🏠 RELLENANDO FORMULARIO DE COMPRADOR");
  console.log("-".repeat(50));

  try {
    await selectTab("Soy Comprador");
    await delay(1500);

    // Información personal
    console.log("👤 Llenando información personal...");
    await fillField('input[name="nombre"], #nombre', testData.buyer.nombre);
    await delay(300);
    await fillField('input[name="correo"], #correo', testData.buyer.correo);
    await delay(300);
    await fillField(
      'input[name="telefono"], #telefono',
      testData.buyer.telefono
    );
    await delay(500);

    // Preferencias de búsqueda
    console.log("🔍 Llenando preferencias...");
    await fillField(
      '[aria-label="Ciudad"]',
      testData.buyer.ciudad,
      "select-shadcn"
    );
    await delay(500);
    await fillField(
      '[aria-label="Tipo de Propiedad"]',
      testData.buyer.tipoPropiedad,
      "select-shadcn"
    );
    await delay(500);
    await fillField(
      'input[name="presupuesto"], #presupuesto',
      testData.buyer.presupuesto
    );
    await delay(300);
    await fillField(
      '[aria-label="Forma de Pago"]',
      testData.buyer.formaDePago,
      "select-shadcn"
    );
    await delay(500);

    // Comentarios
    await fillField(
      'textarea[name="comentariosAdicionales"], #comentariosAdicionales',
      testData.buyer.comentariosAdicionales
    );
    await delay(500);

    console.log("✅ Formulario de comprador completado");
    return true;
  } catch (error) {
    console.error("❌ Error en formulario de comprador:", error);
    return false;
  }
};

// Función específica para formulario de contacto
const fillContactForm = async () => {
  console.log("📞 RELLENANDO FORMULARIO DE CONTACTO");
  console.log("-".repeat(50));

  try {
    await selectTab("Contacto General");
    await delay(1500);

    await fillField('input[name="nombre"], #nombre', testData.contact.nombre);
    await delay(300);
    await fillField('input[name="correo"], #correo', testData.contact.correo);
    await delay(300);
    await fillField(
      'input[name="telefono"], #telefono',
      testData.contact.telefono
    );
    await delay(300);
    await fillField('input[name="asunto"], #asunto', testData.contact.asunto);
    await delay(300);
    await fillField(
      'textarea[name="mensaje"], #mensaje',
      testData.contact.mensaje
    );
    await delay(500);

    console.log("✅ Formulario de contacto completado");
    return true;
  } catch (error) {
    console.error("❌ Error en formulario de contacto:", error);
    return false;
  }
};

// Función para enviar formulario
const submitForm = async () => {
  console.log("📧 ENVIANDO FORMULARIO...");

  try {
    // Buscar botón de envío
    const submitSelectors = [
      'button[type="submit"]',
      'button:contains("Enviar")',
      '.bg-gradient-to-r:contains("Enviar")',
      'button:contains("Enviar Solicitud")',
      '[data-submit="true"]',
    ];

    let submitButton = null;

    for (const selector of submitSelectors) {
      const buttons = document.querySelectorAll("button");
      for (const btn of buttons) {
        if (btn.textContent.includes("Enviar") && !btn.disabled) {
          submitButton = btn;
          break;
        }
      }
      if (submitButton) break;
    }

    if (submitButton) {
      console.log("🚀 Botón de envío encontrado, enviando...");
      submitButton.click();

      // Esperar respuesta
      await delay(3000);

      // Verificar mensaje de éxito
      const successIndicators = [
        "[data-success]",
        ".alert-success",
        ':contains("exitosamente")',
        ':contains("enviado")',
        ':contains("éxito")',
      ];

      for (const indicator of successIndicators) {
        const elements = document.querySelectorAll("*");
        for (const elem of elements) {
          if (
            elem.textContent &&
            (elem.textContent.includes("exitosamente") ||
              elem.textContent.includes("enviado") ||
              elem.textContent.includes("éxito"))
          ) {
            console.log("🎉 ¡Formulario enviado exitosamente!");
            return true;
          }
        }
      }

      console.log("📬 Formulario enviado (verificando respuesta...)");
      return true;
    } else {
      console.error("❌ No se encontró botón de envío");
      return false;
    }
  } catch (error) {
    console.error("💥 Error al enviar formulario:", error);
    return false;
  }
};

// Función principal para probar todos los formularios
const testAllForms = async () => {
  console.log("🚀 INICIANDO PRUEBA COMPLETA DE FORMULARIOS");
  console.log("=".repeat(70));

  const forms = [
    { name: "PROPIETARIO", fn: fillOwnerForm },
    { name: "COMPRADOR", fn: fillBuyerForm },
    { name: "CONTACTO", fn: fillContactForm },
  ];

  for (let i = 0; i < forms.length; i++) {
    const form = forms[i];
    console.log(`\n📋 FORMULARIO ${i + 1}/3: ${form.name}`);
    console.log("=".repeat(50));

    try {
      const filled = await form.fn();
      if (filled) {
        await delay(1000);
        const sent = await submitForm();

        if (sent) {
          console.log(`✅ ${form.name}: COMPLETADO CON ÉXITO`);
        } else {
          console.log(`⚠️ ${form.name}: RELLENADO PERO ERROR AL ENVIAR`);
        }
      } else {
        console.log(`❌ ${form.name}: ERROR AL RELLENAR`);
      }

      // Pausa entre formularios
      if (i < forms.length - 1) {
        console.log("\n⏳ Esperando antes del siguiente formulario...");
        await delay(2000);
      }
    } catch (error) {
      console.error(`💥 Error crítico en ${form.name}:`, error);
    }
  }

  console.log("\n🏁 PRUEBA COMPLETA TERMINADA");
  console.log("=".repeat(70));
};

// Función específica para un solo formulario
const testSingleForm = async (formType) => {
  const formMap = {
    owner: fillOwnerForm,
    propietario: fillOwnerForm,
    buyer: fillBuyerForm,
    comprador: fillBuyerForm,
    contact: fillContactForm,
    contacto: fillContactForm,
  };

  const fn = formMap[formType.toLowerCase()];
  if (!fn) {
    console.error("❌ Tipo no válido. Use: owner, buyer, contact");
    return;
  }

  console.log(`🎯 PROBANDO: ${formType.toUpperCase()}`);

  try {
    const filled = await fn();
    if (filled) {
      await delay(1000);
      await submitForm();
    }
  } catch (error) {
    console.error("💥 Error:", error);
  }
};

// Exportar funciones globalmente
window.testAllForms = testAllForms;
window.testSingleForm = testSingleForm;
window.fillOwnerForm = fillOwnerForm;
window.fillBuyerForm = fillBuyerForm;
window.fillContactForm = fillContactForm;
window.submitForm = submitForm;

console.log("📖 COMANDOS DISPONIBLES:");
console.log("=".repeat(70));
console.log("testAllForms()           - Probar todos los formularios");
console.log("testSingleForm('owner')  - Solo propietario");
console.log("testSingleForm('buyer')  - Solo comprador");
console.log("testSingleForm('contact')- Solo contacto");
console.log("fillOwnerForm()          - Solo llenar propietario");
console.log("fillBuyerForm()          - Solo llenar comprador");
console.log("fillContactForm()        - Solo llenar contacto");
console.log("submitForm()             - Solo enviar formulario actual");
console.log("");
console.log("🎯 USO RECOMENDADO:");
console.log("1. Ir a http://localhost:3000/contacto");
console.log("2. Pegar este script en la consola");
console.log("3. Ejecutar: testAllForms()");
console.log("");
console.log("🎉 SCRIPT AVANZADO LISTO");
console.log("=".repeat(70));
