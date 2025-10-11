// Script para diagnosticar el problema del campo city
// Se ejecuta en la consola del navegador

console.log("🔍 Iniciando diagnóstico del campo city...");

// Función para verificar propiedades en la página actual
function diagnosticarPropiedades() {
  // Si estamos en la página de propiedades, verificar las propiedades mostradas
  const propertyCards = document.querySelectorAll("[data-property-id]");

  if (propertyCards.length === 0) {
    console.log("❌ No se encontraron tarjetas de propiedades en esta página");
    return;
  }

  console.log(
    `📊 Encontradas ${propertyCards.length} propiedades en la página`
  );

  // Para cada propiedad, extraer información relevante
  propertyCards.forEach((card, index) => {
    const propertyId = card.getAttribute("data-property-id");
    const titleElement = card.querySelector('h3, [class*="title"]');
    const title = titleElement ? titleElement.textContent : "Sin título";

    console.log(`${index + 1}. ID: ${propertyId} - Título: ${title}`);
  });
}

// Función para hacer una petición a la API y verificar los datos
async function verificarAPI() {
  try {
    console.log("🌐 Consultando API de propiedades...");

    const response = await fetch("/api/propiedades?page=1&pageSize=5");
    const data = await response.json();

    if (!data.properties || data.properties.length === 0) {
      console.log("❌ No se encontraron propiedades en la API");
      return;
    }

    console.log(
      `📊 Encontradas ${data.properties.length} propiedades en la API`
    );

    data.properties.forEach((prop, index) => {
      console.log(`${index + 1}. ID: ${prop.id}`);
      console.log(`   Título: "${prop.title || "Sin título"}"`);
      console.log(`   Ciudad: "${prop.city}" (tipo: ${typeof prop.city})`);
      console.log(`   Tipo: "${prop.type}"`);
      console.log(`   Precio: ${prop.price}`);
      console.log("   ---");
    });

    // Analizar problemas con city
    const sinCity = data.properties.filter(
      (p) => !p.city || p.city.trim() === ""
    );
    const conCity = data.properties.filter(
      (p) => p.city && p.city.trim() !== ""
    );

    console.log(`✅ Propiedades con ciudad: ${conCity.length}`);
    console.log(`❌ Propiedades sin ciudad: ${sinCity.length}`);

    if (sinCity.length > 0) {
      console.log("🚨 Propiedades problemáticas:");
      sinCity.forEach((prop) => {
        console.log(`   - ${prop.id}: "${prop.title}" | city: "${prop.city}"`);
      });
    }
  } catch (error) {
    console.error("❌ Error al consultar la API:", error);
  }
}

// Ejecutar diagnósticos
diagnosticarPropiedades();
verificarAPI();

console.log("🏁 Diagnóstico completado. Revisa los resultados arriba.");
