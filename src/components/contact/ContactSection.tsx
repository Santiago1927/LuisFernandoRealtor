"use client";

import { useState } from "react";
import OwnerEmail from "./emails/OwnerEmail";
import ContactEmail from "./emails/ContactEmail";
import BuyerEmail from "./emails/BuyerEmail";
import { USER_ROLES } from "@/constants/constants";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Home, MessageSquare, ArrowRight, Building2 } from "lucide-react";

export default function ContactSection() {
  const [roleUser, setRoleUser] = useState(USER_ROLES.OWNER);

  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const roleOptions = [
    {
      id: USER_ROLES.OWNER,
      label: "Soy propietario",
      description: "Vender o alquilar mi propiedad",
      icon: Building2,
      color: "from-amber-500 to-yellow-600",
    },
    {
      id: USER_ROLES.BUYER,
      label: "Soy comprador",
      description: "Encontrar mi próxima propiedad",
      icon: Home,
      color: "from-zinc-600 to-zinc-800",
    },
    {
      id: "contact",
      label: "Contacto general",
      description: "Consulta o asesoría personalizada",
      icon: MessageSquare,
      color: "from-zinc-600 to-zinc-800",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-zinc-50 via-white to-amber-50/30 dark:from-zinc-900 dark:via-black dark:to-amber-900/10 py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge
              variant="secondary"
              className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800 mb-4"
            >
              Contacto directo
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
              Contacta a un agente inmobiliario
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed">
              ¿Tienes alguna pregunta sobre comprar o vender inmueble?
              ¿Necesitas ayuda para encontrar la casa perfecta o promocionar tu
              listado? Permítenos que nuestros experimentados agentes
              inmobiliarios te ayuden.
            </p>
          </div>

          <Card className="border-0 shadow-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur">
            <CardContent className="p-8 lg:p-12">
              <div className="grid md:grid-cols-3 gap-4 mb-12">
                {roleOptions.map((option) => {
                  const IconComponent = option.icon;
                  const isActive = roleUser === option.id;

                  return (
                    <Button
                      key={option.id}
                      variant="ghost"
                      onClick={() => setRoleUser(option.id)}
                      className={`h-auto p-6 text-left transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-br from-amber-500 to-yellow-600 text-white shadow-lg scale-105"
                          : "bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                      }`}
                    >
                      <div className="flex flex-col items-start space-y-3">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            isActive
                              ? "bg-white/20"
                              : "bg-gradient-to-br from-amber-500 to-yellow-600"
                          }`}
                        >
                          <IconComponent
                            className={`w-6 h-6 ${
                              isActive ? "text-white" : "text-white"
                            }`}
                          />
                        </div>
                        <div>
                          <h3
                            className={`font-semibold text-lg ${
                              isActive
                                ? "text-white"
                                : "text-zinc-900 dark:text-zinc-100"
                            }`}
                          >
                            {option.label}
                          </h3>
                          <p
                            className={`text-sm mt-1 ${
                              isActive
                                ? "text-amber-100"
                                : "text-zinc-500 dark:text-zinc-400"
                            }`}
                          >
                            {option.description}
                          </p>
                        </div>
                        {isActive && (
                          <ArrowRight className="w-4 h-4 text-white ml-auto" />
                        )}
                      </div>
                    </Button>
                  );
                })}
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-yellow-600/5 rounded-xl"></div>
                <div className="relative">
                  <AnimatePresence mode="wait">
                    {roleUser === USER_ROLES.OWNER ? (
                      <motion.div
                        key="owner"
                        variants={variants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="transition-all duration-300"
                      >
                        <OwnerEmail />
                      </motion.div>
                    ) : roleUser === USER_ROLES.BUYER ? (
                      <motion.div
                        key="buyer"
                        variants={variants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="transition-all duration-300"
                      >
                        <BuyerEmail />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="contact"
                        variants={variants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="transition-all duration-300"
                      >
                        <ContactEmail />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              Tu información está segura con nosotros. Respetamos tu privacidad.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
