# 🔧 Instrucciones para Debuggear los Filtros

## 📋 **Pasos para Diagnosticar el Problema**

### 1. **Abrir la Aplicación Web**
```bash
npm run dev
```
- Ve a: http://localhost:3000/propiedades

### 2. **Abrir Herramientas de Desarrollo**
- **Chrome/Edge**: Presiona `F12` o `Ctrl+Shift+I`
- **Firefox**: Presiona `F12`
- Ve a la pestaña **"Console"**

### 3. **Buscar los Logs de Debug**
En la consola deberías ver mensajes como:
```
🔍 Intentando cargar propiedades de Firebase...
📋 Intentando getAllProperties...
✅ Cargadas 19 propiedades de Firebase
🏠 Propiedades cargadas en la página: 12
📊 Total de propiedades: 19
🏷️ Tipos encontrados: ["Casa", "Apartamento"]
```

### 4. **Probar el Filtro de Tipo**
1. En la página de propiedades, abre el dropdown "Tipo de Propiedad"
2. Selecciona **"Casa"**
3. Observa los logs en la consola
4. Deberías ver:
   ```
   🔍 Filtros aplicados: {type: "Casa"}
   📄 Mostrando página 1: X de Y propiedades
   ```

### 5. **Posibles Problemas y Soluciones**

#### ❌ **Si ves "Using sample data":**
- **Problema**: No se puede conectar a Firebase
- **Solución**: Aplicar reglas de Firebase Console
- **Archivo**: `firebase-rules-instructions.md`

#### ❌ **Si ves "Error al cargar de Firebase":**
- **Problema**: Reglas de Firebase no aplicadas
- **Solución**: 
  1. Ve a [Firebase Console](https://console.firebase.google.com/)
  2. Proyecto: `inmapp-842fa`
  3. Firestore Database → Rules
  4. Aplica las reglas del archivo `firebase-rules-instructions.md`

#### ❌ **Si los filtros no cambian las propiedades:**
- **Problema**: Lógica de filtrado
- **Solución**: Revisar logs de filtros aplicados

### 6. **Script de Verificación Rápida**
```bash
# Verificar conexión
npx tsx scripts/testConnection.ts

# Verificar filtros
npx tsx scripts/testTypeFilters.ts
```

### 7. **Qué Reportar**
Copia y pega los logs de la consola del navegador, especialmente:
- Mensajes que empiecen con 🔍, 📋, ✅, ❌
- Cualquier error en rojo
- Los logs de filtros aplicados

---

## ✅ **Funcionamiento Esperado**

Cuando todo funcione correctamente verás:
1. **19 propiedades** cargadas de Firebase (no datos de ejemplo)
2. **Filtro por Casa**: Debería mostrar ~12 propiedades
3. **Filtro por Apartamento**: Debería mostrar ~4 propiedades
4. **Combinación de filtros**: Funciona correctamente 