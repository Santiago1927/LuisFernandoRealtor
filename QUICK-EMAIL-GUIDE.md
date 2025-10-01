# 📧 Guía Rápida - Plantillas de Email Optimizadas para Gmail

## 🚀 Inicio Rápido

### 1. Previsualizar Plantillas

```bash
# Método 1: React Email Server (puerto 3001)
npm run email

# Método 2: Páginas de preview en Next.js (puerto 3000)
npm run dev
# Luego visita: http://localhost:3000/emails
```

### 2. Testing de Envío

```bash
# Ver datos de prueba
npm run test:emails data

# Test individual
npm run test:emails buyer
npm run test:emails owner
npm run test:emails contact

# Test completo
npm run test:emails all
```

## 📋 URLs de Previsualización

- **Índice general:** http://localhost:3000/emails
- **Comprador:** http://localhost:3000/emails/buyer
- **Propietario:** http://localhost:3000/emails/owner
- **Contacto:** http://localhost:3000/emails/contact

## 🎯 Características Gmail

### ✅ Optimizaciones Implementadas

- [x] Máximo ancho 600px para Gmail
- [x] Fuentes seguras (Segoe UI, Arial, etc.)
- [x] Colores compatibles modo claro/oscuro
- [x] Botones táctiles 44px+ para móvil
- [x] Media queries para responsividad
- [x] Estructura HTML compatible con clientes estrictos
- [x] Inline styles para máxima compatibilidad
- [x] Imágenes con text fallbacks
- [x] Links con `target="_blank"` y `rel="noopener"`

### 📱 Testing Móvil Gmail

1. **Responsive Design**: Se adapta automáticamente
2. **Touch Targets**: Todos los botones son táctiles
3. **Readable Text**: Mínimo 14px en móvil
4. **Stack Layout**: Columnas se apilan verticalmente

## 🔧 Configuración Requerida

### Variables de Entorno

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxx
```

### Dependencias

```json
{
  "@react-email/components": "^0.0.16",
  "react-email": "2.1.1",
  "resend": "^3.2.0"
}
```

## 📧 Tipos de Email Soportados

### 1. BuyerEmailTemplate

- **Para**: Formularios de búsqueda de propiedades
- **Trigger**: `userType: "buyer"`
- **Características**: Presupuesto formateado, preferencias organizadas
- **CTA**: Email + Teléfono

### 2. OwnerEmailTemplate

- **Para**: Formularios de propiedades en venta
- **Trigger**: `userType: "owner"`
- **Características**: Amenidades con iconos, información legal
- **CTA**: Email + Teléfono

### 3. ContactEmailTemplate

- **Para**: Mensajes de contacto general
- **Trigger**: `userType: "contact"`
- **Características**: Mensaje multilínea, sugerencias de respuesta
- **CTA**: Email + Teléfono + WhatsApp

## 🎨 Customización Visual

### Colores Principales

```css
Amber 500: #f59e0b  /* Botones primarios */
Emerald 600: #059669  /* Éxito/WhatsApp */
Sky 500: #0ea5e9    /* Enlaces/Email */
Red 600: #dc2626    /* Urgencia */
```

### Espaciado Estándar

```css
Container: max-width 600px
Mobile Padding: 16px
Desktop Padding: 24px
Sections: margin 20px
Elements: margin 12px
```

## 🧪 Datos de Prueba

Los archivos de configuración incluyen datos realistas para testing:

- **María González**: Compradora de apartamento
- **Carlos Ramírez**: Vendedor de casa en El Poblado
- **Ana Martínez**: Consulta general de servicios

## 🔍 Debugging

### Problemas Comunes

**Email no se ve en Gmail:**

```bash
# 1. Verificar inline styles
# 2. Revisar ancho máximo 600px
# 3. Confirmar fuentes seguras
# 4. Testing en Gmail web + móvil
```

**Botones no funcionan en móvil:**

```bash
# 1. Verificar min-height 44px
# 2. Confirmar padding adecuado
# 3. Testing táctil en dispositivos
```

**Colores se ven mal:**

```bash
# 1. Testing modo claro y oscuro
# 2. Verificar contraste suficiente
# 3. Evitar colores muy brillantes
```

## 📊 Testing Checklist

### Antes de Producción

- [ ] Previeweado en React Email Server
- [ ] Testeado envío con datos reales
- [ ] Verificado en Gmail web (Chrome/Firefox)
- [ ] Testeado en Gmail móvil (Android/iOS)
- [ ] Revisado modo claro y oscuro
- [ ] Confirmado botones táctiles funcionan
- [ ] Links externos abren correctamente
- [ ] Formateo de datos es correcto
- [ ] Caracteres especiales se muestran bien
- [ ] Responsive funciona en diferentes tamaños

### Métricas de Calidad

- **Ancho máximo**: ≤ 600px ✅
- **Botones táctiles**: ≥ 44px ✅
- **Texto mínimo**: ≥ 14px móvil ✅
- **Tiempo de carga**: < 3s ✅
- **Compatibilidad**: Gmail, Outlook, Apple Mail ✅

## 🚨 Solución Rápida

```bash
# Si algo no funciona:
1. npm run dev          # Verificar servidor Next.js
2. npm run email        # Verificar React Email
3. Revisar RESEND_API_KEY en .env
4. Comprobar puerto 3000/3001 disponibles
5. Verificar datos en config.ts
```

## 📞 Soporte

- **Documentación completa**: `EMAIL-TEMPLATES.md`
- **Configuración**: `src/components/emails/config.ts`
- **Testing**: `scripts/testEmailTemplates.ts`
- **API**: `src/app/api/send/route.ts`

---

**🎯 Resultado esperado**: Emails que se ven perfectos en Gmail web y móvil, con alta tasa de conversión y experiencia de usuario optimizada.
