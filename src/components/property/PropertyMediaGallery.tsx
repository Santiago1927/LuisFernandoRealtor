/**
 * Componente de Galería de Medios para Propiedades
 *
 * Muestra todas las imágenes y videos de una propiedad de forma completa
 * con navegación, controles de video y vista en pantalla completa.
 */

"use client";

import { useState, useRef } from "react";
import ImageWrapper from "@/components/ui/ImageWrapper";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Image as ImageIcon,
  Video,
  X,
  Eye,
  Grid3X3,
  PlayCircle,
} from "lucide-react";

interface MediaItem {
  type: "image" | "video";
  url: string;
  title?: string;
}

interface PropertyMediaGalleryProps {
  images: string[];
  videos: string[];
  videoUrl?: string;
  virtualTour?: string;
  propertyTitle: string;
}

export default function PropertyMediaGallery({
  images = [],
  videos = [],
  videoUrl,
  virtualTour,
  propertyTitle,
}: PropertyMediaGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Crear array combinado de medios
  const mediaItems: MediaItem[] = [
    ...images.map((url) => ({ type: "image" as const, url })),
    ...videos.map((url) => ({ type: "video" as const, url })),
    ...(videoUrl
      ? [{ type: "video" as const, url: videoUrl, title: "Video principal" }]
      : []),
    ...(virtualTour
      ? [{ type: "video" as const, url: virtualTour, title: "Tour virtual" }]
      : []),
  ];

  const currentMedia = mediaItems[activeIndex];
  const totalItems = mediaItems.length;

  // Navegación
  const nextMedia = () => {
    setActiveIndex((prev) => (prev + 1) % totalItems);
  };

  const prevMedia = () => {
    setActiveIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  const goToMedia = (index: number) => {
    setActiveIndex(index);
    setShowGrid(false);
  };

  // Controles de video
  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const toggleVideoMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  // Controles de pantalla completa
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  // Si no hay medios
  if (totalItems === 0) {
    return (
      <div className="relative aspect-[21/9] bg-zinc-100 dark:bg-zinc-800 rounded-lg">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center text-zinc-400 dark:text-zinc-500">
            <ImageIcon className="h-16 w-16 mx-auto mb-4" />
            <span className="text-lg">Sin medios disponibles</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Galería principal */}
      <div className="relative">
        <div className="relative aspect-[21/9] bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden">
          {currentMedia?.type === "image" ? (
            <>
              <ImageWrapper
                src={currentMedia.url}
                alt={`${propertyTitle} - Imagen ${activeIndex + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                priority={activeIndex === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
            </>
          ) : currentMedia?.type === "video" ? (
            <div className="relative w-full h-full">
              <video
                ref={videoRef}
                src={currentMedia.url}
                className="w-full h-full object-cover"
                controls={false}
                muted={isVideoMuted}
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)}
                onLoadedData={() => {
                  if (videoRef.current) {
                    videoRef.current.currentTime = 0;
                  }
                }}
              >
                Tu navegador no soporta el elemento de video.
              </video>

              {/* Controles de video personalizados */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20">
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleVideoPlay}
                      className="w-12 h-12 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur text-zinc-700 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-800"
                    >
                      {isVideoPlaying ? (
                        <Pause className="w-6 h-6" />
                      ) : (
                        <Play className="w-6 h-6" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleVideoMute}
                      className="w-10 h-10 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur text-zinc-700 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-800"
                    >
                      {isVideoMuted ? (
                        <VolumeX className="w-5 h-5" />
                      ) : (
                        <Volume2 className="w-5 h-5" />
                      )}
                    </Button>
                  </div>
                  {currentMedia.title && (
                    <Badge className="bg-black/70 text-white border-0">
                      {currentMedia.title}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ) : null}

          {/* Controles de navegación */}
          {totalItems > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={prevMedia}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur border border-zinc-200/50 dark:border-zinc-700/50 shadow-lg hover:bg-white dark:hover:bg-zinc-800"
              >
                <ChevronLeft className="w-6 h-6 text-zinc-700 dark:text-zinc-300" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={nextMedia}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur border border-zinc-200/50 dark:border-zinc-700/50 shadow-lg hover:bg-white dark:hover:bg-zinc-800"
              >
                <ChevronRight className="w-6 h-6 text-zinc-700 dark:text-zinc-300" />
              </Button>
            </>
          )}

          {/* Controles superiores */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Badge className="bg-black/70 text-white border-0">
                {currentMedia?.type === "image" ? (
                  <ImageIcon className="w-3 h-3 mr-1" />
                ) : (
                  <Video className="w-3 h-3 mr-1" />
                )}
                {activeIndex + 1} / {totalItems}
              </Badge>
              {currentMedia?.type === "image" && (
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                >
                  Imagen
                </Badge>
              )}
              {currentMedia?.type === "video" && (
                <Badge
                  variant="secondary"
                  className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                >
                  Video
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowGrid(!showGrid)}
                className="w-10 h-10 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur text-zinc-700 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-800"
                title="Ver galería"
              >
                <Grid3X3 className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFullscreen}
                className="w-10 h-10 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur text-zinc-700 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-800"
                title="Pantalla completa"
              >
                <Maximize2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Miniaturas */}
        {totalItems > 1 && (
          <div className="mt-4 grid grid-cols-6 gap-2 max-h-20 overflow-y-auto">
            {mediaItems.map((media, index) => (
              <button
                key={index}
                onClick={() => goToMedia(index)}
                className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  index === activeIndex
                    ? "border-custom-500 ring-2 ring-custom-200 dark:ring-custom-800"
                    : "border-zinc-200 dark:border-zinc-700 hover:border-custom-300"
                }`}
              >
                {media.type === "image" ? (
                  <ImageWrapper
                    src={media.url}
                    alt={`Miniatura ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 16vw, 12vw"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                    <PlayCircle className="w-6 h-6 text-white" />
                  </div>
                )}
                {index === activeIndex && (
                  <div className="absolute inset-0 bg-custom-500/20"></div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Vista de grilla */}
      {showGrid && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur flex items-center justify-center p-4">
          <div className="w-full max-w-6xl max-h-full overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">
                Galería de {propertyTitle}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowGrid(false)}
                className="text-white hover:bg-white/10"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {mediaItems.map((media, index) => (
                <button
                  key={index}
                  onClick={() => goToMedia(index)}
                  className="relative aspect-video rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200"
                >
                  {media.type === "image" ? (
                    <ImageWrapper
                      src={media.url}
                      alt={`Imagen ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                      <PlayCircle className="w-12 h-12 text-white" />
                    </div>
                  )}
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-black/70 text-white text-xs">
                      {media.type === "image" ? (
                        <ImageIcon className="w-3 h-3 mr-1" />
                      ) : (
                        <Video className="w-3 h-3 mr-1" />
                      )}
                      {index + 1}
                    </Badge>
                  </div>
                  {media.title && (
                    <div className="absolute bottom-2 left-2 right-2">
                      <Badge className="bg-black/70 text-white text-xs w-full justify-center">
                        {media.title}
                      </Badge>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Vista en pantalla completa */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <div className="relative w-full h-full">
            {currentMedia?.type === "image" ? (
              <ImageWrapper
                src={currentMedia.url}
                alt={`${propertyTitle} - Pantalla completa`}
                fill
                className="object-contain"
                sizes="100vw"
              />
            ) : currentMedia?.type === "video" ? (
              <video
                src={currentMedia.url}
                className="w-full h-full object-contain"
                controls
                autoPlay
                muted={isVideoMuted}
              >
                Tu navegador no soporta el elemento de video.
              </video>
            ) : null}

            {/* Controles de pantalla completa */}
            <div className="absolute top-4 right-4 flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={closeFullscreen}
                className="w-12 h-12 rounded-full bg-black/50 text-white hover:bg-black/70"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>

            {/* Navegación en pantalla completa */}
            {totalItems > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prevMedia}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-black/50 text-white hover:bg-black/70"
                >
                  <ChevronLeft className="w-8 h-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextMedia}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-black/50 text-white hover:bg-black/70"
                >
                  <ChevronRight className="w-8 h-8" />
                </Button>
              </>
            )}

            {/* Contador en pantalla completa */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <Badge className="bg-black/70 text-white text-lg px-4 py-2">
                {activeIndex + 1} / {totalItems}
              </Badge>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
