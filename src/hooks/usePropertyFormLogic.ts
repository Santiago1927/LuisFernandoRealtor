// Importa los hooks useState, useEffect, useCallback y useRef de React para manejar el estado y los efectos secundarios
import { useState, useEffect, useCallback, useRef } from "react";
// Importa los tipos Property y PropertyFormData para tipar los datos de la propiedad y el formulario
import {
  Property,
  PropertyFormData,
  Amenity,
  PaymentMethod,
  ExchangeType,
  AreaConstruida,
  PublicationStatus,
  BusinessType,
  CurrencyType,
  RentalTime,
  Stratum,
  FloorNumber,
  ParkingType,
} from "../types/property";
// Importa la instancia de storage de Firebase para subir archivos
import { storage } from "../../firebase/firebaseConfig";
// Importa funciones de Firebase Storage para subir y obtener archivos
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// Importa las mutaciones de React Query
import { useCreateProperty, useUpdateProperty } from "./usePropertyMutations";
// Importa el contexto de alertas personalizado
import { useAlert } from "../components/layout/AlertContext";
// Importa el contexto de autenticación
import { useAuthContext } from "../components/auth/AuthContext";

// Interfaz para las props que recibe el hook personalizado
interface UsePropertyFormLogicProps {
  property?: Property | null; // Propiedad a editar (opcional)
  onSave: (property: Property) => void; // Función a ejecutar al guardar
  onClose: () => void; // Función a ejecutar al cerrar el formulario
}

// Hook personalizado para manejar la lógica del formulario de propiedades
export function usePropertyFormLogic({
  property,
  onSave,
  onClose,
}: UsePropertyFormLogicProps) {
  // Obtiene las funciones del contexto de alertas personalizado
  const { showAlert } = useAlert();
  // Obtiene el estado de autenticación
  const { isAuthenticated, user } = useAuthContext();

  // Estado inicial del formulario con valores por defecto (memoizado)
  const getInitialFormData = useCallback((): PropertyFormData => {
    const baseData: PropertyFormData = {
      title: property?.title || "",
      address: property?.address || "",
      city: property?.city || "Pasto", // Siempre asegurar que tenga un valor
      price: property?.price || 0,
      description: property?.description || "",
      bedrooms: property?.bedrooms || 0,
      bathrooms: property?.bathrooms || 0,
      area: property?.area || 0,
      type: property?.type || "Casa", // Asegurar valor por defecto
      status: property?.status || "available", // Asegurar valor por defecto
      phone: property?.phone || "",

      // Nuevos campos principales
      encargado_inmueble: property?.encargado_inmueble || "",
      matricula_inmobiliaria: property?.matricula_inmobiliaria || "",
      publication_status: property?.publication_status || "Activo",
      business_type: property?.business_type || "Venta",
      rental_price: property?.rental_price || 0,
      rental_time: property?.rental_time || "Mensual",
      currency_type: property?.currency_type || "Pesos colombianos",
      construction_year: property?.construction_year || "",
      stratum: property?.stratum || "N/D",
      floor: property?.floor || "1",
      parking_type: property?.parking_type || "En línea",
      parking_spaces: property?.parking_spaces || "0 Vehículos",

      // Ubicación geográfica detallada
      country: property?.country || "Colombia",
      department: property?.department || "Nariño",
      zone_neighborhood: property?.zone_neighborhood || "",
      postal_code: property?.postal_code || "",
      private_area: property?.private_area || 0,
      built_area: property?.built_area || 0,
      total_area: property?.total_area || 0,
      balcony_area: property?.balcony_area || 0,
      terrace_area: property?.terrace_area || 0,
      storage_area: property?.storage_area || 0,
      lot_area: property?.lot_area || 0,

      // Checkboxes para indicar qué áreas tiene la propiedad
      has_private_area: property?.has_private_area || false,
      has_built_area: property?.has_built_area || false,
      has_total_area: property?.has_total_area || false,
      has_balcony_area: property?.has_balcony_area || false,
      has_terrace_area: property?.has_terrace_area || false,
      has_storage_area: property?.has_storage_area || false,
      has_lot_area: property?.has_lot_area || false,

      video_url: property?.video_url || "",
      virtual_tour: property?.virtual_tour || "",

      // Campos existentes
      conjunto_cerrado: property?.conjunto_cerrado || false,
      valor_administracion: property?.valor_administracion || 0,
      zonas_comunes: property?.zonas_comunes || [],
      formas_de_pago: property?.formas_de_pago || [],
      edad_propiedad: property?.edad_propiedad || "",
      area_construida: property?.area_construida || [],
    };

    // Solo agregar campos opcionales si tienen valores
    if (property?.lote_frente) baseData.lote_frente = property.lote_frente;
    if (property?.lote_fondo) baseData.lote_fondo = property.lote_fondo;
    if (property?.numero_pisos) baseData.numero_pisos = property.numero_pisos;
    if (property?.tipo_permuta) baseData.tipo_permuta = property.tipo_permuta;
    if (property?.permuta_porcentaje)
      baseData.permuta_porcentaje = property.permuta_porcentaje;
    if (property?.permuta_monto_max)
      baseData.permuta_monto_max = property.permuta_monto_max;

    return baseData;
  }, [property]);

  // Estado para los datos del formulario
  const [formData, setFormData] = useState<PropertyFormData>(
    getInitialFormData()
  );
  // Estado para las imágenes seleccionadas por el usuario
  const [images, setImages] = useState<File[]>([]);
  // Estado para los videos seleccionados por el usuario
  const [videos, setVideos] = useState<File[]>([]);
  // Estado para indicar si se está subiendo archivos
  const [uploading, setUploading] = useState(false);
  // Estado para las URLs de imágenes ya subidas
  const [imageUrls, setImageUrls] = useState<string[]>(property?.images || []);
  // Estado para las URLs de videos ya subidos
  const [videoUrls, setVideoUrls] = useState<string[]>(property?.videos || []);
  // Estado para la dirección a geocodificar en el mapa
  const [mapAddress, setMapAddress] = useState(property?.address || "");
  // Estado para la latitud de la propiedad
  const [lat, setLat] = useState(property?.lat || null);
  // Estado para la longitud de la propiedad
  const [lng, setLng] = useState(property?.lng || null);

  // Ref para el timer de debounce de sincronización de dirección
  const addressSyncTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  // Estado para controlar si hay cambios sin guardar
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Ref para almacenar los datos iniciales del formulario
  const initialFormDataRef = useRef<PropertyFormData>(getInitialFormData());
  const initialImagesRef = useRef<string[]>(property?.images || []);
  const initialVideosRef = useRef<string[]>(property?.videos || []);

  // Ref para saber si es el primer render
  const isFirstRender = useRef(true);

  // Mutaciones de React Query
  const createPropertyMutation = useCreateProperty();
  const updatePropertyMutation = useUpdateProperty();

  // Efecto que actualiza los estados cuando se recibe una propiedad para editar
  useEffect(() => {
    if (property) {
      const newFormData = getInitialFormData();
      setFormData(newFormData);
      setImageUrls(property.images || []);
      setVideoUrls(property.videos || []);
      setLat(property.lat || null);
      setLng(property.lng || null);
      setMapAddress(property.address || "");

      // Actualizar las refs de datos iniciales
      initialFormDataRef.current = newFormData;
      initialImagesRef.current = property.images || [];
      initialVideosRef.current = property.videos || [];
      setHasUnsavedChanges(false);
    } else {
      // Si no hay property (modo crear), usar getInitialFormData para asegurar valores por defecto
      const initialData = getInitialFormData();
      console.log("🏗️ Formulario nuevo - city:", initialData.city);
      setFormData(initialData);
      setImageUrls([]);
      setVideoUrls([]);
      setImages([]);
      setVideos([]);
      setLat(null);
      setLng(null);
      setMapAddress("");

      // Actualizar las refs de datos iniciales
      initialFormDataRef.current = initialData;
      initialImagesRef.current = [];
      initialVideosRef.current = [];
      setHasUnsavedChanges(false);
    }

    // Marcar que ya pasó el primer render
    isFirstRender.current = false;
  }, [property, getInitialFormData]);

  // Efecto para limpiar campos de permuta cuando se desmarca "Permutas"
  useEffect(() => {
    const hasPermutas = formData.formas_de_pago?.includes("Permutas");
    if (
      !hasPermutas &&
      (formData.tipo_permuta ||
        formData.permuta_porcentaje ||
        formData.permuta_monto_max)
    ) {
      setFormData((prev) => {
        const newData = { ...prev };
        delete newData.tipo_permuta;
        delete newData.permuta_porcentaje;
        delete newData.permuta_monto_max;
        return newData;
      });
    }
  }, [
    formData.formas_de_pago,
    formData.tipo_permuta,
    formData.permuta_porcentaje,
    formData.permuta_monto_max,
  ]);

  // Efecto de limpieza para el timer de debounce al desmontar el componente
  useEffect(() => {
    return () => {
      if (addressSyncTimerRef.current) {
        clearTimeout(addressSyncTimerRef.current);
      }
    };
  }, []);

  // Efecto para detectar cambios en el formulario
  useEffect(() => {
    // Ignorar el primer render
    if (isFirstRender.current) {
      return;
    }

    // Función auxiliar para comparar objetos de forma profunda
    const hasChanges = () => {
      // Comparar datos del formulario
      const formDataChanged =
        JSON.stringify(formData) !== JSON.stringify(initialFormDataRef.current);

      // Comparar imágenes nuevas
      const newImagesAdded = images.length > 0;

      // Comparar videos nuevos
      const newVideosAdded = videos.length > 0;

      // Comparar URLs de imágenes existentes
      const imageUrlsChanged =
        JSON.stringify(imageUrls) !== JSON.stringify(initialImagesRef.current);

      // Comparar URLs de videos existentes
      const videoUrlsChanged =
        JSON.stringify(videoUrls) !== JSON.stringify(initialVideosRef.current);

      const changes = {
        formDataChanged,
        newImagesAdded,
        newVideosAdded,
        imageUrlsChanged,
        videoUrlsChanged,
      };

      console.log("🔍 Detectando cambios:", changes);

      return (
        formDataChanged ||
        newImagesAdded ||
        newVideosAdded ||
        imageUrlsChanged ||
        videoUrlsChanged
      );
    };

    const hasUnsaved = hasChanges();
    console.log("📝 hasUnsavedChanges:", hasUnsaved);
    setHasUnsavedChanges(hasUnsaved);
  }, [formData, images, videos, imageUrls, videoUrls]);

  // Maneja los cambios en los campos del formulario (inputs, selects, textareas)
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    const numericFields = [
      "price",
      "bedrooms",
      "bathrooms",
      "area",
      "valor_administracion",
      "lote_frente",
      "lote_fondo",
      "numero_pisos",
      "permuta_porcentaje",
      "permuta_monto_max",
      "private_area",
      "built_area",
      "total_area",
      "balcony_area",
      "terrace_area",
      "storage_area",
      "lot_area",
    ];
    const optionalNumericFields = [
      "lote_frente",
      "lote_fondo",
      "numero_pisos",
      "permuta_porcentaje",
      "permuta_monto_max",
      "private_area",
      "built_area",
      "total_area",
      "balcony_area",
      "terrace_area",
      "storage_area",
      "lot_area",
    ];

    setFormData((prev) => {
      const newData = { ...prev };

      if (type === "checkbox") {
        // Manejar checkboxes
        (newData as any)[name] = checked;
      } else if (numericFields.includes(name)) {
        const numValue = Number(value);
        if (optionalNumericFields.includes(name)) {
          // Para campos opcionales, solo agregar si hay valor
          if (value && numValue > 0) {
            (newData as any)[name] = numValue;
          } else {
            // Eliminar el campo si está vacío
            delete (newData as any)[name];
          }
        } else {
          // Para campos requeridos, usar 0 como mínimo
          (newData as any)[name] = numValue || 0;
        }
      } else {
        (newData as any)[name] = value;

        // Debug específico para el campo city
        if (name === "city") {
          console.log("🏙️ City cambiado a:", value);
        }
      }

      return newData;
    });

    // Si se está editando el campo de dirección, sincronizar con el mapa usando debounce
    if (name === "address") {
      // Limpiar el timer anterior si existe
      if (addressSyncTimerRef.current) {
        clearTimeout(addressSyncTimerRef.current);
      }

      // Crear un nuevo timer de debounce para sincronizar después de 500ms
      addressSyncTimerRef.current = setTimeout(() => {
        if (value && value.trim().length > 0) {
          setMapAddress(value.trim());
        }
      }, 500);
    }
  };

  // Maneja cambios en campos especiales (multi-select, switches, etc.)
  const handleSpecialFieldChange = (name: string, value: any) => {
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };

      // Si se está modificando formas_de_pago y se quita "Permutas"
      if (name === "formas_de_pago" && Array.isArray(value)) {
        const hasPermutas = value.includes("Permutas");
        if (!hasPermutas) {
          // Limpiar todos los campos relacionados con permutas
          delete newData.tipo_permuta;
          delete newData.permuta_porcentaje;
          delete newData.permuta_monto_max;
        }
      }

      return newData;
    });
  };

  // Maneja la selección de imágenes por el usuario
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files)); // Convierte FileList a array
    }
  };

  // Maneja la selección de videos por el usuario
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setVideos(Array.from(e.target.files)); // Convierte FileList a array
    }
  };

  // Elimina una imagen nueva seleccionada (antes de subir)
  const removeNewImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Elimina un video nuevo seleccionado (antes de subir)
  const removeNewVideo = (index: number) => {
    setVideos((prev) => prev.filter((_, i) => i !== index));
  };

  // Elimina una imagen existente (ya subida)
  const removeExistingImage = (index: number) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  // Elimina un video existente (ya subido)
  const removeExistingVideo = (index: number) => {
    setVideoUrls((prev) => prev.filter((_, i) => i !== index));
  };

  // Sube archivos (imágenes o videos) a Firebase Storage y retorna sus URLs
  const uploadFiles = async (
    files: File[],
    folder: string
  ): Promise<string[]> => {
    const uploadPromises = files.map(async (file) => {
      const storageRef = ref(storage, `${folder}/${Date.now()}_${file.name}`); // Crea referencia única
      const snapshot = await uploadBytes(storageRef, file); // Sube el archivo
      return getDownloadURL(snapshot.ref); // Obtiene la URL de descarga
    });
    return Promise.all(uploadPromises); // Espera a que todas las subidas terminen y retorna las URLs
  };

  // Maneja el envío del formulario, sube archivos y guarda la propiedad en Firestore
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario

    // Evitar doble envío
    if (
      uploading ||
      createPropertyMutation.isPending ||
      updatePropertyMutation.isPending
    ) {
      return;
    }

    // Verificar autenticación ANTES de proceder
    if (!isAuthenticated || !user) {
      showAlert(
        "⚠️ Sesión expirada o no autenticado. Por favor, cierra sesión e inicia sesión nuevamente.",
        "error"
      );
      return;
    }

    // Validación básica antes del envío
    if (!formData.title || !formData.address || !formData.price) {
      showAlert(
        "📝 Por favor completa los campos obligatorios: título, dirección y precio.",
        "error"
      );
      return;
    }

    // Validación adicional de campos críticos
    if (!formData.zone_neighborhood) {
      showAlert(
        "📍 Por favor selecciona una zona o barrio para la propiedad.",
        "error"
      );
      return;
    }

    setUploading(true); // Indica que se está subiendo

    try {
      let newImageUrls = [...imageUrls]; // Copia URLs existentes
      let newVideoUrls = [...videoUrls]; // Copia URLs existentes

      // Intentar subir imágenes solo si hay archivos seleccionados
      if (images.length > 0) {
        try {
          const uploadedImageUrls = await uploadFiles(
            images,
            "properties/images"
          ); // Sube imágenes
          newImageUrls = [...newImageUrls, ...uploadedImageUrls]; // Agrega nuevas URLs
        } catch (storageError) {
          console.warn(
            "Error subiendo imágenes, continuando sin ellas:",
            storageError
          );
          showAlert(
            "⚠️ No se pudieron subir las imágenes debido a permisos de Storage. La propiedad se creará sin imágenes. Contacta al administrador para configurar los permisos de Firebase Storage.",
            "info"
          );
          // Continuar sin imágenes
        }
      }

      // Intentar subir videos solo si hay archivos seleccionados
      if (videos.length > 0) {
        try {
          const uploadedVideoUrls = await uploadFiles(
            videos,
            "properties/videos"
          ); // Sube videos
          newVideoUrls = [...newVideoUrls, ...uploadedVideoUrls]; // Agrega nuevas URLs
        } catch (storageError) {
          console.warn(
            "Error subiendo videos, continuando sin ellos:",
            storageError
          );
          showAlert(
            "⚠️ No se pudieron subir los videos debido a permisos de Storage. La propiedad se creará sin videos.",
            "info"
          );
          // Continuar sin videos
        }
      }

      // CORRECCIÓN FORZADA: Si formData.city está vacío, asignar "Pasto" ANTES de la limpieza
      let formDataCopy = { ...formData };
      if (!formDataCopy.city || formDataCopy.city.trim() === "") {
        console.log(
          "⚠️ Campo city vacío en formData, asignando Pasto ANTES de limpieza"
        );
        formDataCopy.city = "Pasto";
      }

      // Limpiar datos del formulario eliminando valores undefined, null, y strings vacíos
      let cleanFormData = Object.fromEntries(
        Object.entries(formDataCopy).filter(([key, value]) => {
          // Mantener arrays vacíos y valores booleanos false
          if (Array.isArray(value)) return true;
          if (typeof value === "boolean") return true;
          if (typeof value === "number") return value >= 0; // Permitir 0 para campos como bedrooms, bathrooms
          if (typeof value === "string") return value.trim() !== "";
          return value !== undefined && value !== null;
        })
      );

      // Asegurar que campos críticos siempre tengan valores por defecto si están vacíos
      if (!cleanFormData.city) {
        cleanFormData.city = "Pasto";
      }
      if (!cleanFormData.type) {
        cleanFormData.type = "Casa";
      }
      if (!cleanFormData.status) {
        cleanFormData.status = "available";
      }

      console.log("✅ City final antes de enviar:", cleanFormData.city);

      // Verificación adicional: si no hay "Permutas" en formas_de_pago, eliminar campos de permuta
      const formasDePago = cleanFormData.formas_de_pago as string[] | undefined;
      if (!formasDePago || !formasDePago.includes("Permutas")) {
        delete cleanFormData.tipo_permuta;
        delete cleanFormData.permuta_porcentaje;
        delete cleanFormData.permuta_monto_max;
      }

      // Los datos han sido limpiados y están listos para enviar

      // Construye el objeto de datos de la propiedad
      const propertyData: Omit<Property, "id"> = {
        ...cleanFormData,
        images: newImageUrls,
        videos: newVideoUrls,
        createdAt: property?.createdAt || new Date(), // Usa la fecha original o la actual
        updatedAt: new Date(), // Fecha de actualización
        lat: lat || null,
        lng: lng || null,
      } as Omit<Property, "id">;

      // Debug: Log para verificar que el campo city esté en los datos finales
      console.log("🚀 DEBUG - Datos finales a enviar:", {
        title: propertyData.title,
        city: propertyData.city,
        type: propertyData.type,
        hasAllRequiredFields: !!(
          propertyData.title &&
          propertyData.city &&
          propertyData.type
        ),
      });

      if (property?.id) {
        // Si existe, actualiza la propiedad usando React Query
        await updatePropertyMutation.mutateAsync({
          id: property.id,
          propertyData,
        });

        const updatedProperty: Property = {
          id: property.id,
          ...propertyData,
        };

        // Resetear el estado de cambios sin guardar
        initialFormDataRef.current = formData;
        initialImagesRef.current = newImageUrls;
        initialVideosRef.current = newVideoUrls;
        setHasUnsavedChanges(false);

        onSave(updatedProperty); // Llama a la función de guardado

        // Alerta de éxito para actualización
        showAlert("Propiedad actualizada exitosamente", "success");
      } else {
        // Si no existe, crea una nueva propiedad usando React Query
        const savedProperty = await createPropertyMutation.mutateAsync(
          propertyData
        );

        // Resetear el estado de cambios sin guardar
        setHasUnsavedChanges(false);

        onSave(savedProperty); // Llama a la función de guardado

        // Alerta de éxito para creación
        showAlert("Propiedad creada exitosamente", "success");
      }
    } catch (error) {
      console.error("Error al procesar la propiedad:", error);

      // Manejo específico de errores de Firebase
      let errorMessage = "Error desconocido";
      let isAuthError = false;

      if (error instanceof Error) {
        errorMessage = error.message;

        // Errores específicos de Firebase
        if (
          errorMessage.includes("permission-denied") ||
          errorMessage.includes("insufficient permissions") ||
          errorMessage.includes("PERMISSION_DENIED")
        ) {
          errorMessage =
            "🔐 Sesión expirada o permisos insuficientes. Cierra sesión e inicia sesión nuevamente.";
          isAuthError = true;
        } else if (
          errorMessage.includes("network") ||
          errorMessage.includes("failed to fetch")
        ) {
          errorMessage =
            "🌐 Error de conexión. Verifica tu conexión a internet e intenta de nuevo.";
        } else if (
          errorMessage.includes("auth") ||
          errorMessage.includes("unauthorized")
        ) {
          errorMessage =
            "🔑 Error de autenticación. Por favor, cierra sesión e inicia sesión de nuevo.";
          isAuthError = true;
        } else if (
          errorMessage.includes("quota") ||
          errorMessage.includes("limit")
        ) {
          errorMessage =
            "💾 Límite de almacenamiento alcanzado. Contacta al administrador.";
        } else if (errorMessage.includes("timeout")) {
          errorMessage =
            "⏱️ Tiempo de espera agotado. Intenta de nuevo en unos momentos.";
        }
      }

      // Si es un error de autenticación, mostrar instrucciones específicas
      if (isAuthError) {
        showAlert(
          `${errorMessage}\n\n💡 Pasos para solucionarlo:\n1. Cerrar sesión completamente\n2. Iniciar sesión nuevamente\n3. Completar todos los campos obligatorios\n4. Intentar guardar de nuevo`,
          "error"
        );
      } else {
        showAlert(
          `❌ Error al procesar la propiedad: ${errorMessage}`,
          "error"
        );
      }
    } finally {
      setUploading(false); // Finaliza la subida
    }
  };

  // Maneja los cambios de ubicación desde el mapa
  const handleLocationChange = (
    newLat: number,
    newLng: number,
    newAddress: string
  ) => {
    setLat(newLat);
    setLng(newLng);
    setMapAddress(newAddress);

    // Actualizar también el formData si es necesario
    setFormData((prev) => ({
      ...prev,
      address: newAddress,
    }));
  };

  // Determinar si está en proceso alguna operación
  const isProcessing =
    uploading ||
    createPropertyMutation.isPending ||
    updatePropertyMutation.isPending;

  return {
    formData,
    setFormData,
    images,
    setImages,
    videos,
    setVideos,
    uploading: isProcessing, // Incluir el estado de las mutaciones
    imageUrls,
    setImageUrls,
    videoUrls,
    setVideoUrls,
    mapAddress,
    setMapAddress,
    lat,
    lng,
    handleInputChange,
    handleImageChange,
    handleVideoChange,
    removeNewImage,
    removeNewVideo,
    removeExistingImage,
    removeExistingVideo,
    handleSubmit,
    handleLocationChange,
    handleSpecialFieldChange,
    onClose,
    hasUnsavedChanges, // Nuevo: indica si hay cambios sin guardar
    // Estados adicionales para el formulario
    isLoading: isProcessing,
    isError: createPropertyMutation.isError || updatePropertyMutation.isError,
    error: createPropertyMutation.error || updatePropertyMutation.error,
  };
}
