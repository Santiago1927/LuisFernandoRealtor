# Ejemplos de Uso del Color Tomate

## Clases Disponibles

El nuevo color **tomate** está disponible con la siguiente paleta:

```css
tomato-50: #fff4ed    /* Muy claro */
tomato-100: #ffe6d5   /* Claro */
tomato-200: #ffc9aa   /* Claro medio */
tomato-300: #ffa574   /* Medio */
tomato-400: #ff7a3c   /* Medio oscuro */
tomato-500: #ff5c1a   /* Base/Default */
tomato-600: #f04010   /* Oscuro */
tomato-700: #c7300f   /* Más oscuro */
tomato-800: #9e2814   /* Muy oscuro */
tomato-900: #7f2514   /* Ultra oscuro */
```

## Ejemplos de Uso en Componentes

### Botones con Color Tomate

```tsx
// Botón sólido tomate
<Button className="bg-tomato-500 hover:bg-tomato-600 text-white">
  Comprar
</Button>

// Botón con gradiente tomate
<Button className="bg-gradient-to-r from-tomato-500 to-tomato-600 hover:from-tomato-600 hover:to-tomato-700 text-white">
  Comprar Ahora
</Button>

// Botón outline tomate
<Button className="border-2 border-tomato-500 text-tomato-600 hover:bg-tomato-50">
  Ver Más
</Button>
```

### Badges y Etiquetas

```tsx
// Badge tomate
<Badge className="bg-tomato-100 text-tomato-800 border-tomato-200">
  Nuevo
</Badge>

// Badge oscuro
<Badge className="bg-tomato-600 text-white">
  Destacado
</Badge>
```

### Cards con Acento Tomate

```tsx
<Card className="border-l-4 border-tomato-500 hover:shadow-tomato-100">
  <CardHeader className="bg-tomato-50">
    <CardTitle className="text-tomato-900">Título</CardTitle>
  </CardHeader>
  <CardContent>Contenido...</CardContent>
</Card>
```

### Texto con Color Tomate

```tsx
// Texto tomate
<p className="text-tomato-600">Texto en tomate</p>

// Texto con hover
<a className="text-tomato-500 hover:text-tomato-700">
  Enlace tomate
</a>

// Título con gradiente tomate
<h1 className="text-transparent bg-clip-text bg-gradient-to-r from-tomato-500 to-tomato-700">
  Título con Gradiente
</h1>
```

### Fondos y Borders

```tsx
// Fondo tomate claro
<div className="bg-tomato-50 border border-tomato-200">
  Contenido con fondo claro
</div>

// Fondo tomate con hover
<div className="bg-white hover:bg-tomato-50 transition-colors">
  Hover effect
</div>

// Border tomate
<div className="border-2 border-tomato-500 rounded-lg">
  Con borde tomate
</div>
```

### Iconos con Color Tomate

```tsx
import { Heart, ShoppingCart } from "lucide-react";

<Heart className="w-5 h-5 text-tomato-500 fill-tomato-500" />
<ShoppingCart className="w-6 h-6 text-tomato-600" />
```

## Combinaciones Recomendadas

### Tomate + Zinc (Contraste moderno)

```tsx
<div className="bg-zinc-900 p-6">
  <Button className="bg-tomato-500 hover:bg-tomato-600 text-white">
    Botón Tomate
  </Button>
</div>
```

### Tomate + White (Limpio y brillante)

```tsx
<div className="bg-white shadow-lg">
  <div className="bg-tomato-50 border-b-2 border-tomato-200 p-4">
    <h2 className="text-tomato-700 font-bold">Título</h2>
  </div>
</div>
```

### Tomate en Dark Mode

```tsx
<div className="bg-white dark:bg-zinc-900">
  <Button className="bg-tomato-500 dark:bg-tomato-600 hover:bg-tomato-600 dark:hover:bg-tomato-700 text-white">
    Responsive Dark Mode
  </Button>
  <p className="text-tomato-600 dark:text-tomato-400">
    Texto que se adapta al modo oscuro
  </p>
</div>
```

## Reemplazando Colores Existentes

Si quieres cambiar los colores naranja actuales por tomate:

```tsx
// ANTES (con orange)
<Badge className="bg-orange-100 text-orange-800">Nuevo</Badge>

// DESPUÉS (con tomato)
<Badge className="bg-tomato-100 text-tomato-800">Nuevo</Badge>
```

## Casos de Uso Recomendados

1. **Botones de CTA (Call to Action)**: `bg-tomato-500`
2. **Alertas importantes**: `bg-tomato-50 border-tomato-300`
3. **Badges de "Nuevo"**: `bg-tomato-100 text-tomato-800`
4. **Highlights**: `text-tomato-600`
5. **Links importantes**: `text-tomato-500 hover:text-tomato-700`
6. **Iconos de acción**: `text-tomato-500`

## Accesibilidad

Combinaciones con buen contraste:

- ✅ `text-tomato-600` sobre `bg-white`
- ✅ `text-tomato-900` sobre `bg-tomato-100`
- ✅ `text-white` sobre `bg-tomato-600`
- ✅ `text-white` sobre `bg-tomato-700`
- ❌ Evitar: `text-tomato-300` sobre `bg-white` (bajo contraste)
