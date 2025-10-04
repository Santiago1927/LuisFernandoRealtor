/**
 * Interceptor global de Next.js Image para corregir URLs problemáticas
 * Este archivo intercepta todas las requests de imágenes antes de que lleguen al servidor
 */

const originalImageLoader = require('next/image').default;

// URLs problemáticas conocidas y sus correcciones
const URL_CORRECTIONS = new Map([
  // Casos específicos identificados en los errores 400
  [
    'https://firebasestorage.googleapis.com/v0/b/inmapp-842fa.firebasestorage.app/o/properties%2Fimages%2F1753389229074_dinero.png',
    '/placeholder-property.svg'
  ],
  [
    'https://firebasestorage.googleapis.com/v0/b/inmapp-842fa.firebasestorage.app/o/properties%2Fimages%2F1753417841583_th.outside926x816.682ddf3969e69_infocdn__rrpmqjnyzboojm5ojhfpatlpccpu4ejuvwmczwtsjpg.webp',
    '/placeholder-property.svg'
  ]
]);

// Patrones problemáticos
const PROBLEMATIC_PATTERNS = [
  /imagez1-3F7/gi,
  /properties%2Fimages%2F/gi,
  /%2F.*%2F.*%2F/gi, // Triple codificación o más
];

function correctProblematicUrl(src) {
  if (!src || typeof src !== 'string') {
    return '/placeholder-property.svg';
  }

  // Verificar correcciones específicas
  if (URL_CORRECTIONS.has(src)) {
    console.warn('🔧 Using specific correction for:', src.substring(0, 50) + '...');
    return URL_CORRECTIONS.get(src);
  }

  // Verificar patrones problemáticos
  const hasProblematicPattern = PROBLEMATIC_PATTERNS.some(pattern => pattern.test(src));
  
  if (hasProblematicPattern) {
    console.warn('🚨 Intercepted problematic pattern in:', src.substring(0, 50) + '...');
    
    try {
      // Intentar decodificar
      let corrected = decodeURIComponent(src);
      
      // Verificar si la corrección es válida
      if (corrected.includes('firebasestorage.googleapis.com') && 
          corrected.includes('alt=media') && 
          corrected.includes('token=')) {
        console.log('✅ Corrected URL:', corrected.substring(0, 50) + '...');
        return corrected;
      }
    } catch (error) {
      console.warn('❌ Could not decode URL:', error.message);
    }
    
    // Si no se puede corregir, usar placeholder
    return '/placeholder-property.svg';
  }

  return src;
}

// Interceptor para el loader de Next.js Image
function imageLoader({ src, width, quality }) {
  const correctedSrc = correctProblematicUrl(src);
  
  // Si es placeholder local, retornarlo directamente
  if (correctedSrc.startsWith('/')) {
    return correctedSrc;
  }
  
  // Para URLs externas, aplicar optimización normal de Next.js
  const params = new URLSearchParams();
  params.set('url', correctedSrc);
  params.set('w', width.toString());
  
  if (quality) {
    params.set('q', quality.toString());
  }
  
  return `/_next/image?${params.toString()}`;
}

module.exports = {
  correctProblematicUrl,
  imageLoader,
  URL_CORRECTIONS,
  PROBLEMATIC_PATTERNS
};