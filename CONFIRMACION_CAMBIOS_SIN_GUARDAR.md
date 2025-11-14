# Implementación de Confirmación de Cierre con Cambios Sin Guardar

## Resumen

Se ha implementado una funcionalidad que detecta cuando el usuario intenta cerrar el formulario de edición de propiedades con cambios sin guardar, mostrando un diálogo de confirmación.

## Archivos Modificados

### 1. **src/components/ui/alert-dialog.tsx** (NUEVO)

- Componente de diálogo de alerta creado usando Radix UI
- Proporciona componentes para mostrar alertas modales con acciones
- Incluye: `AlertDialog`, `AlertDialogContent`, `AlertDialogHeader`, `AlertDialogTitle`, `AlertDialogDescription`, `AlertDialogFooter`, `AlertDialogAction`, `AlertDialogCancel`

### 2. **src/hooks/usePropertyFormLogic.ts**

#### Cambios realizados:

- ✅ **Agregado estado para detectar cambios:**

  ```typescript
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  ```

- ✅ **Agregados refs para datos iniciales:**

  ```typescript
  const initialFormDataRef = useRef<PropertyFormData>(getInitialFormData());
  const initialImagesRef = useRef<string[]>(property?.images || []);
  const initialVideosRef = useRef<string[]>(property?.videos || []);
  ```

- ✅ **Agregado useEffect para detectar cambios:**

  - Compara `formData` con datos iniciales
  - Detecta imágenes/videos nuevos agregados
  - Detecta imágenes/videos existentes eliminados
  - Actualiza `hasUnsavedChanges` automáticamente

- ✅ **Reset de estado después de guardar:**

  - Al actualizar una propiedad, actualiza las refs con los nuevos datos
  - Al crear una propiedad, simplemente resetea el flag
  - Permite continuar editando sin falsos positivos

- ✅ **Exportado hasUnsavedChanges en el return:**
  ```typescript
  return {
    // ... otros valores
    hasUnsavedChanges, // Nuevo
  };
  ```

### 3. **src/components/admin/PropertyForm.tsx**

#### Cambios realizados:

- ✅ **Importado AlertDialog y AlertTriangle:**

  ```typescript
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog";
  import { AlertTriangle } from "lucide-react";
  ```

- ✅ **Agregado hasUnsavedChanges del hook:**

  ```typescript
  const {
    // ... otros valores
    hasUnsavedChanges, // Nuevo
  } = usePropertyFormLogic({ property, onSave, onClose });
  ```

- ✅ **Agregado estado para controlar el diálogo:**

  ```typescript
  const [showCloseDialog, setShowCloseDialog] = useState(false);
  ```

- ✅ **Agregada función handleCloseAttempt:**

  - Verifica si hay cambios sin guardar
  - Si hay cambios, muestra el diálogo de confirmación
  - Si no hay cambios, cierra directamente

- ✅ **Agregada función handleDiscardChanges:**

  - Cierra el diálogo
  - Descarta los cambios y cierra el formulario

- ✅ **Actualizados botones de cerrar:**

  - Botón X del header: `onClick={handleCloseAttempt}`
  - Botón "Cancelar" del footer: `onClick={handleCloseAttempt}`

- ✅ **Agregado diálogo de confirmación:**

  ```tsx
  <AlertDialog open={showCloseDialog} onOpenChange={setShowCloseDialog}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>¿Cerrar sin guardar?</AlertDialogTitle>
        <AlertDialogDescription>
          Tienes cambios sin guardar...
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Continuar editando</AlertDialogCancel>
        <AlertDialogAction onClick={handleDiscardChanges}>
          Descartar cambios
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  ```

- ✅ **Envuelto en fragmento (<></>):**
  - Permite renderizar tanto el formulario como el diálogo

## Funcionamiento

### Detección de Cambios

El sistema detecta cambios en:

1. **Datos del formulario** - Cualquier campo modificado
2. **Imágenes nuevas** - Archivos agregados pero no guardados
3. **Videos nuevos** - Archivos agregados pero no guardados
4. **Imágenes eliminadas** - URLs de imágenes existentes removidas
5. **Videos eliminados** - URLs de videos existentes removidas

### Flujo de Usuario

#### Escenario 1: Cerrar sin cambios

1. Usuario abre el formulario de edición
2. Usuario hace clic en "X" o "Cancelar" sin hacer cambios
3. **Resultado:** Formulario se cierra inmediatamente

#### Escenario 2: Cerrar con cambios sin guardar

1. Usuario abre el formulario de edición
2. Usuario modifica un campo (ej: título, precio, etc.)
3. Usuario hace clic en "X" o "Cancelar"
4. **Resultado:** Se muestra diálogo de confirmación
   - **Opción 1:** "Continuar editando" - Cierra el diálogo, permanece en el formulario
   - **Opción 2:** "Descartar cambios" - Cierra el diálogo y el formulario, descarta cambios

#### Escenario 3: Guardar cambios

1. Usuario hace cambios en el formulario
2. Usuario hace clic en "Actualizar" o "Crear"
3. Propiedad se guarda exitosamente
4. **Resultado:**
   - Estado de cambios se resetea
   - Si el usuario continúa editando, la detección usa los nuevos datos guardados como referencia
   - Si el usuario cierra, no muestra confirmación (ya guardó)

## Dependencias Instaladas

```bash
npm install @radix-ui/react-alert-dialog
```

## Estilo del Diálogo

- Fondo con overlay oscuro y blur
- Título con icono de advertencia (⚠️ AlertTriangle) en amarillo
- Descripción clara del problema
- Botones:
  - **"Continuar editando"** - Estilo outline, cancel
  - **"Descartar cambios"** - Estilo destructivo, rojo (bg-red-600)
- Soporte para tema claro y oscuro

## Beneficios

✅ **Previene pérdida de datos** - Usuario no pierde cambios accidentalmente
✅ **UX mejorada** - Confirmación clara antes de acciones destructivas
✅ **Detección inteligente** - Solo muestra confirmación cuando hay cambios reales
✅ **Reset automático** - Después de guardar, no molesta al usuario
✅ **Consistencia** - Funciona igual en todos los puntos de cierre (X, Cancelar, ESC)

## Testing Manual Recomendado

1. ✅ Abrir formulario de edición → Cerrar sin cambios → Debe cerrar sin confirmación
2. ✅ Abrir formulario de edición → Modificar título → Cerrar → Debe mostrar confirmación
3. ✅ Hacer cambios → Guardar → Cerrar → Debe cerrar sin confirmación
4. ✅ Hacer cambios → Agregar imagen → Cerrar → Debe mostrar confirmación
5. ✅ Abrir formulario nuevo → Llenar campos → Cerrar → Debe mostrar confirmación
6. ✅ En diálogo: Clic en "Continuar editando" → Debe permanecer en formulario
7. ✅ En diálogo: Clic en "Descartar cambios" → Debe cerrar formulario

## Estado

✅ **IMPLEMENTACIÓN COMPLETADA**
✅ **SIN ERRORES DE TYPESCRIPT**
✅ **LISTA PARA PRUEBAS**
