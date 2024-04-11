export default function ServicesSection() {
  return (
    <section className="text-gray-800 dark:text-gold-50">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="max-w-screen-md mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-gold-400">
            Servicios de Agente Inmobiliario
          </h2>
          <p className="text-lg sm:text-xl">
            Información sobre los servicios proporcionados por un agente
            inmobiliario, como listados de propiedades, asistencia para comprar
            una casa y análisis de mercado.
          </p>
        </div>
        <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
          <div className="space-y-4">
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-gold-400 dark:bg-gold-700">
              <svg
                className="w-6 h-6 dark:text-black"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-gold-400">
              Listados de Propiedades
            </h3>
            <p>
              Explora nuestra extensa colección de propiedades en venta o
              alquiler. Encuentra la casa de tus sueños con la ayuda de nuestros
              experimentados agentes inmobiliarios.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-gold-400 dark:bg-gold-700">
              <svg
                className="w-6 h-6 dark:text-black"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-gold-400">
              Asistencia para Comprar una Casa
            </h3>
            <p>
              Permítenos guiarlo a través del proceso de compra de una casa.
              Desde encontrar la propiedad perfecta hasta negociar el mejor
              trato, estamos aquí para ayudarte.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-gold-400 dark:bg-gold-700">
              <svg
                className="w-6 h-6 dark:text-black"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-gold-400">
              Análisis de Mercado
            </h3>
            <p>
              Mantente informado sobre las últimas tendencias del mercado
              inmobiliario con nuestros detallados análisis y reportes. Toma
              decisiones informadas con nuestra ayuda.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
