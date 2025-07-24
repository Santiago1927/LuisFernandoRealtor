import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Award, Shield } from "lucide-react";

export default function MainSection() {
  return (
    <main className="relative w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 via-white to-amber-50/30 dark:from-zinc-900 dark:via-black dark:to-amber-900/10"></div>
      
      <div className="relative z-10">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            <div className="space-y-8">
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800">
                  <Award className="w-3 h-3 mr-1" />
                  Agente Certificado
                </Badge>
                <Badge variant="outline" className="border-zinc-300 dark:border-zinc-600">
                  <Star className="w-3 h-3 mr-1 fill-amber-500 text-amber-500" />
                  5.0 Rating
                </Badge>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 leading-tight">
                  Propiedades de
                  <span className="block bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                    Lujo Exclusivo
                  </span>
                </h1>
                <p className="text-xl lg:text-2xl text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                  Descubre propiedades únicas en las mejores ubicaciones de Colombia
                </p>
              </div>

              <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-2xl">
                Aplicamos estrategias de marketing digital avanzadas para ayudarte a vender 
                o comprar propiedades premium que superen tus expectativas.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link href="/contacto" className="flex items-center space-x-2">
                    <span>Hablar con un Agente</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                
                <Button 
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                >
                  <Link href="/propiedades">Ver Propiedades</Link>
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-zinc-200 dark:border-zinc-800">
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">500+</div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">Propiedades Vendidas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">98%</div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">Satisfacción</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">15+</div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">Años de Experiencia</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/home.webp"
                  alt="Propiedad de lujo exclusiva"
                  width={600}
                  height={700}
                  className="w-full h-auto object-cover"
                  priority
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>

              <Card className="absolute -bottom-6 -left-6 bg-white/95 dark:bg-zinc-900/95 backdrop-blur border-0 shadow-xl">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-zinc-900 dark:text-zinc-100">
                        Garantía de Calidad
                      </div>
                      <div className="text-sm text-zinc-600 dark:text-zinc-400">
                        Propiedades verificadas
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-white/80 dark:bg-zinc-900/80 backdrop-blur">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                  Experiencia Premium
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Más de 15 años en el mercado de bienes raíces de lujo
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 dark:bg-zinc-900/80 backdrop-blur">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                  Atención Personalizada
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Servicio exclusivo y dedicado para cada cliente
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 dark:bg-zinc-900/80 backdrop-blur">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                  Transparencia Total
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Procesos claros y honestos en cada transacción
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}
