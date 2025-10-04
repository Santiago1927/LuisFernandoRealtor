import UltraSafeImage from "@/components/ui/UltraSafeImage";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Award, Shield, MapPin, Phone } from "lucide-react";

export default function MainSection() {
  return (
    <main className="relative w-full min-h-screen flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 via-white to-amber-50/30 dark:from-zinc-900 dark:via-black dark:to-amber-900/10"></div>

      <div className="relative z-10 w-full">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center min-h-[80vh]">
            <div className="space-y-6 lg:space-y-8">
              <div className="flex items-center space-x-3">
                <Badge
                  variant="secondary"
                  className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800 px-3 py-1"
                >
                  <Award className="w-4 h-4 mr-1" />
                  Agente Certificado
                </Badge>
                <Badge
                  variant="outline"
                  className="border-zinc-300 dark:border-zinc-600 px-3 py-1"
                >
                  <Star className="w-4 h-4 mr-1 fill-amber-500 text-amber-500" />
                  5.0 Rating
                </Badge>
              </div>

              <div className="space-y-4 lg:space-y-6">
                <h1 className="text-5xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 leading-tight">
                  Propiedades de
                  <span className="block bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                    Lujo Exclusivo
                  </span>
                </h1>
                <p className="text-xl lg:text-3xl xl:text-4xl text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                  Descubre propiedades únicas en las mejores ubicaciones de
                  Colombia
                </p>
              </div>

              <p className="text-lg lg:text-xl text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-2xl">
                Aplicamos estrategias de marketing digital avanzadas para
                ayudarte a vender o comprar propiedades premium que superen tus
                expectativas.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-bold shadow-xl hover:shadow-2xl transition-all duration-300 text-lg px-8 py-6"
                >
                  <Link
                    href="/contacto"
                    className="flex items-center space-x-2"
                  >
                    <span>Hablar con un Agente</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-lg px-8 py-6"
                >
                  <Link href="/propiedades">Ver Propiedades</Link>
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 lg:gap-8 pt-6 lg:pt-8 border-t border-zinc-200 dark:border-zinc-800">
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-amber-600 dark:text-amber-400">
                    500+
                  </div>
                  <div className="text-sm lg:text-base text-zinc-600 dark:text-zinc-400">
                    Propiedades Vendidas
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-amber-600 dark:text-amber-400">
                    98%
                  </div>
                  <div className="text-sm lg:text-base text-zinc-600 dark:text-zinc-400">
                    Satisfacción
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-amber-600 dark:text-amber-400">
                    15+
                  </div>
                  <div className="text-sm lg:text-base text-zinc-600 dark:text-zinc-400">
                    Años de Experiencia
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-2 text-zinc-600 dark:text-zinc-400">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">+57 321 422 3931</span>
                </div>
                <div className="flex items-center space-x-2 text-zinc-600 dark:text-zinc-400">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Pasto, Colombia</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <UltraSafeImage
                  src="/images/home.webp"
                  alt="Propiedad de lujo exclusiva"
                  width={800}
                  height={900}
                  className="w-full h-auto object-cover"
                  priority
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <Card className="border-0 shadow-xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                  Experiencia Premium
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-lg">
                  Más de 15 años en el mercado de bienes raíces de lujo
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center">
                  <Star className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                  Atención Personalizada
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-lg">
                  Servicio exclusivo y dedicado para cada cliente
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                  Transparencia Total
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-lg">
                  Procesos claros y honestos en cada transacción
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                  Garantía de Calidad
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-lg">
                  Propiedades verificadas y de alta calidad
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}
