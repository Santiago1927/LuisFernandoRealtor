# 📧 Plantillas de Email Optimizadas para Gmail

## Descripción General

Este proyecto incluye plantillas de email completamente optimizadas para Gmail (web y móvil) usando **React Email**. Las plantillas están diseñadas para mantener su diseño perfectamente tanto en el cliente web de Gmail como en la aplicación móvil.

## 🎯 Características Principales

### ✅ Optimización para Gmail

- **Máximo ancho de 600px** - Estándar para clientes de email
- **Fuentes seguras** - Solo fuentes que Gmail renderiza correctamente
- **Colores compatibles** - Funcionan en modo claro y oscuro de Gmail
- **Estructura de tabla** - Para máxima compatibilidad
- **Imágenes con fallbacks** - Texto alternativo cuando las imágenes no cargan

### 📱 Diseño Responsivo

- **Media queries optimizadas** para móviles
- **Botones táctiles grandes** (44px mínimo)
- **Texto legible** en pantallas pequeñas (14px mínimo)
- **Layout que se apila** correctamente en móviles
- **Padding responsivo** que se ajusta por pantalla

### 🎨 Diseño Profesional

- **Esquema de colores** coherente con la marca
- **Tipografía legible** y profesional
- **Banner con iconos** distintivos para cada tipo de formulario
- **Gradientes y efectos visuales** optimizados para Gmail
- **Separación visual clara** entre secciones
- **Call-to-actions prominentes** y accesibles
- **Información organizada** en tarjetas visuales
- **Banners con iconos** específicos para cada tipo de formulario
- **Efectos visuales** con gradientes y sombras optimizados para Gmail

## 📂 Estructura de Archivos

```
src/components/emails/
├── BaseEmailTemplate.tsx      # Plantilla base reutilizable
├── BuyerEmailTemplate.tsx     # Para formularios de compra
├── OwnerEmailTemplate.tsx     # Para formularios de venta
├── ContactEmailTemplate.tsx   # Para formularios de contacto
├── config.ts                  # Configuración y datos de prueba
└── index.ts                   # Exportaciones principales

src/app/emails/               # Páginas de previsualización
├── page.tsx                  # Índice de plantillas
├── buyer.tsx                 # Preview template comprador
├── owner.tsx                 # Preview template propietario
└── contact.tsx               # Preview template contacto

src/app/api/send/
└── route.ts                  # API actualizada para usar nuevas plantillas

scripts/
└── testEmailTemplates.ts     # Script de testing
```

## 🚀 Uso de las Plantillas

### 1. Previsualización en Desarrollo

```bash
# Inicia el servidor de React Email
npm run email

# O preview en el navegador
npm run dev
# Luego visita: http://localhost:3000/emails
```

### 2. Testing de Envío

```bash
# Test todas las plantillas
tsx scripts/testEmailTemplates.ts all

# Test una plantilla específica
tsx scripts/testEmailTemplates.ts buyer
tsx scripts/testEmailTemplates.ts owner
tsx scripts/testEmailTemplates.ts contact

# Ver datos de prueba
tsx scripts/testEmailTemplates.ts data
```

### 3. Uso Programático

```typescript
import {
  BuyerEmailTemplate,
  OwnerEmailTemplate,
  ContactEmailTemplate,
  getEmailTemplate,
} from "@/components/emails";

// Usar plantilla específica
const BuyerEmail = BuyerEmailTemplate;

// Usar factory function
const EmailTemplate = getEmailTemplate("buyer");

// Con React.createElement (para APIs)
React.createElement(BuyerEmailTemplate, formData);
```

## 📋 Tipos de Plantillas

### 1. BuyerEmailTemplate (Compradores) 🏠

**Para:** Formularios de búsqueda de propiedades

**Datos requeridos:**

- `nombre`: string
- `correo`: string
- `telefono`: string (opcional)

**Datos opcionales:**

- `ciudad`, `tipoPropiedad`, `area`, `habitaciones`, `baños`
- `parqueaderos`, `deposito`, `formaDePago`, `presupuesto`
- `comentariosAdicionales`

**Características especiales:**

- **Banner con icono 🏠** para identificación inmediata
- Formateo automático de precios en COP
- Íconos visuales para características
- Call-to-actions para email y teléfono

### 2. OwnerEmailTemplate (Vendedores) 🏘️

**Para:** Formularios de propiedades en venta

**Datos requeridos:**

- `nombre`: string
- `correo`: string
- `telefono`: string (opcional)

**Datos opcionales:**

- Información básica: `tipoPropiedad`, `direccion`, `edadPropiedad`
- Medidas: `areaConstruida`, `area`
- Características: `habitaciones`, `baños`, `parqueaderos`
- Amenidades: `piscina`, `vigilancia`, `balcon`, `estudio`
- Financiero: `valorAproximado`, `valorAdministracion`
- Legal: `situacionJuridica`, `detalleSituacionJuridica`

**Características especiales:**

- **Banner con icono 🏘️** para identificación de propietarios
- Secciones organizadas por categorías
- Tags visuales para amenidades
- Formateo de monedas y medidas
- Información legal destacada

### 3. ContactEmailTemplate (Contacto General) 💌

**Para:** Formularios de contacto directo

**Datos requeridos:**

- `nombre`: string
- `correo`: string
- `mensaje`: string

**Datos opcionales:**

- `telefono`, `asunto`, `origen`, `fecha`

**Características especiales:**

- **Banner con icono 💌** para mensajes directos
- Mensaje formateado con saltos de línea
- Sugerencias de respuesta incluidas
- Múltiples opciones de contacto (email, teléfono, WhatsApp)
- Indicadores de urgencia y tiempo de respuesta

## 🎨 Diseño del Banner

### Características del Header

- **Gradiente premium**: Amber 500 (#f59e0b) a Amber 600 (#d97706)
- **Patrón de textura**: Gradiente diagonal sutil para profundidad
- **Backdrop blur**: Efecto de cristal esmerilado en el contenedor del icono
- **Sombras múltiples**: Text-shadow y drop-shadow para el icono
- **Responsive**: Se adapta automáticamente en móviles

### Iconos por Plantilla

- **🏠 Compradores**: Casa simple, representa búsqueda de hogar
- **🏘️ Propietarios**: Vecindario, representa múltiples propiedades
- **💌 Contacto**: Carta con corazón, representa comunicación personal

### Efectos Visuales

- **Tamaño icono**: 48px desktop, 36px móvil
- **Contenedor traslúcido**: rgba(255,255,255,0.15) con border
- **Bordes redondeados**: 12px para suavidad
- **Espaciado**: Padding responsive para diferentes pantallas

## 🎨 Guía de Estilos

### Colores Principales

```css
Primary: #f59e0b (Amber 500)
Primary Dark: #d97706 (Amber 600)
Success: #059669 (Emerald 600)
Secondary: #0ea5e9 (Sky 500)
Warning: #dc2626 (Red 600)
```

### Tipografía

```css
Font Family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
Font Sizes:
  - Title: 24px / 20px (mobile)
  - Heading: 18px / 16px (mobile)
  - Body: 16px / 14px (mobile)
  - Small: 14px / 12px (mobile)
```

### Espaciado

```css
Container Max Width: 600px
Mobile Padding: 16px
Desktop Padding: 24px
Section Spacing: 20px
Element Spacing: 12px
```

## 🔧 Configuración Avanzada

### Variables de Entorno

```env
RESEND_API_KEY=your_resend_api_key_here
```

### Configuración del package.json

```json
{
  "scripts": {
    "email": "email dev --dir src/components/emails",
    "email:export": "email export --dir src/components/emails"
  }
}
```

### Customización de Estilos

Los estilos están definidos en `BaseEmailTemplate.tsx` y pueden ser customizados modificando:

1. **CSS inline** para máxima compatibilidad
2. **Media queries** en el `<style>` tag del head
3. **Variables de color** en `config.ts`

## 📱 Testing en Gmail

### Web (Desktop)

1. Abrir Gmail en Chrome/Firefox
2. Verificar diseño en pantalla completa
3. Probar redimensionamiento de ventana
4. Revisar en modo claro y oscuro

### Móvil

1. Abrir Gmail app en Android/iOS
2. Verificar botones táctiles (44px mínimo)
3. Revisar legibilidad del texto
4. Probar orientación vertical/horizontal

### Testing Checklist

- [ ] Imágenes cargan correctamente
- [ ] Enlaces funcionan en móvil y desktop
- [ ] Botones son suficientemente grandes para tocar
- [ ] Texto es legible en pantallas pequeñas
- [ ] Colores se ven bien en modo claro/oscuro
- [ ] Layout no se rompe en clientes estrictos
- [ ] Formateo de monedas es correcto
- [ ] Acentos y caracteres especiales se muestran bien

## 🚨 Solución de Problemas

### Plantilla no se ve bien en Gmail

1. Verificar que las imágenes tienen URLs absolutas
2. Revisar que no se usan CSS moderno no soportado
3. Confirmar que el HTML es válido
4. Probar con inline styles en lugar de clases CSS

### Problemas de Responsividad

1. Verificar media queries en el `<head>`
2. Confirmar que los contenedores tienen max-width
3. Revisar que el padding se ajusta correctamente
4. Probar en diferentes tamaños de pantalla

### Errores de Envío

1. Verificar que RESEND_API_KEY está configurada
2. Confirmar que todos los campos requeridos están presentes
3. Revisar logs de la API en `/api/send/route.ts`
4. Probar con datos de prueba conocidos

## 📚 Recursos Adicionales

- [React Email Documentation](https://react.email)
- [Gmail CSS Support](https://developers.google.com/gmail/design)
- [Email Client CSS Support](https://www.campaignmonitor.com/css/)
- [Resend Documentation](https://resend.com/docs)

## 🔄 Actualizaciones Futuras

### Planeadas

- [ ] Soporte para más tipos de formularios
- [ ] Plantillas en múltiples idiomas
- [ ] Integración con analytics de email
- [ ] A/B testing de plantillas
- [ ] Plantillas para notificaciones automáticas

### Mejoras Continuas

- [ ] Optimización adicional para Outlook
- [ ] Soporte para modo oscuro mejorado
- [ ] Integración con CRM
- [ ] Plantillas de follow-up automatizadas
