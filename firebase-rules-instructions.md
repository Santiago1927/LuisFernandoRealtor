# 🔥 Configuración de Reglas de Firebase

## ⚠️ IMPORTANTE: Aplica estas reglas en Firebase Console

Para que funcione la aplicación y se muestren las 18 propiedades, necesitas aplicar estas reglas en Firebase Console:

### 📋 Pasos:

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto: `inmapp-842fa`
3. Ve a **Firestore Database** → **Rules**
4. Copia y pega exactamente este código:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // ✅ PROPIEDADES - LECTURA PÚBLICA
    match /properties/{propertyId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // 🔒 OTRAS COLECCIONES - SOLO AUTENTICADOS
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

5. Haz clic en **"Publicar"**
6. Recarga la aplicación web

### 🎯 ¿Qué hace esto?

- **Propiedades**: Cualquiera puede leerlas (necesario para mostrar en el sitio web)
- **Otras colecciones**: Solo usuarios autenticados pueden acceder

### ✅ Después de aplicar las reglas:

La aplicación debería cargar automáticamente las 18 propiedades que tienes en Firebase y los filtros funcionarán correctamente.

---

## 🏷️ Filtros de Tipo de Propiedad Solucionados

### 🔧 **Problema Detectado**
Algunas propiedades en tu base de datos tienen tipos en inglés (`house`, `apartment`, `commercial`, `land`) mientras que la aplicación espera tipos en español.

### ✅ **Solución Implementada**
He agregado un sistema de mapeo automático que convierte tipos en inglés a español:

- `house` → `Casa`
- `apartment` → `Apartamento` 
- `commercial` → `Local`
- `land` → `Lote`

### 🛠️ **Scripts Disponibles**

#### 1. **Probar Conexión:**
```bash
npm run test-firebase
```

#### 2. **Probar Filtros de Tipo:**
```bash
npm run test-types
```

#### 3. **Migrar Tipos Automáticamente:**
```bash
# Ver qué se va a migrar
npm run migrate-types

# Ejecutar migración
npm run migrate-types -- --confirm
```

### 🎯 **Filtros que Ahora Funcionan:**

- ✅ **Búsqueda por nombre**: Busca en título, descripción y dirección
- ✅ **Filtro por ciudad**: Medellín, Bogotá, Cali, Pasto
- ✅ **Filtro por tipo**: Casa, Apartamento, Local, Casa Campestre, Penthouse, etc.
- ✅ **Filtros de precio**: Mínimo y máximo
- ✅ **Combinación de filtros**: Todos los filtros se pueden usar juntos
- ✅ **Paginación**: Funciona correctamente con filtros aplicados

### 🚀 **Compatibilidad Completa**
El sistema ahora maneja automáticamente:
- Propiedades nuevas (tipos en español)
- Propiedades existentes (tipos en inglés convertidos automáticamente)
- Filtros funcionan con ambos formatos sin problemas

---

**Nota**: Si las reglas ya están aplicadas y aún hay problemas, verifica que la configuración en `firebase/firebaseConfig.ts` sea correcta. 