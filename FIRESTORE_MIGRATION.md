# Migración a Firestore - Luis Fernando Realtor

## Resumen de Cambios

Se ha completado la migración de Firebase Realtime Database a Firestore, incluyendo la creación de todas las colecciones necesarias y la corrección de los formularios.

## Colecciones Creadas

### 1. `properties` - Propiedades Inmobiliarias
- **Acceso**: Lectura pública, escritura solo autenticados
- **Campos principales**:
  - `id` (auto-generado)
  - `title`, `address`, `city`, `price`
  - `description`, `images`, `videos`
  - `bedrooms`, `bathrooms`, `area`
  - `type` (house, apartment, commercial, land)
  - `status` (available, sold, rented)
  - `lat`, `lng` (coordenadas)
  - `createdAt`, `updatedAt`

### 2. `buyers` - Compradores
- **Acceso**: Solo usuarios autenticados
- **Campos principales**:
  - `nombre`, `correo`, `telefono`
  - `ciudad`, `tipoPropiedad`
  - `habitaciones`, `baños`, `parqueaderos`
  - `deposito`, `formaDePago`, `presupuesto`
  - `userType: "buyer"`
  - `createdAt`, `updatedAt`

### 3. `owners` - Propietarios
- **Acceso**: Solo usuarios autenticados
- **Campos principales**:
  - `nombre`, `correo`, `telefono`
  - `ciudad`, `tipoPropiedad`
  - `firstQuestion`, `secondQuestion`
  - `direccion`, `edadPropiedad`, `areaConstruida`
  - `habitaciones`, `baños`, `parqueaderos`, `piso`
  - `estudio`, `deposito`, `balcon`, `vigilancia`, `piscina`
  - `valorAdministracion`, `valorAproximado`
  - `situacionJuridica`, `situacionJuridicaEspecifica`
  - `comentariosAdicionales`
  - `userType: "owner"`
  - `createdAt`, `updatedAt`

### 4. `contacts` - Contactos Generales
- **Acceso**: Solo usuarios autenticados
- **Campos principales**:
  - `nombre`, `correo`, `telefono`
  - `asunto`, `mensaje`
  - `userType: "contact"`
  - `createdAt`, `updatedAt`

## Formularios Actualizados

### 1. Formulario de Comprador (`BuyerEmail.tsx`)
- ✅ Guarda todos los campos en Firestore
- ✅ Incluye valores por defecto para campos dinámicos
- ✅ Envía email con datos completos

### 2. Formulario de Propietario (`OwnerEmail.tsx`)
- ✅ Guarda todos los campos en Firestore
- ✅ Incluye valores por defecto para campos dinámicos
- ✅ Envía email con datos completos

### 3. Formulario de Contacto General (`ContactEmail.tsx`)
- ✅ Nuevo formulario creado
- ✅ Guarda en colección `contacts`
- ✅ Envía email con datos completos

## Servicios Firestore

### `firebase/firestoreService.ts`
Contiene todos los servicios para interactuar con Firestore:

- `propertyService`: CRUD para propiedades
- `buyerService`: CRUD para compradores
- `ownerService`: CRUD para propietarios
- `contactService`: CRUD para contactos

## Reglas de Seguridad

### `firestore.rules`
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Properties: lectura pública, escritura autenticada
    match /properties/{propertyId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Otras colecciones: solo autenticados
    match /buyers/{buyerId} {
      allow read, write: if request.auth != null;
    }
    
    match /owners/{ownerId} {
      allow read, write: if request.auth != null;
    }
    
    match /contacts/{contactId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Scripts Disponibles

### Poblar datos de ejemplo
```bash
npm run populate
```

Este comando ejecuta `scripts/populateFirestore.ts` que crea:
- 3 propiedades de ejemplo
- 2 compradores de ejemplo
- 1 propietario de ejemplo
- 1 contacto de ejemplo

## Componentes Actualizados

### Páginas y Componentes
- ✅ `src/app/page.tsx` - Página principal
- ✅ `src/app/propiedades/page.tsx` - Lista de propiedades
- ✅ `src/app/propiedades/[id]/page.tsx` - Detalle de propiedad
- ✅ `src/components/admin/AdminDashboard.tsx` - Panel de administración
- ✅ `src/components/admin/PropertyForm.tsx` - Formulario de propiedades
- ✅ `src/components/ContactSection.tsx` - Sección de contacto (actualizada con 3 opciones)

### Formularios
- ✅ `src/components/BuyerEmail.tsx` - Formulario de comprador
- ✅ `src/components/OwnerEmail.tsx` - Formulario de propietario
- ✅ `src/components/ContactEmail.tsx` - Formulario de contacto general (nuevo)
- ✅ `src/components/forms/ContactForm.tsx` - Componente de formulario de contacto (nuevo)

### Template de Email
- ✅ `src/components/emails/ContactEmail.tsx` - Actualizado para manejar 3 tipos de formularios

## Configuración Firebase

### `firebase/firebaseConfig.ts`
- ✅ Actualizado para usar Firestore
- ✅ Eliminada configuración de Realtime Database
- ✅ Exporta `db` en lugar de `database`

## Próximos Pasos

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Configurar Firestore en Firebase Console**:
   - Ir a Firebase Console
   - Seleccionar tu proyecto
   - Ir a Firestore Database
   - Crear base de datos en modo de producción
   - Subir las reglas de seguridad desde `firestore.rules`

3. **Poblar datos de ejemplo** (opcional):
   ```bash
   npm run populate
   ```

4. **Probar formularios**:
   - Formulario de comprador
   - Formulario de propietario
   - Formulario de contacto general

## Notas Importantes

- Todos los formularios ahora guardan datos completos en Firestore
- Los campos dinámicos tienen valores por defecto para evitar datos faltantes
- El formulario de contacto general es completamente nuevo
- Las reglas de seguridad están configuradas para proteger los datos
- Los emails se envían con todos los datos completos

## Solución de Problemas

### Error: "Cannot find module 'firebase/database'"
- Asegúrate de que todos los archivos estén actualizados
- Verifica que no queden imports de Realtime Database

### Error: "Firestore rules not found"
- Sube las reglas de seguridad desde `firestore.rules` a Firebase Console

### Formularios no guardan datos completos
- Verifica que los componentes `BuyerEmail.tsx` y `OwnerEmail.tsx` estén actualizados
- Asegúrate de que el servicio `firestoreService.ts` esté correctamente importado 