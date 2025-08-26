# 🔥 INSTRUCCIONES PARA APLICAR LAS REGLAS DE FIRESTORE

## ⚠️ PROBLEMA IDENTIFICADO
El error "Missing or insufficient permissions" ocurre porque las reglas de Firestore requieren autenticación para escribir en las colecciones `owners`, `buyers` y `contacts`, pero los formularios de contacto se envían desde usuarios no autenticados.

## ✅ SOLUCIÓN IMPLEMENTADA
Se han actualizado las reglas de Firestore para permitir que usuarios no autenticados puedan enviar formularios (operación `create`), mientras mantienen la seguridad para lectura y modificación.

## 📋 CÓMO APLICAR LAS REGLAS

### Opción 1: Firebase Console (RECOMENDADO)
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto `inmapp-842fa`
3. En el menú lateral, ve a **Firestore Database**
4. Haz clic en la pestaña **Rules**
5. Copia y pega el contenido completo del archivo `firestore.rules`
6. Haz clic en **Publish** (Publicar)

### Opción 2: Firebase CLI
```bash
# Instalar Firebase CLI si no lo tienes
npm install -g firebase-tools

# Autenticarte
firebase login

# Aplicar las reglas
firebase deploy --only firestore:rules
```

## 🔒 REGLAS ACTUALIZADAS

### ANTES (Problemático):
```javascript
match /owners/{ownerId} {
  allow read, write: if request.auth != null; // ❌ Requiere autenticación para TODO
}
```

### AHORA (Solucionado):
```javascript
match /owners/{ownerId} {
  allow read: if request.auth != null;        // ✅ Solo admins pueden leer
  allow create: if true;                      // ✅ Cualquiera puede crear (formularios)
  allow update, delete: if request.auth != null; // ✅ Solo admins pueden modificar
}
```

## 🛡️ SEGURIDAD MANTENIDA

- ✅ **Lectura protegida**: Solo administradores pueden ver los datos
- ✅ **Creación pública**: Visitantes pueden enviar formularios
- ✅ **Modificación protegida**: Solo administradores pueden editar/eliminar
- ✅ **Datos seguros**: La información personal sigue protegida

## 🎯 RESULTADO ESPERADO

Después de aplicar las reglas:
- ✅ Los formularios de contacto funcionarán correctamente
- ✅ Los datos se guardarán en Firestore sin errores
- ✅ La seguridad se mantiene para operaciones administrativas
- ✅ No más error "Missing or insufficient permissions"

## 📱 VERIFICACIÓN

1. Aplica las reglas en Firebase Console
2. Recarga la página web
3. Envía un formulario de propietario
4. Deberías ver: "¡Datos guardados correctamente!"

---

**⚡ IMPORTANTE**: Las reglas se aplican inmediatamente después de publicarlas. No es necesario reiniciar la aplicación.