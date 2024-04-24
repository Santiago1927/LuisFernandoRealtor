import Image from "next/image";
import ThemeToggleButton from "./ThemeToggleButton";

const links = [
  { href: "#servicios", text: "Servicios" },
  { href: "#nosotros", text: "Nosotros" },
  { href: "#contacto", text: "Contacto" },
];

export default function Header() {
  return (
    <header className="fixed top-0 left-0 z-10 flex justify-between items-center py-5 w-full px-5 lg:px-32 xl:px-40 bg-secondary-50 dark:bg-secondary-800 shadow-md">
      <a href="#">
        <Image
          width={40}
          height={40}
          alt="Luis Fernando Realtor - Logo"
          src="/logo.svg"
        ></Image>
      </a>
      <nav className="flex flex-row gap-x-4 text-sm sm:text-base">
        {links.map((link) => (
          <a
            key={link.href}
            className="text-secondary-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 focus:text-primary-600 dark:focus:text-primary-400 transition-colors font-semibold"
            href={link.href}
          >
            {link.text}
          </a>
        ))}
      </nav>
      <ThemeToggleButton />
    </header>
  );
}
