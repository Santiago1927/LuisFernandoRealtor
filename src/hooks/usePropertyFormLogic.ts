// Importa los hooks useState y useEffect de React para manejar el estado y los efectos secundarios
import { useState, useEffect, useCallback } from 'react';
// Importa los tipos Property y PropertyFormData para tipar los datos de la propiedad y el formulario
import { Property, PropertyFormData } from '../types/property';
// Importa la instancia de storage de Firebase para subir archivos
import { storage } from '../../firebase/firebaseConfig';
// Importa funciones de Firebase Storage para subir y obtener archivos
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// Importa las mutaciones de React Query
import { useCreateProperty, useUpdateProperty } from './usePropertyMutations';
// Importa el contexto de alertas personalizado
import { useAlert } from '../components/layout/AlertContext';

// Interfaz para las props que recibe el hook personalizado
interface UsePropertyFormLogicProps {
  property?: Property | null; // Propiedad a editar (opcional)
  onSave: (property: Property) => void; // Función a ejecutar al guardar
  onClose: () => void; // Función a ejecutar al cerrar el formulario
}

// Hook personalizado para manejar la lógica del formulario de propiedades
export function usePropertyFormLogic({ property, onSave, onClose }: UsePropertyFormLogicProps) {
  // Obtiene las funciones del contexto de alertas personalizado
  const { showAlert } = useAlert();

  // Estado inicial del formulario con valores por defecto
  const getInitialFormData = useCallback((): PropertyFormData => ({
    title: property?.title || '',
    address: property?.address || '',
    city: property?.city || '',
    price: property?.price || 0,
    description: property?.description || '',
    bedrooms: property?.bedrooms || 0,
    bathrooms: property?.bathrooms || 0,
    area: property?.area || 0,
    type: property?.type || 'house',  // Asegurar valor por defecto
    status: property?.status || 'available', // Asegurar valor por defecto
    phone: property?.phone || '',
  }), [property]);

  // Estado para los datos del formulario
  const [formData, setFormData] = useState<PropertyFormData>(getInitialFormData());
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
  const [mapAddress, setMapAddress] = useState(property?.address || '');
  // Estado para la latitud de la propiedad
  const [lat, setLat] = useState(property?.lat || null);
  // Estado para la longitud de la propiedad
  const [lng, setLng] = useState(property?.lng || null);

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
      setMapAddress(property.address || '');
    } else {
      // Si no hay property (modo crear), resetear todos los valores
      setFormData({
        title: '',
        address: '',
        city: '',
        price: 0,
        description: '',
        bedrooms: 0,
        bathrooms: 0,
        area: 0,
        type: 'house',
        status: 'available',
        phone: '',
      });
      setImageUrls([]);
      setVideoUrls([]);
      setImages([]);
      setVideos([]);
      setLat(null);
      setLng(null);
      setMapAddress('');
    }
  }, [property, getInitialFormData]);

  // Maneja los cambios en los campos del formulario (inputs, selects, textareas)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'bedrooms' || name === 'bathrooms' || name === 'area' 
        ? Number(value) // Convierte a número si corresponde
        : value
    }));
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

  // Sube archivos (imágenes o videos) a Firebase Storage y retorna sus URLs
  const uploadFiles = async (files: File[], folder: string): Promise<string[]> => {
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
    if (uploading || createPropertyMutation.isPending || updatePropertyMutation.isPending) {
      return;
    }

    setUploading(true); // Indica que se está subiendo
    
    try {
      let newImageUrls = [...imageUrls]; // Copia URLs existentes
      let newVideoUrls = [...videoUrls]; // Copia URLs existentes
      
      if (images.length > 0) {
        const uploadedImageUrls = await uploadFiles(images, 'properties/images'); // Sube imágenes
        newImageUrls = [...newImageUrls, ...uploadedImageUrls]; // Agrega nuevas URLs
      }
      
      if (videos.length > 0) {
        const uploadedVideoUrls = await uploadFiles(videos, 'properties/videos'); // Sube videos
        newVideoUrls = [...newVideoUrls, ...uploadedVideoUrls]; // Agrega nuevas URLs
      }
      
      // Construye el objeto de datos de la propiedad
      const propertyData: Omit<Property, 'id'> = {
        ...formData,
        images: newImageUrls,
        videos: newVideoUrls,
        createdAt: property?.createdAt || new Date(), // Usa la fecha original o la actual
        updatedAt: new Date(), // Fecha de actualización
        lat: lat || null,
        lng: lng || null,
      };

      if (property?.id) {
        // Si existe, actualiza la propiedad usando React Query
        await updatePropertyMutation.mutateAsync({ 
          id: property.id, 
          propertyData 
        });
        
        const updatedProperty: Property = {
          id: property.id,
          ...propertyData,
        };
        
        onSave(updatedProperty); // Llama a la función de guardado
        
        // Alerta de éxito para actualización
        showAlert('Propiedad actualizada exitosamente', 'success');
      } else {
        // Si no existe, crea una nueva propiedad usando React Query
        const savedProperty = await createPropertyMutation.mutateAsync(propertyData);
        onSave(savedProperty); // Llama a la función de guardado
        
        // Alerta de éxito para creación
        showAlert('Propiedad creada exitosamente', 'success');
      }
      
    } catch (error) {
      console.error('Error al procesar la propiedad:', error);
      showAlert('Error al procesar la propiedad. Intenta de nuevo.', 'error');
    } finally {
      setUploading(false); // Finaliza la subida
    }
  };

  // Maneja los cambios de ubicación desde el mapa
  const handleLocationChange = (newLat: number, newLng: number, newAddress: string) => {
    setLat(newLat);
    setLng(newLng);
    setMapAddress(newAddress);
    
    // Actualizar también el formData si es necesario
    setFormData(prev => ({
      ...prev,
      address: newAddress
    }));
  };

  // Determinar si está en proceso alguna operación
  const isProcessing = uploading || createPropertyMutation.isPending || updatePropertyMutation.isPending;

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
    handleSubmit,
    handleLocationChange,
    onClose,
    // Estados adicionales para el formulario
    isLoading: isProcessing,
    isError: createPropertyMutation.isError || updatePropertyMutation.isError,
    error: createPropertyMutation.error || updatePropertyMutation.error,
  };
}