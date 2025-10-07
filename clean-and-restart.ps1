# Script para limpiar caché de Next.js y reiniciar el servidor
Write-Host "🧹 Limpiando caché de Next.js..." -ForegroundColor Cyan

# Eliminar carpeta .next
if (Test-Path ".next") {
    Remove-Item -Recurse -Force .next
    Write-Host "✅ Carpeta .next eliminada" -ForegroundColor Green
} else {
    Write-Host "⚠️  No se encontró carpeta .next" -ForegroundColor Yellow
}

# Eliminar carpeta node_modules/.cache si existe
if (Test-Path "node_modules/.cache") {
    Remove-Item -Recurse -Force "node_modules/.cache"
    Write-Host "✅ Caché de node_modules eliminada" -ForegroundColor Green
}

Write-Host ""
Write-Host "✨ Caché limpiada exitosamente" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Ahora ejecuta: npm run dev" -ForegroundColor Cyan
