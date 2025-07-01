'use client';
import Image from 'next/image';
import ThemeToggleButton from '../../components/ThemeToggleButton';
import ContactSection from '../../components/ContactSection';

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-secondary-800">
      <div className="flex justify-end p-4">
        <ThemeToggleButton />
      </div>
      
      {/* Formularios de contacto */}
      <ContactSection />

      {/* Información de contacto profesional */}
      <section className="bg-yellow-50 dark:bg-yellow-900/20 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-yellow-800 dark:text-yellow-200 mb-4">
              Información de Contacto
            </h2>
            <p className="text-lg text-yellow-700 dark:text-yellow-300 max-w-2xl mx-auto">
              Estamos aquí para ayudarte con todas tus necesidades inmobiliarias. 
              Contáctanos a través de cualquiera de estos medios.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Email */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border-l-4 border-yellow-500 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Email</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-2">Envíanos un correo electrónico</p>
              <a 
                href="mailto:contacto@luisfernandorealtor.com" 
                className="text-yellow-600 dark:text-yellow-400 font-medium hover:text-yellow-700 dark:hover:text-yellow-300 transition-colors"
              >
                contacto@luisfernandorealtor.com
              </a>
            </div>

            {/* Teléfono */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border-l-4 border-yellow-500 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Teléfono</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-2">Llámanos directamente</p>
              <a 
                href="tel:+573001234567" 
                className="text-yellow-600 dark:text-yellow-400 font-medium hover:text-yellow-700 dark:hover:text-yellow-300 transition-colors"
              >
                +57 300 123 4567
              </a>
            </div>

            {/* Dirección */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border-l-4 border-yellow-500 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Oficina</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-2">Visítanos en nuestra oficina</p>
              <p className="text-yellow-600 dark:text-yellow-400 font-medium">
                Calle 123 #45-67<br />
                Medellín, Colombia
              </p>
            </div>
          </div>

          {/* Imagen y descripción adicional */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  ¿Por qué elegirnos?
                </h3>
                <div className="space-y-3 text-gray-600 dark:text-gray-300">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                    <span>Experiencia de más de 10 años en el mercado inmobiliario</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                    <span>Atención personalizada y profesional</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                    <span>Estrategias de marketing digital innovadoras</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                    <span>Resultados garantizados en tiempo récord</span>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <Image 
                  src="/images/email.png" 
                  alt="Contacto Profesional" 
                  width={200} 
                  height={200} 
                  className="rounded-lg shadow-md" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 