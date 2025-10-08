import Link from "next/link";

export default function EmailTemplatesIndex() {
  const templates = [
    {
      name: "🏠 Buyer Email Template",
      description: "Plantilla para consultas de compradores",
      href: "/emails/buyer",
      color: "bg-blue-500",
      icon: "🏠",
    },
    {
      name: "🏘️ Owner Email Template",
      description: "Plantilla para propietarios que quieren vender",
      href: "/emails/owner",
      color: "bg-green-500",
      icon: "🏘️",
    },
    {
      name: "💌 Contact Email Template",
      description: "Plantilla para mensajes de contacto general",
      href: "/emails/contact",
      color: "bg-purple-500",
      icon: "💌",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            📧 Plantillas de Email
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Previsualiza las plantillas optimizadas para Gmail de Luis Fernando
            Realtor. Cada plantilla está diseñada para verse perfecta en todos
            los clientes de email.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {templates.map((template, index) => (
            <Link
              key={`email-template-${index}-${template.name}`}
              href={template.href}
              className="block group"
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-200 group-hover:scale-105 group-hover:shadow-xl">
                <div
                  className={`${template.color} h-32 flex items-center justify-center`}
                >
                  <div className="text-white text-center">
                    <div className="text-4xl mb-2">{template.icon}</div>
                    <div className="font-semibold">Previsualizar</div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {template.name}
                  </h3>
                  <p className="text-gray-600">{template.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            🎯 Características de las Plantillas
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <span className="text-green-500 mr-2">✅</span>
                Optimización para Gmail
              </h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Máximo ancho de 600px</li>
                <li>• Fuentes seguras para email</li>
                <li>• Colores que funcionan en modo claro y oscuro</li>
                <li>• Estructura de tabla para compatibilidad</li>
                <li>• Imágenes con fallbacks de texto</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <span className="text-blue-500 mr-2">📱</span>
                Diseño Responsivo
              </h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Adaptación automática para móviles</li>
                <li>• Botones táctiles grandes</li>
                <li>• Texto legible en pantallas pequeñas</li>
                <li>• Layout que se apila correctamente</li>
                <li>• Media queries optimizadas</li>
              </ul>
            </div>
          </div>

          <div className="bg-custom-50 border border-custom-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-custom-800 mb-2 flex items-center">
              <span className="mr-2">⚙️</span>
              Configuración de Desarrollo
            </h3>
            <p className="text-custom-700 text-sm mb-4">
              Para usar React Email en desarrollo, ejecuta el siguiente comando:
            </p>
            <code className="bg-custom-100 text-custom-800 px-3 py-1 rounded text-sm font-mono">
              npm run email
            </code>
            <p className="text-custom-700 text-sm mt-2">
              Esto abrirá el servidor de React Email en{" "}
              <code>localhost:3001</code>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-custom-500 text-white font-semibold rounded-lg hover:bg-custom-600 transition-colors"
          >
            ← Volver al sitio principal
          </Link>
        </div>
      </div>
    </div>
  );
}
