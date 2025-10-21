"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ContactSection from "../../components/contact/ContactSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  MapPin,
  Star,
  CheckCircle,
  Award,
  Users,
  Target,
} from "lucide-react";

export default function ContactoPage() {
  const [videoError, setVideoError] = useState(false);

  // Función para probar la accesibilidad del video - comentado temporalmente
  /*
  useEffect(() => {
    const testVideoUrl = async () => {
      const videoUrl =
        "https://firebasestorage.googleapis.com/v0/b/inmapp-842fa.firebasestorage.app/o/video%2FWhatsApp%20Video%202025-10-07%20at%2011.05.51%20PM.mp4?alt=media&token=d47d27a2-54bb-4bc5-82f1-1b593dd0a3ef";

      try {
        console.log("🔍 Testing video URL:", videoUrl);
        const response = await fetch(videoUrl, { method: "HEAD" });
        
        const headers: Record<string, string> = {};
        try {
          // Safely extract headers
          if (response.headers && typeof response.headers.forEach === 'function') {
            response.headers.forEach((value, key) => {
              headers[key] = value;
            });
          }
        } catch (headerError) {
          console.warn("Could not extract headers:", headerError);
        }

        console.log("📊 Video URL response:", {
          status: response.status,
          headers,
          ok: response.ok,
        });

        if (response.ok) {
          console.log("✅ Video URL is accessible");
        } else {
          console.error("❌ Video URL not accessible:", response.status);
        }
      } catch (error) {
        console.error("❌ Error testing video URL:", error);
      }
    };

    // Wrap in try-catch to prevent any unhandled errors
    try {
      testVideoUrl();
    } catch (error) {
      console.error("❌ Error in testVideoUrl setup:", error);
    }
  }, []);
  */

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-custom-50/30 dark:from-zinc-900 dark:via-black dark:to-custom-900/10">
      <ContactSection />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge
              variant="secondary"
              className="bg-custom-100 text-custom-800 dark:bg-custom-900/30 dark:text-custom-300 border-custom-200 dark:border-custom-800 mb-4"
            >
              Contacto directo
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
              Información de contacto
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed">
              Estamos aquí para ayudarte con todas tus necesidades
              inmobiliarias. Contáctanos a través de cualquiera de estos medios
              para una atención personalizada.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <Card className="border-0 shadow-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur hover:shadow-2xl transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-custom-500 to-custom-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                      Email
                    </h3>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                      Envíanos un mensaje
                    </p>
                  </div>
                </div>
                <p className="text-zinc-600 dark:text-zinc-300 mb-4">
                  Para consultas detalladas y propuestas personalizadas
                </p>
                <a
                  href="mailto:realtorluisfernando@gmail.com"
                  className="text-custom-600 dark:text-custom-400 font-medium hover:text-custom-700 dark:hover:text-custom-300 transition-colors inline-flex items-center"
                >
                  realtorluisfernando@gmail.com
                  <Mail className="w-4 h-4 ml-2" />
                </a>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur hover:shadow-2xl transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-custom-500 to-custom-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                      Teléfono
                    </h3>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                      Llámanos directamente
                    </p>
                  </div>
                </div>
                <p className="text-zinc-600 dark:text-zinc-300 mb-4">
                  Atención inmediata y personalizada
                </p>
                <div className="space-y-3">
                  <a
                    href="tel:+573177772601"
                    className="text-custom-600 dark:text-custom-400 font-medium hover:text-custom-700 dark:hover:text-custom-300 transition-colors inline-flex items-center block"
                  >
                    <Phone className="w-4 h-4 ml-2" /> 317 777 2601
                  </a>
                  <a
                    href="tel:+573214223931"
                    className="text-custom-600 dark:text-custom-400 font-medium hover:text-custom-700 dark:hover:text-custom-300 transition-colors inline-flex items-center block"
                  >
                    <Phone className="w-4 h-4 ml-2" /> 321 422 3931
                  </a>
                  <a
                    href="tel:+573207917853"
                    className="text-custom-600 dark:text-custom-400 font-medium hover:text-custom-700 dark:hover:text-custom-300 transition-colors inline-flex items-center block"
                  >
                    <Phone className="w-4 h-4 ml-2" />
                    320 791 7853
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur hover:shadow-2xl transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-custom-500 to-custom-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                      Oficina
                    </h3>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                      Visítanos personalmente
                    </p>
                  </div>
                </div>
                <p className="text-zinc-600 dark:text-zinc-300 mb-4">
                  Reuniones y asesorías presenciales
                </p>
                <div className="text-custom-600 dark:text-custom-400 font-medium">
                  <p>Pasto, Colombia</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    Cita previa
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Card className="border-0 shadow-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                  ¿Por qué elegirnos?
                </CardTitle>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Más de una década de experiencia en el mercado inmobiliario de
                  lujo
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-custom-500 to-custom-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Award className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                        Experiencia comprobada
                      </h4>
                      <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                        Más de 10 años en el mercado inmobiliario de alto valor
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-custom-500 to-custom-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                        Atención personalizada
                      </h4>
                      <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                        Servicio exclusivo y dedicado para cada cliente
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-custom-500 to-custom-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Target className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                        Estrategias innovadoras
                      </h4>
                      <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                        Marketing digital y tecnologías de vanguardia
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-custom-500 to-custom-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                        Resultados garantizados
                      </h4>
                      <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                        Éxito comprobado en tiempo récord
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 pt-4 border-t border-zinc-200 dark:border-zinc-700">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={`star-${i}`}
                        className="w-5 h-5 text-custom-500 fill-current"
                      />
                    ))}
                  </div>
                  <span className="text-zinc-600 dark:text-zinc-400 text-sm">
                    5.0 Rating • 200+ Clientes satisfechos
                  </span>
                </div>
              </CardContent>
            </Card>

            <div className="relative">
              <div className="relative z-10 w-full max-w-2xl mx-auto aspect-video rounded-2xl overflow-hidden bg-black">
                {!videoError ? (
                  <video
                    className="w-full h-full object-cover"
                    controls
                    preload="none"
                    poster="/logo.png"
                    playsInline
                    muted
                    onError={() => setVideoError(true)}
                    onLoadStart={() => {
                      // Video loading started successfully
                    }}
                  >
                    <source
                      src="https://firebasestorage.googleapis.com/v0/b/inmapp-842fa.firebasestorage.app/o/video%2FWhatsApp%20Video%202025-10-07%20at%2011.05.51%20PM.mp4?alt=media&token=d47d27a2-54bb-4bc5-82f1-1b593dd0a3ef"
                      type="video/mp4"
                    />
                    {/* Browser fallback */}
                    Tu navegador no soporta el elemento video.
                  </video>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-white p-8">
                    <div className="w-24 h-24 mb-4">
                      <Image
                        src="/logo.png"
                        alt="REALHAUS"
                        width={96}
                        height={96}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 font-cinzel tracking-wide">
                      REALHAUS
                    </h3>
                    <p className="text-zinc-300 text-sm text-center mb-4">
                      Especialistas en bienes raíces de lujo
                    </p>
                    <p className="text-custom-400 text-sm text-center">
                      Video no disponible temporalmente
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
