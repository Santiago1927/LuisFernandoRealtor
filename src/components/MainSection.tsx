import Image from "next/image";

export default function MainSection() {
  return (
    <main className="bg-dark-50 dark:bg-dark-800 w-full">
      <div className="grid px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 sm:px-6 md:px-8">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-gold-700 dark:text-gold-500">
            ¡Vende tu propiedad en tiempo récord!
          </h1>
          <p className="mb-6 font-light text-dark-900 dark:text-white lg:mb-8 md:text-lg lg:text-xl">
            Somos expertos en Bienes Raíces de Lujo. Nuestro equipo te garantiza
            encontrar compradores y cerrar las ventas rápidamente. No pierdas
            más tiempo, ¡comienza hoy mismo!
          </p>
          <div className="flex justify-center lg:justify-start">
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-dark-900 border border-gold-900 rounded-lg hover:bg-gold-700 focus:ring-4 focus:ring-gold-200 dark:text-white dark:border-gold-700 dark:hover:bg-gold-600 hover:dark:text-black dark:focus:ring-gold-800"
            >
              Hablar con un Agente
            </a>
          </div>
        </div>
        <div className="lg:mt-0 lg:col-span-5 lg:flex justify-center">
          <Image
            src="/images/home.webp"
            alt="mockup"
            layout="intrinsic"
            width={1000}
            height={1000}
          ></Image>
        </div>
      </div>
    </main>
  );
}
