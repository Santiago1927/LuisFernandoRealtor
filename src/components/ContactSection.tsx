'use client'

import { useState } from "react";
import BuyerEmail from "./BuyerEmail";
import OwnerEmail from "./OwnerEmail";
import ContactEmail from "./ContactEmail";
import { USER_ROLES } from "@/constants/constants";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Componente ContactSection - Sección de contacto principal
 * Permite a los usuarios seleccionar su rol y mostrar el formulario correspondiente
 */
export default function ContactSection() {
  // Estado para controlar qué tipo de usuario está seleccionado (propietario por defecto)
  const [roleUser, setRoleUser] = useState(USER_ROLES.OWNER);

  // Configuración de animaciones para las transiciones entre formularios
  const variants = {
    initial: { opacity: 0, y: 20 },    // Estado inicial: invisible y desplazado hacia abajo
    animate: { opacity: 1, y: 0 },     // Estado animado: visible y en posición
    exit: { opacity: 0, y: -20 },      // Estado de salida: invisible y desplazado hacia arriba
  };

  return (
    <section id="contacto" className="bg-secondary-50 dark:bg-secondary-800 text-secondary-900 dark:text-primary-50">
      <div className="py-12 lg:py-24 px-4 mx-auto max-w-screen-md">
        {/* Título principal de la sección */}
        <h2 className="mb-6 text-4xl font-bold text-center text-secondary-900 dark:text-primary-400">
          Contacta a un Agente Inmobiliario
        </h2>
        
        {/* Descripción explicativa de la sección */}
        <p className="mb-10 text-lg text-center">
          ¿Tienes alguna pregunta sobre comprar o vender una propiedad?
          ¿Necesitas ayuda para encontrar la casa perfecta o promocionar tu
          listado? Permítenos que nuestros experimentados agentes inmobiliarios
          te ayuden.
        </p>
        
        {/* Botones de selección de rol de usuario */}
        <div className="flex justify-center mb-10 space-x-4">
          {/* Botón para propietarios */}
          <button
            onClick={() => setRoleUser(USER_ROLES.OWNER)}
            className={`${
              roleUser === USER_ROLES.OWNER
                ? "bg-primary-500 text-secondary-900"
                : "bg-secondary-700 text-primary-50"
            } px-6 py-3 font-medium text-sm rounded-lg focus:outline-none focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-700`}
          >
            Soy Propietario
          </button>
          
          {/* Botón para compradores */}
          <button
            onClick={() => setRoleUser(USER_ROLES.BUYER)}
            className={`${
              roleUser === USER_ROLES.BUYER
                ? "bg-primary-500 text-secondary-900"
                : "bg-secondary-700 text-primary-50"
            } px-6 py-3 font-medium text-sm rounded-lg focus:outline-none focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-700`}
          >
            Soy Comprador
          </button>
          
          {/* Botón para contacto general */}
          <button
            onClick={() => setRoleUser("contact")}
            className={`${
              roleUser === "contact"
                ? "bg-primary-500 text-secondary-900"
                : "bg-secondary-700 text-primary-50"
            } px-6 py-3 font-medium text-sm rounded-lg focus:outline-none focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-700`}
          >
            Contacto General
          </button>
        </div>
        
        {/* Contenedor de animaciones para transiciones suaves entre formularios */}
        <AnimatePresence mode="wait">
          {/* Renderizado condicional del formulario según el rol seleccionado */}
          {roleUser === USER_ROLES.OWNER ? (
            // Formulario para propietarios con animación
            <motion.div
              key="owner"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <OwnerEmail />
            </motion.div>
          ) : roleUser === USER_ROLES.BUYER ? (
            // Formulario para compradores con animación
            <motion.div
              key="buyer"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <BuyerEmail />
            </motion.div>
          ) : (
            // Formulario de contacto general con animación
            <motion.div
              key="contact"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <ContactEmail />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
