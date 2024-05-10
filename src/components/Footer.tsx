import Image from "next/image";

export default function Footer() {
  return (
    <footer className="p-4 sm:p-6 border-t border-black dark:border-white bg-secondary-50 dark:bg-secondary-800">
      <div className="mx-auto max-w-screen-xl">
        <div className="md:flex md:justify-between">
          <div className="mb-0 flex justify-center md:justify-start">
            <a href="#" className="flex items-center">
              <Image
                src="/logo.svg"
                className="mr-3 h-8"
                alt="Logo"
                width={40}
                height={40}
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Luis Fernando Realtor
              </span>
            </a>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-center md:justify-between text-center md:text-left">
            <div>
              {/* <h2 className="mb-6 text-md font-bold uppercase text-black dark:text-white">
                Información
              </h2> */}
              {/* <ul className=""> */}
                {/* <li className="mb-4">
                  <a
                    href="#servicios"
                    className="hover:underline text-black dark:text-white"
                  >
                    Servicios
                  </a>
                </li> */}
                {/* <li>
                  <a
                    href="#nosotros"
                    className="hover:underline text-black dark:text-white"
                  >
                    Nosotros
                  </a>
                </li> */}
              {/* </ul> */}
            </div>
            <div>
              <h2 className="mb-6 text-md font-bold uppercase text-black dark:text-white">
                Siguenos
              </h2>
              <ul className=" ">
                <li className="mb-4">
                  <a
                    href="https://www.tiktok.com/@luisfernandorealtor"
                    className="hover:underline text-black dark:text-white"
                    target="_blank"
                  >
                    TikTok
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/luisfernandorealtor/"
                    className="hover:underline text-black dark:text-white"
                    target="_blank"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-md font-bold uppercase text-black dark:text-white">
                Contacto
              </h2>
              <ul className=" ">
                <li className="mb-4">
                  <a
                    href="tel:+573214223931"
                    className="hover:underline text-black dark:text-white"
                  >
                    +57 3251256487
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:realtorluisfernando@gmail.com"
                    className="hover:underline text-black dark:text-white"
                  >
                    realtorluisfernando@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-black sm:mx-auto dark:border-white lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between sm:flex-row-reverse text-center">
          <div className="flex mb-3 space-x-6 justify-center sm:mt-0">
            <a
              href="https://www.tiktok.com/@luisfernandorealtor"
              className="text-black dark:text-primary-400 hover:text-primary-950"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-brand-tiktok"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M21 7.917v4.034a9.948 9.948 0 0 1 -5 -1.951v4.5a6.5 6.5 0 1 1 -8 -6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/luisfernandorealtor/"
              className="text-black dark:text-primary-400 hover:text-primary-950"
              target="_blank"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
          </div>
          <span className="mb-3 text-sm sm:text-center text-black dark:text-white">
            © 2024
            <a
              href="https://flowbite.com"
              className="hover:underline text-black dark:text-white"
            >
              Luis Fernando Realtor ™
            </a>
            | Todos los derechos reservados | Desarrollado por {''}
            <a
              href="https://santiagosalas.com"
              className="hover:underline font-bold text-black dark:text-white"
              target="_blank"
            >
              Santiago Salas.
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
