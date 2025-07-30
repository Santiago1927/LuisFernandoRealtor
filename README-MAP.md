# 🗺️ Componente de Mapa Interactivo

## Descripción

Implementación completa de un sistema de mapas interactivos con geocodificación para la aplicación de bienes raíces Luis Fernando Realtor. Utiliza **Leaflet** con **OpenStreetMap** como servicio gratuito de mapas.

## 🚀 Características

### ✅ Implementado
- **🗺️ Mapa interactivo** con Leaflet y OpenStreetMap
- **📍 Geocodificación** (dirección → coordenadas) usando Nominatim API
- **🔄 Reverse Geocoding** (coordenadas → dirección)
- **🎯 Marcador arrastrable** en modo edición
- **👁️ Modo solo lectura** para vista de detalles
- **🇨🇴 Optimizado para direcciones colombianas**
- **⚡ Carga dinámica** (sin SSR) para compatibilidad Next.js
- **🎨 UI/UX integrada** con el diseño existente

### 📋 Funcionalidades

1. **MapView Component**
   - Props: `address`, `lat`, `lng`, `onLocationChange`, `draggable`
   - Geocodificación automática al recibir dirección
   - Marcador arrastrable con callback de cambios
   - Estados de carga y error con reintentos
   - Validación de formato de direcciones

2. **Servicio de Geocodificación**
   - API gratuita de Nominatim (OpenStreetMap)
   - Optimización para direcciones colombianas
   - Validación de formato de direcciones
   - Rate limiting y manejo de errores
   - Ejemplos de formato sugerido

## 🛠️ Instalación

```bash
npm install leaflet react-leaflet@4.2.1 @types/leaflet --legacy-peer-deps
```

## 📖 Uso

### En Formulario de Propiedades (Modo Editable)

```tsx
import MapView from '../components/map/MapView';

function PropertyForm() {
  const [address, setAddress] = useState('');
  const [lat, setLat] = useState<number>();
  const [lng, setLng] = useState<number>();

  const handleLocationChange = (newLat: number, newLng: number, newAddress: string) => {
    setLat(newLat);
    setLng(newLng);
    setAddress(newAddress);
  };

  return (
    <div>
      <input 
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Carrera 80 #45-23, Medellín"
      />
      
      {address && (
        <MapView
          address={address}
          lat={lat}
          lng={lng}
          onLocationChange={handleLocationChange}
          draggable={true}
          height="300px"
        />
      )}
    </div>
  );
}
```

### En Vista de Detalles (Modo Solo Lectura)

```tsx
function PropertyDetail({ property }) {
  return (
    <div>
      <h3>Ubicación</h3>
      <MapView
        address={property.address}
        lat={property.lat}
        lng={property.lng}
        draggable={false}
        height="400px"
      />
    </div>
  );
}
```

## 🎯 Ejemplos de Direcciones Válidas

- `Carrera 80 #45-23, Medellín`
- `Calle 100 #15-30, Bogotá`
- `Avenida El Dorado #68-45`
- `Diagonal 15 #45-67, Cali`
- `Cr 45 #23-15, Pasto`

## 📊 API de Geocodificación

### Métodos Principales

```typescript
// Geocodificar dirección
const result = await geocodingService.geocodeColombianAddress(
  'Carrera 80 #45-23, Medellín'
);

// Reverse geocoding
const address = await geocodingService.reverseGeocode(6.2442, -75.5812);

// Validar formato
const isValid = geocodingService.validateColombianAddress('Cr 80 #45-23');

// Obtener ejemplos
const examples = geocodingService.getAddressFormatExamples();
```

### Respuesta de Geocodificación

```typescript
interface GeocodingResult {
  lat: number;
  lng: number;
  address: string;
  city?: string;
  country?: string;
  postalCode?: string;
}
```

## 🧪 Pruebas

```bash
# Probar servicio de geocodificación
npx tsx scripts/testMapGeocoding.ts

# Verificar integración en desarrollo
npm run dev
# Navegar a: http://localhost:3001/admin (agregar propiedad)
# Navegar a: http://localhost:3001/propiedades/[id] (ver detalle)
```

## 🎨 Personalización CSS

Los estilos están definidos en `src/app/styles/globals.css`:

```css
/* Contenedor del mapa */
.map-container {
  height: 400px;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}

/* Modo solo lectura */
.map-container.readonly {
  pointer-events: none;
}

/* Popup personalizado */
.leaflet-popup-content-wrapper {
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
```

## ⚡ Optimizaciones

### Performance
- **Carga dinámica**: No renderiza en SSR
- **Rate limiting**: Pausas entre requests de geocodificación
- **Cache de estado**: Evita geocodificaciones innecesarias

### UX/UI
- **Estados de carga**: Indicadores visuales durante geocodificación
- **Manejo de errores**: Mensajes claros con opciones de reintento
- **Validación**: Sugerencias de formato para direcciones
- **Responsive**: Funciona en móviles y desktop

## 🔧 Configuración Avanzada

### Cambiar Servicio de Mapas

Para usar otro proveedor de mapas, modifica en `MapView.tsx`:

```tsx
<TileLayer
  attribution='&copy; Tu Proveedor'
  url="https://tu-proveedor.com/{z}/{x}/{y}.png"
/>
```

### Personalizar Marcador

```tsx
const customIcon = new L.Icon({
  iconUrl: '/tu-icono.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
```

## 🐛 Solución de Problemas Comunes

### Problemas de Carga
- **Error**: "Leaflet is not defined"
  - **Solución**: Verificar que la carga sea dinámica (`ssr: false`)

### Problemas de Geocodificación
- **Error**: "No se encontró la dirección"
  - **Solución**: Verificar formato de dirección colombiana
  - **Usar**: Ejemplos sugeridos por `getAddressFormatExamples()`

### Problemas de Estilos
- **Error**: Marcadores sin estilo
  - **Solución**: Verificar importación de CSS de Leaflet en `globals.css`

## 📚 Recursos

- [Leaflet Documentation](https://leafletjs.com/)
- [React Leaflet](https://react-leaflet.js.org/)
- [Nominatim API](https://nominatim.org/release-docs/latest/)
- [OpenStreetMap](https://www.openstreetmap.org/)

## 🎯 Estado Actual

✅ **Completamente funcional** en:
- Formulario de agregar/editar propiedades
- Vista de detalles de propiedades
- Geocodificación de direcciones colombianas
- Interfaz responsive y accesible

La implementación está lista para producción! 🚀 