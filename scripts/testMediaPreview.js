// Script de prueba para verificar la funcionalidad de MediaPreview
// Ejecutar en la consola del navegador cuando esté en la página de admin

console.log("🔍 Verificando funcionalidad de MediaPreview...");

// Función para verificar si los elementos están presentes
function verificarElementos() {
  const imageInputs = document.querySelectorAll(
    'input[type="file"][accept="image/*"]'
  );
  const videoInputs = document.querySelectorAll(
    'input[type="file"][accept="video/*"]'
  );
  const eyeButtons = document.querySelectorAll(
    'button[title="Ver"], button[title="Ver imagen"]'
  );
  const deleteButtons = document.querySelectorAll(
    'button[title="Eliminar"], button[title="Eliminar archivo"]'
  );

  console.log("📊 Estadísticas de elementos:");
  console.log(`- Inputs de imagen: ${imageInputs.length}`);
  console.log(`- Inputs de video: ${videoInputs.length}`);
  console.log(`- Botones de vista previa: ${eyeButtons.length}`);
  console.log(`- Botones de eliminar: ${deleteButtons.length}`);

  if (eyeButtons.length > 0) {
    console.log("✅ Botones de vista previa encontrados");
    eyeButtons.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        console.log(`👁️ Click en botón de vista previa ${index + 1}`);
      });
    });
  } else {
    console.log("❌ No se encontraron botones de vista previa");
  }

  return {
    imageInputs: imageInputs.length,
    videoInputs: videoInputs.length,
    eyeButtons: eyeButtons.length,
    deleteButtons: deleteButtons.length,
  };
}

// Función para simular selección de archivos
function simularSeleccionArchivos() {
  console.log("🎭 Para probar la funcionalidad:");
  console.log("1. Selecciona imágenes usando el input de archivos");
  console.log("2. Observa cómo aparecen los thumbnails");
  console.log("3. Haz hover sobre un thumbnail para ver los botones");
  console.log("4. Click en el ojo para abrir la vista previa");
  console.log("5. Click en la X para eliminar archivos");
}

// Función para verificar modal
function verificarModal() {
  const modal = document.querySelector('[data-testid="preview-modal"]');
  if (modal) {
    console.log("✅ Modal de vista previa está visible");
    console.log("Modal z-index:", window.getComputedStyle(modal).zIndex);
  } else {
    console.log(
      "ℹ️ Modal no está visible (normal si no hay vista previa activa)"
    );
  }
}

// Ejecutar verificaciones
const stats = verificarElementos();
simularSeleccionArchivos();
verificarModal();

// Observador para detectar cambios en el DOM
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length > 0) {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) {
          // Element node
          if (node.matches && node.matches('[data-testid="preview-modal"]')) {
            console.log("🎉 Modal de vista previa apareció!");
          }
        }
      });
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

console.log(
  "🔍 Observador de modal activado. La consola mostrará mensajes cuando aparezca el modal."
);
console.log("📋 Para detener el observador, ejecuta: observer.disconnect()");

// Exportar funciones para uso manual
window.mediaPreviewTest = {
  verificarElementos,
  simularSeleccionArchivos,
  verificarModal,
  stats,
  observer,
};

console.log(
  "✅ Script de prueba cargado. Usa window.mediaPreviewTest para acceder a las funciones."
);
