// Importaciones de funciones de Firestore para operaciones de base de datos
// Estas funciones permiten realizar operaciones CRUD y consultas en Firestore
import {
  collection, // Referencia a una colección de documentos
  doc, // Referencia a un documento específico
  getDocs, // Obtener múltiples documentos
  getDoc, // Obtener un documento específico
  addDoc, // Agregar un nuevo documento
  updateDoc, // Actualizar un documento existente
  deleteDoc, // Eliminar un documento
  deleteField, // Eliminar un campo específico
  query, // Crear una consulta con filtros
  where, // Filtro de consulta por campo
  orderBy, // Ordenar resultados por campo
  limit, // Limitar número de resultados
  onSnapshot, // Escuchar cambios en tiempo real
  Timestamp, // Tipo de dato para fechas en Firestore
  DocumentData, // Tipo para datos de documentos
  QuerySnapshot, // Tipo para resultados de consultas múltiples
  DocumentSnapshot, // Tipo para resultado de documento único
} from "firebase/firestore";

// Importación de la instancia de Firestore configurada
import { db } from "./firebaseConfig";
// Importación del tipo Property para tipado fuerte
import { Property } from "../src/types/property";

/**
 * Constantes de nombres de colecciones en Firestore
 *
 * Estas constantes definen los nombres de las colecciones utilizadas
 * en la base de datos para mantener consistencia y evitar errores de tipeo.
 */
export const COLLECTIONS = {
  PROPERTIES: "properties", // Colección de propiedades inmobiliarias
  BUYERS: "buyers", // Colección de compradores potenciales
  OWNERS: "owners", // Colección de propietarios
  CONTACTS: "contacts", // Colección de contactos generales
} as const;

/**
 * Servicio de operaciones para propiedades inmobiliarias
 *
 * Este objeto contiene todas las funciones necesarias para gestionar
 * las propiedades en la base de datos Firestore, incluyendo operaciones
 * CRUD, filtros y escucha en tiempo real.
 */
export const propertyService = {
  /**
   * Obtener todas las propiedades
   *
   * Recupera todos los documentos de la colección de propiedades
   * y los convierte al tipo Property con fechas formateadas.
   *
   * @returns Promise<Property[]> Array de todas las propiedades
   */
  async getAllProperties(): Promise<Property[]> {
    try {
      // Obtener todos los documentos de la colección properties
      const querySnapshot = await getDocs(
        collection(db, COLLECTIONS.PROPERTIES)
      );

      // Mapear los documentos y convertir las fechas de Firestore a Date
      return querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate
            ? data.createdAt.toDate()
            : data.createdAt
            ? new Date(data.createdAt)
            : new Date(),
          updatedAt: data.updatedAt?.toDate
            ? data.updatedAt.toDate()
            : data.updatedAt
            ? new Date(data.updatedAt)
            : new Date(),
        };
      }) as Property[];
    } catch (error) {
      console.error("Error getting properties:", error);
      throw error;
    }
  },

  /**
   * Obtener una propiedad por su ID
   *
   * Recupera un documento específico de la colección de propiedades
   * basado en su ID único.
   *
   * @param id - ID único de la propiedad
   * @returns Promise<Property | null> Propiedad encontrada o null si no existe
   */
  async getPropertyById(id: string): Promise<Property | null> {
    try {
      console.log("getPropertyById - Buscando propiedad con ID:", id);

      // Crear referencia al documento específico
      const docRef = doc(db, COLLECTIONS.PROPERTIES, id);
      const docSnap = await getDoc(docRef);

      console.log("getPropertyById - Documento existe:", docSnap.exists());

      // Verificar si el documento existe
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("getPropertyById - Datos obtenidos:", data);
        console.log("getPropertyById - Imágenes en datos:", data.images);

        const property = {
          id: docSnap.id,
          ...data,
          createdAt: data.createdAt?.toDate
            ? data.createdAt.toDate()
            : data.createdAt
            ? new Date(data.createdAt)
            : new Date(),
          updatedAt: data.updatedAt?.toDate
            ? data.updatedAt.toDate()
            : data.updatedAt
            ? new Date(data.updatedAt)
            : new Date(),
        } as Property;

        console.log("getPropertyById - Propiedad final:", property);
        return property;
      }
      console.log("getPropertyById - Documento no encontrado");
      return null;
    } catch (error) {
      console.error("Error getting property:", error);
      throw error;
    }
  },

  /**
   * Crear una nueva propiedad
   *
   * Agrega un nuevo documento a la colección de propiedades
   * con timestamps automáticos de creación y actualización.
   *
   * @param propertyData - Datos de la propiedad (sin ID)
   * @returns Promise<Property> Propiedad creada con ID generado
   */
  async createProperty(propertyData: Omit<Property, "id">): Promise<Property> {
    try {
      // Debug: Log para verificar los datos que llegan al servicio
      console.log("🔥 FIRESTORE DEBUG - Creando propiedad con datos:", {
        title: propertyData.title,
        city: propertyData.city,
        type: propertyData.type,
        hasCity: !!propertyData.city,
        cityType: typeof propertyData.city,
      });

      // Agregar documento con timestamps automáticos
      const docRef = await addDoc(collection(db, COLLECTIONS.PROPERTIES), {
        ...propertyData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });

      // Retornar la propiedad creada con el ID generado
      return {
        id: docRef.id,
        ...propertyData,
        createdAt: propertyData.createdAt,
        updatedAt: propertyData.updatedAt,
      };
    } catch (error) {
      console.error("Error creating property:", error);
      throw error;
    }
  },

  /**
   * Actualizar una propiedad existente
   *
   * Modifica un documento existente en la colección de propiedades
   * y actualiza automáticamente el timestamp de modificación.
   *
   * @param id - ID de la propiedad a actualizar
   * @param propertyData - Datos parciales a actualizar
   */
  async updateProperty(
    id: string,
    propertyData: Partial<Property>
  ): Promise<void> {
    try {
      // Debug: Log para verificar los datos que llegan al servicio para actualizar
      console.log("🔥 FIRESTORE DEBUG - Actualizando propiedad con datos:", {
        id,
        title: propertyData.title,
        city: propertyData.city,
        type: propertyData.type,
        hasCity: !!propertyData.city,
        cityType: typeof propertyData.city,
      });

      const docRef = doc(db, COLLECTIONS.PROPERTIES, id);

      // Preparar datos para actualización
      const updateData: any = {
        ...propertyData,
        updatedAt: Timestamp.now(),
      };

      // Si formas_de_pago no incluye "Permutas", eliminar campos relacionados
      if (
        propertyData.formas_de_pago &&
        !propertyData.formas_de_pago.includes("Permutas")
      ) {
        updateData.tipo_permuta = deleteField();
        updateData.permuta_porcentaje = deleteField();
        updateData.permuta_monto_max = deleteField();
      }

      await updateDoc(docRef, updateData);
    } catch (error) {
      console.error("Error updating property:", error);
      throw error;
    }
  },

  /**
   * Eliminar una propiedad
   *
   * Elimina permanentemente un documento de la colección de propiedades.
   *
   * @param id - ID de la propiedad a eliminar
   */
  async deleteProperty(id: string): Promise<void> {
    try {
      const docRef = doc(db, COLLECTIONS.PROPERTIES, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting property:", error);
      throw error;
    }
  },

  /**
   * Destacar o quitar destacado de una propiedad
   *
   * Actualiza el estado de publication_status de una propiedad
   * para destacarla o quitarle el destacado.
   *
   * @param id - ID de la propiedad
   * @param featured - true para destacar, false para quitar destacado
   */
  async toggleFeaturedProperty(id: string, featured: boolean): Promise<void> {
    try {
      console.log(
        `🔄 [FIRESTORE] Cambiando estado destacado: ${id} -> ${
          featured ? "Destacado" : "Activo"
        }`
      );

      const docRef = doc(db, COLLECTIONS.PROPERTIES, id);
      await updateDoc(docRef, {
        publication_status: featured ? "Destacado" : "Activo",
        updatedAt: Timestamp.now(),
      });

      console.log(`✅ [FIRESTORE] Estado actualizado exitosamente`);
    } catch (error) {
      console.error("❌ [FIRESTORE] Error toggling featured property:", error);
      throw error;
    }
  },

  /**
   * Obtener propiedades destacadas
   *
   * Recupera todas las propiedades que tienen publication_status = "Destacado"
   * ordenadas por fecha de creación (más recientes primero).
   *
   * @param maxResults - Número máximo de propiedades a retornar (opcional)
   * @returns Promise<Property[]> Array de propiedades destacadas
   */
  async getFeaturedProperties(maxResults?: number): Promise<Property[]> {
    try {
      console.log("🔍 [SERVICE] Buscando propiedades destacadas...");

      try {
        // Intentar con query optimizada (necesita índice compuesto)
        let q = query(
          collection(db, COLLECTIONS.PROPERTIES),
          where("publication_status", "==", "Destacado"),
          orderBy("createdAt", "desc")
        );

        if (maxResults) {
          q = query(q, limit(maxResults));
        }

        const querySnapshot = await getDocs(q);
        console.log(
          `📊 [SERVICE] Documentos encontrados con query optimizada: ${querySnapshot.size}`
        );

        const properties = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          console.log(
            `📝 [SERVICE] Propiedad encontrada: ${data.title} - Status: ${data.publication_status}`
          );
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate
              ? data.createdAt.toDate()
              : data.createdAt
              ? new Date(data.createdAt)
              : new Date(),
            updatedAt: data.updatedAt?.toDate
              ? data.updatedAt.toDate()
              : data.updatedAt
              ? new Date(data.updatedAt)
              : new Date(),
          };
        }) as Property[];

        console.log(
          `✅ [SERVICE] Retornando ${properties.length} propiedades destacadas`
        );
        return properties;
      } catch (indexError) {
        console.warn(
          "⚠️ [SERVICE] Query optimizada falló, usando fallback:",
          indexError
        );

        // Fallback: solo filtrar por publication_status, ordenar en memoria
        const q = query(
          collection(db, COLLECTIONS.PROPERTIES),
          where("publication_status", "==", "Destacado")
        );

        const querySnapshot = await getDocs(q);
        console.log(
          `📊 [SERVICE] Documentos encontrados con fallback: ${querySnapshot.size}`
        );

        let properties = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          console.log(
            `📝 [SERVICE] Propiedad encontrada: ${data.title} - Status: ${data.publication_status}`
          );
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate
              ? data.createdAt.toDate()
              : data.createdAt
              ? new Date(data.createdAt)
              : new Date(),
            updatedAt: data.updatedAt?.toDate
              ? data.updatedAt.toDate()
              : data.updatedAt
              ? new Date(data.updatedAt)
              : new Date(),
          };
        }) as Property[];

        // Ordenar en memoria por fecha de creación
        properties.sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        );

        // Aplicar límite si se especifica
        if (maxResults) {
          properties = properties.slice(0, maxResults);
        }

        console.log(
          `✅ [SERVICE] Retornando ${properties.length} propiedades destacadas (fallback)`
        );
        return properties;
      }
    } catch (error) {
      console.error("❌ [SERVICE] Error getting featured properties:", error);
      throw error;
    }
  },

  /**
   * Obtener propiedades generales (no destacadas)
   *
   * Obtiene todas las propiedades que NO están destacadas, ordenadas por fecha de creación.
   * Incluye filtros para solo mostrar propiedades disponibles.
   *
   * @param maxResults - Número máximo de propiedades a retornar (opcional)
   * @returns Promise<Property[]> Array de propiedades generales
   */
  async getGeneralProperties(maxResults?: number): Promise<Property[]> {
    try {
      console.log("🔍 [SERVICE] Buscando propiedades generales...");

      // Obtener todas las propiedades sin filtros complejos
      const q = query(
        collection(db, COLLECTIONS.PROPERTIES),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);
      console.log(
        `📊 [SERVICE] Documentos totales encontrados: ${querySnapshot.size}`
      );

      let properties = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate
            ? data.createdAt.toDate()
            : data.createdAt
            ? new Date(data.createdAt)
            : new Date(),
          updatedAt: data.updatedAt?.toDate
            ? data.updatedAt.toDate()
            : data.updatedAt
            ? new Date(data.updatedAt)
            : new Date(),
        };
      }) as Property[];

      // Filtrar en memoria para propiedades disponibles y no destacadas
      properties = properties.filter(
        (property) =>
          (property.status === "available" ||
            (property as any).status === "Disponible") &&
          property.publication_status !== "Destacado"
      );

      console.log(
        `📝 [SERVICE] Propiedades después del filtro (disponibles y no destacadas): ${properties.length}`
      );

      properties.forEach((property, index) => {
        console.log(
          `${index + 1}. ${property.title} - Status: ${
            (property as any).status
          } - Publication: ${property.publication_status || "Sin status"}`
        );
      });

      // Aplicar límite si se especifica
      if (maxResults) {
        properties = properties.slice(0, maxResults);
      }

      console.log(
        `✅ [SERVICE] Retornando ${properties.length} propiedades generales`
      );
      return properties;
    } catch (error) {
      console.error("❌ [SERVICE] Error getting general properties:", error);
      throw error;
    }
  },

  /**
   * Obtener propiedades con filtros
   *
   * Realiza una consulta filtrada en la colección de propiedades
   * basada en criterios específicos como ciudad, tipo, precio, etc.
   *
   * @param filters - Objeto con criterios de filtrado
   * @returns Promise<Property[]> Propiedades que coinciden con los filtros
   */
  async getPropertiesWithFilters(filters: {
    city?: string; // Filtrar por ciudad
    type?: string; // Filtrar por tipo de propiedad
    minPrice?: number; // Precio mínimo
    maxPrice?: number; // Precio máximo
    status?: string; // Filtrar por estado
  }): Promise<Property[]> {
    try {
      // Iniciar con la colección base
      let q = collection(db, COLLECTIONS.PROPERTIES);
      const constraints = [];

      // Agregar filtros condicionales
      if (filters.city) {
        constraints.push(where("city", "==", filters.city));
      }
      if (filters.type) {
        constraints.push(where("type", "==", filters.type));
      }
      if (filters.status) {
        constraints.push(where("status", "==", filters.status));
      }
      if (filters.minPrice !== undefined) {
        constraints.push(where("price", ">=", filters.minPrice));
      }
      if (filters.maxPrice !== undefined) {
        constraints.push(where("price", "<=", filters.maxPrice));
      }

      // Ordenar por fecha de creación (más recientes primero)
      constraints.push(orderBy("createdAt", "desc"));

      // Ejecutar la consulta con todos los filtros
      const querySnapshot = await getDocs(query(q, ...constraints));

      // Mapear y formatear los resultados
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as Property[];
    } catch (error) {
      console.error("Error getting filtered properties:", error);
      throw error;
    }
  },

  /**
   * Suscripción en tiempo real a propiedades
   *
   * Establece un listener que se ejecuta cada vez que hay cambios
   * en la colección de propiedades, permitiendo actualizaciones
   * automáticas en la interfaz de usuario.
   *
   * @param callback - Función que se ejecuta con los datos actualizados
   * @returns Función para cancelar la suscripción
   */
  subscribeToProperties(callback: (properties: Property[]) => void) {
    // Crear consulta ordenada por fecha de creación
    const q = query(
      collection(db, COLLECTIONS.PROPERTIES),
      orderBy("createdAt", "desc")
    );

    // Retornar la función de cancelación del listener
    return onSnapshot(q, (querySnapshot) => {
      const properties = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate
            ? data.createdAt.toDate()
            : data.createdAt
            ? new Date(data.createdAt)
            : new Date(),
          updatedAt: data.updatedAt?.toDate
            ? data.updatedAt.toDate()
            : data.updatedAt
            ? new Date(data.updatedAt)
            : new Date(),
        };
      }) as Property[];
      callback(properties);
    });
  },
};

/**
 * Obtener propiedades paginadas
 *
 * Recupera una página de propiedades ordenadas por fecha de creación (más recientes primero).
 * @param page - Número de página (1-indexed)
 * @param pageSize - Cantidad de propiedades por página
 * @returns Promise<{ properties: Property[]; total: number; }>
 */
export async function getPaginatedProperties(
  page: number,
  pageSize: number
): Promise<{ properties: any[]; total: number }> {
  try {
    // Primero obtener todas las propiedades para calcular el total correcto
    const allSnapshot = await getDocs(collection(db, COLLECTIONS.PROPERTIES));
    const total = allSnapshot.size;

    // Obtener todas las propiedades ordenadas
    const q = query(
      collection(db, COLLECTIONS.PROPERTIES),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);

    // Aplicar paginación manualmente
    const offset = (page - 1) * pageSize;
    const docs = querySnapshot.docs.slice(offset, offset + pageSize);

    const properties = docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate
          ? data.createdAt.toDate().toISOString()
          : null,
        updatedAt: data.updatedAt?.toDate
          ? data.updatedAt.toDate().toISOString()
          : null,
      };
    });

    return { properties, total };
  } catch (error) {
    console.error("Error getting paginated properties:", error);
    throw error;
  }
}

/**
 * Servicio de operaciones para compradores
 *
 * Gestiona las operaciones CRUD para la colección de compradores
 * potenciales que han completado el formulario de búsqueda.
 */
export const buyerService = {
  /**
   * Crear un nuevo comprador
   *
   * @param buyerData - Datos del comprador
   * @returns Promise<string> ID del comprador creado
   */
  async createBuyer(buyerData: any): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.BUYERS), {
        ...buyerData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      return docRef.id;
    } catch (error) {
      console.error("Error creating buyer:", error);
      throw error;
    }
  },

  /**
   * Obtener todos los compradores
   *
   * @returns Promise<any[]> Array de todos los compradores
   */
  async getAllBuyers(): Promise<any[]> {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTIONS.BUYERS));
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      }));
    } catch (error) {
      console.error("Error getting buyers:", error);
      throw error;
    }
  },
};

/**
 * Servicio de operaciones para propietarios
 *
 * Gestiona las operaciones CRUD para la colección de propietarios
 * que han completado el formulario de venta de propiedades.
 */
export const ownerService = {
  /**
   * Crear un nuevo propietario
   *
   * @param ownerData - Datos del propietario
   * @returns Promise<string> ID del propietario creado
   */
  async createOwner(ownerData: any): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.OWNERS), {
        ...ownerData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      return docRef.id;
    } catch (error) {
      console.error("Error creating owner:", error);
      throw error;
    }
  },

  /**
   * Obtener todos los propietarios
   *
   * @returns Promise<any[]> Array de todos los propietarios
   */
  async getAllOwners(): Promise<any[]> {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTIONS.OWNERS));
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      }));
    } catch (error) {
      console.error("Error getting owners:", error);
      throw error;
    }
  },
};

/**
 * Servicio de operaciones para contactos generales
 *
 * Gestiona las operaciones CRUD para la colección de contactos
 * que han completado el formulario de contacto general.
 */
export const contactService = {
  /**
   * Crear un nuevo contacto
   *
   * @param contactData - Datos del contacto
   * @returns Promise<string> ID del contacto creado
   */
  async createContact(contactData: any): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.CONTACTS), {
        ...contactData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      return docRef.id;
    } catch (error) {
      console.error("Error creating contact:", error);
      throw error;
    }
  },

  /**
   * Obtener todos los contactos
   *
   * @returns Promise<any[]> Array de todos los contactos
   */
  async getAllContacts(): Promise<any[]> {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTIONS.CONTACTS));
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      }));
    } catch (error) {
      console.error("Error getting contacts:", error);
      throw error;
    }
  },
};

// Exportaciones específicas para APIs
export const getFeaturedProperties = (maxResults?: number) =>
  propertyService.getFeaturedProperties(maxResults);

export const getGeneralProperties = (maxResults?: number) =>
  propertyService.getGeneralProperties(maxResults);
