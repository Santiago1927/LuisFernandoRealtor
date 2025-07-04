// Importa los hooks useState y useEffect de React para manejar el estado y los efectos secundarios
import { useState, useEffect } from 'react';
// Importa los tipos Property y PropertyFormData para tipar los datos de la propiedad y el formulario
import { Property, PropertyFormData } from '../types/property';
// Importa la instancia de storage de Firebase para subir archivos
import { storage } from '../../firebase/firebaseConfig';
// Importa funciones de Firebase Storage para subir y obtener archivos
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// Importa el servicio para interactuar con propiedades en Firestore
import { propertyService } from '../../firebase/firestoreService';

// Interfaz para las props que recibe el hook personalizado
interface UsePropertyFormLogicProps {
  property?: Property | null; // Propiedad a editar (opcional)
  onSave: (property: Property) => void; // Función a ejecutar al guardar
  onClose: () => void; // Función a ejecutar al cerrar el formulario
}

// Hook personalizado para manejar la lógica del formulario de propiedades
export function usePropertyFormLogic({ property, onSave, onClose }: UsePropertyFormLogicProps) {
  // Estado para los datos del formulario
  const [formData, setFormData] = useState<PropertyFormData>({
    title: '', // Título de la propiedad
    address: '', // Dirección
    city: '', // Ciudad
    price: 0, // Precio
    description: '', // Descripción
    bedrooms: 0, // Número de habitaciones
    bathrooms: 0, // Número de baños
    area: 0, // Área en m2
    type: 'house', // Tipo de propiedad
    status: 'available', // Estado de la propiedad
  });
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
  const [mapAddress, setMapAddress] = useState(formData.address || '');
  // Estado para la latitud de la propiedad
  const [lat, setLat] = useState(property?.lat || null);
  // Estado para la longitud de la propiedad
  const [lng, setLng] = useState(property?.lng || null);

  // Efecto que actualiza los estados cuando se recibe una propiedad para editar
  useEffect(() => {
    if (property) {
      setFormData({
        title: property.title,
        address: property.address,
        city: property.city || '',
        price: property.price,
        description: property.description,
        bedrooms: property.bedrooms || 0,
        bathrooms: property.bathrooms || 0,
        area: property.area || 0,
        type: property.type,
        status: property.status,
      });
      setImageUrls(property.images || []);
      setVideoUrls(property.videos || []);
      setLat(property.lat || null);
      setLng(property.lng || null);
      setMapAddress(property.address || '');
    }
  }, [property]);

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
      let savedProperty: Property;
      if (property?.id) {
        // Si existe, actualiza la propiedad
        await propertyService.updateProperty(property.id, propertyData);
        savedProperty = {
          id: property.id,
          ...propertyData,
        };
      } else {
        // Si no existe, crea una nueva propiedad
        savedProperty = await propertyService.createProperty(propertyData);
      }
      onSave(savedProperty); // Llama a la función de guardado
    } catch (error) {
      console.error('Error uploading files:', error); // Muestra error en consola
      alert('Error al subir archivos. Intenta de nuevo.'); // Alerta al usuario
    } finally {
      setUploading(false); // Finaliza la subida
    }
  };

  // Retorna los estados y funciones para ser usados en el formulario de propiedad
  return {
    formData,
    setFormData,
    images,
    setImages,
    videos,
    setVideos,
    uploading,
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
    onClose,
  };
}