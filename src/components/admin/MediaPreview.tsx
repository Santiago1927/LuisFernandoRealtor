"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Eye, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MediaFile {
  file?: File;
  url?: string;
  type: "image" | "video";
  name: string;
  size?: number;
}

interface MediaPreviewProps {
  files: File[];
  existingUrls: string[];
  type: "image" | "video";
  onRemoveFile: (index: number) => void;
  onRemoveExisting: (index: number) => void;
  onPreview?: (url: string, type: "image" | "video") => void;
}

export default function MediaPreview({
  files,
  existingUrls,
  type,
  onRemoveFile,
  onRemoveExisting,
  onPreview,
}: MediaPreviewProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewType, setPreviewType] = useState<"image" | "video" | null>(
    null
  );

  // Convertir archivos nuevos a MediaFile
  const newMediaFiles: MediaFile[] = files.map((file, index) => ({
    file,
    type,
    name: file.name,
    size: file.size,
    url: URL.createObjectURL(file),
  }));

  // Convertir URLs existentes a MediaFile
  const existingMediaFiles: MediaFile[] = existingUrls.map((url, index) => ({
    url,
    type,
    name: url.split("/").pop() || `${type}_${index + 1}`,
  }));

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handlePreview = (url: string, mediaType: "image" | "video") => {
    setPreviewUrl(url);
    setPreviewType(mediaType);
    if (onPreview) {
      onPreview(url, mediaType);
    }
  };

  const closePreview = () => {
    setPreviewUrl(null);
    setPreviewType(null);
  };

  if (newMediaFiles.length === 0 && existingMediaFiles.length === 0) {
    return null;
  }

  return (
    <>
      <div className="mt-4 space-y-4">
        {/* Archivos nuevos */}
        {newMediaFiles.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Nuevos {type === "image" ? "imágenes" : "videos"} (
              {newMediaFiles.length})
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {newMediaFiles.map((media, index) => (
                <Card key={`new-${index}`} className="relative group">
                  <CardContent className="p-3">
                    <div className="relative">
                      {type === "image" ? (
                        <div className="aspect-video bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700 relative">
                          <Image
                            src={media.url || ""}
                            alt={media.name || "Vista previa de imagen"}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-200"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                      ) : (
                        <div className="aspect-video bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden relative flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
                          <video
                            src={media.url}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                            muted
                          />
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <Play className="w-12 h-12 text-white bg-black bg-opacity-50 rounded-full p-3" />
                          </div>
                        </div>
                      )}

                      {/* Overlay con acciones */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex space-x-3">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handlePreview(media.url!, type);
                            }}
                            className="bg-white bg-opacity-95 hover:bg-opacity-100 shadow-lg"
                            title="Ver imagen"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              onRemoveFile(index);
                            }}
                            className="bg-red-500 bg-opacity-95 hover:bg-opacity-100 shadow-lg"
                            title="Eliminar archivo"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-2">
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 truncate">
                        {media.name}
                      </p>
                      <div className="flex justify-between items-center mt-1">
                        <div className="flex items-center space-x-1">
                          {media.size && (
                            <Badge variant="secondary" className="text-xs">
                              {formatFileSize(media.size)}
                            </Badge>
                          )}
                          <Badge
                            variant="default"
                            className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          >
                            Nuevo
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handlePreview(media.url!, type);
                            }}
                            className="h-6 w-6 p-0 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                            title="Ver"
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              onRemoveFile(index);
                            }}
                            className="h-6 w-6 p-0 hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400"
                            title="Eliminar"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Archivos existentes */}
        {existingMediaFiles.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              {type === "image" ? "Imágenes" : "Videos"} actuales (
              {existingMediaFiles.length})
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {existingMediaFiles.map((media, index) => (
                <Card key={`existing-${index}`} className="relative group">
                  <CardContent className="p-3">
                    <div className="relative">
                      {type === "image" ? (
                        <div className="aspect-video bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700 relative">
                          <Image
                            src={media.url || ""}
                            alt={media.name || "Imagen existente"}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-200"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = "none";
                              const container = target.parentElement;
                              if (container) {
                                container.innerHTML =
                                  '<div class="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"><svg class="w-12 h-12" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" /></svg></div>';
                              }
                            }}
                          />
                        </div>
                      ) : (
                        <div className="aspect-video bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden relative flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
                          <video
                            src={media.url}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                            muted
                            onError={(e) => {
                              const container = e.currentTarget.parentElement;
                              if (container) {
                                container.innerHTML =
                                  '<div class="flex items-center justify-center w-full h-full text-zinc-500"><Play class="w-12 h-12" /></div>';
                              }
                            }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <Play className="w-12 h-12 text-white bg-black bg-opacity-50 rounded-full p-3" />
                          </div>
                        </div>
                      )}

                      {/* Overlay con acciones */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex space-x-3">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handlePreview(media.url!, type);
                            }}
                            className="bg-white bg-opacity-95 hover:bg-opacity-100 shadow-lg"
                            title="Ver imagen"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              onRemoveExisting(index);
                            }}
                            className="bg-red-500 bg-opacity-95 hover:bg-opacity-100 shadow-lg"
                            title="Eliminar archivo"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-2">
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 truncate">
                        {media.name}
                      </p>
                      <div className="flex justify-between items-center mt-1">
                        <Badge variant="outline" className="text-xs">
                          Actual
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handlePreview(media.url!, type);
                            }}
                            className="h-6 w-6 p-0 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                            title="Ver"
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              onRemoveExisting(index);
                            }}
                            className="h-6 w-6 p-0 hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400"
                            title="Eliminar"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal de vista previa */}
      {previewUrl && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[9999] p-4"
          onClick={closePreview}
          style={{ zIndex: 9999 }}
          data-testid="preview-modal"
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full bg-white dark:bg-zinc-900 rounded-lg shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-4 right-4 z-10">
              <Button
                variant="secondary"
                size="sm"
                onClick={closePreview}
                className="bg-white dark:bg-zinc-800 bg-opacity-90 hover:bg-opacity-100 shadow-lg"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="p-4 relative">
              {previewType === "image" ? (
                <div className="relative w-full max-h-[80vh] aspect-auto">
                  <Image
                    src={previewUrl || ""}
                    alt="Vista previa de imagen"
                    width={800}
                    height={600}
                    className="w-full h-auto object-contain rounded-lg max-h-[80vh]"
                    priority
                  />
                </div>
              ) : (
                <video
                  src={previewUrl}
                  controls
                  className="w-full h-full object-contain rounded-lg max-h-[80vh]"
                  autoPlay
                  muted
                  playsInline
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
