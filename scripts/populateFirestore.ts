import { propertyService, buyerService, ownerService, contactService } from '../firebase/firestoreService';

// Datos de ejemplo para propiedades
const sampleProperties = [
  {
    title: "Hermosa casa en Medellín",
    address: "Calle 123 #45-67, Medellín",
    city: "Medellin",
    price: 850000000,
    description: "Casa moderna con excelente ubicación, 3 habitaciones, 2 baños, garaje para 2 carros.",
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800"
    ],
    videos: [],
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    type: "house" as const,
    status: "available" as const,
    lat: 6.2442,
    lng: -75.5812,
  },
  {
    title: "Apartamento de lujo en Bogotá",
    address: "Carrera 15 #93-47, Bogotá",
    city: "Bogota",
    price: 1200000000,
    description: "Apartamento de lujo en zona exclusiva, acabados premium, vista panorámica.",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"
    ],
    videos: [],
    bedrooms: 4,
    bathrooms: 3,
    area: 220,
    type: "apartment" as const,
    status: "available" as const,
    lat: 4.7110,
    lng: -74.0721,
  },
  {
    title: "Local comercial en Cali",
    address: "Avenida 4 Norte #6N-23, Cali",
    city: "Cali",
    price: 450000000,
    description: "Local comercial en zona de alto tráfico, ideal para negocio.",
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800"
    ],
    videos: [],
    area: 150,
    type: "commercial" as const,
    status: "available" as const,
    lat: 3.4516,
    lng: -76.5320,
  }
];

// Datos de ejemplo para compradores
const sampleBuyers = [
  {
    nombre: "Juan Pérez",
    correo: "juan.perez@email.com",
    telefono: "3001234567",
    ciudad: "MEDELLIN",
    tipoPropiedad: "CASA",
    habitaciones: 3,
    baños: 2,
    parqueaderos: 2,
    deposito: true,
    formaDePago: "CREDITO",
    presupuesto: 800000000,
    userType: "buyer",
  },
  {
    nombre: "María García",
    correo: "maria.garcia@email.com",
    telefono: "3109876543",
    ciudad: "BOGOTA",
    tipoPropiedad: "APARTAMENTO",
    habitaciones: 2,
    baños: 1,
    parqueaderos: 1,
    deposito: false,
    formaDePago: "RECURSOS",
    presupuesto: 600000000,
    userType: "buyer",
  }
];

// Datos de ejemplo para propietarios
const sampleOwners = [
  {
    nombre: "Carlos Rodríguez",
    correo: "carlos.rodriguez@email.com",
    telefono: "3155555555",
    ciudad: "MEDELLIN",
    tipoPropiedad: "CASA",
    firstQuestion: true,
    secondQuestion: true,
    direccion: "Calle 100 #50-30, Medellín",
    edadPropiedad: 5,
    areaConstruida: 200,
    habitaciones: 4,
    baños: 3,
    parqueaderos: 2,
    estudio: true,
    deposito: true,
    balcon: true,
    vigilancia: true,
    piscina: false,
    valorAdministracion: 150000,
    valorAproximado: 900000000,
    situacionJuridica: "LISTA_PARA_ESCRITURAR",
    comentariosAdicionales: "Casa en excelente estado, lista para vender.",
    userType: "owner",
  }
];

// Datos de ejemplo para contactos
const sampleContacts = [
  {
    nombre: "Ana López",
    correo: "ana.lopez@email.com",
    telefono: "3201111111",
    asunto: "Consulta sobre servicios inmobiliarios",
    mensaje: "Hola, me gustaría obtener más información sobre sus servicios de asesoría inmobiliaria. ¿Podrían contactarme?",
    userType: "contact",
  }
];

export async function populateFirestore() {
  try {
    console.log("Iniciando población de datos en Firestore...");

    // Poblar propiedades
    console.log("Poblando propiedades...");
    for (const propertyData of sampleProperties) {
      const propertyWithDates = {
        ...propertyData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await propertyService.createProperty(propertyWithDates);
      console.log(`Propiedad creada: ${propertyData.title}`);
    }

    // Poblar compradores
    console.log("Poblando compradores...");
    for (const buyerData of sampleBuyers) {
      await buyerService.createBuyer(buyerData);
      console.log(`Comprador creado: ${buyerData.nombre}`);
    }

    // Poblar propietarios
    console.log("Poblando propietarios...");
    for (const ownerData of sampleOwners) {
      await ownerService.createOwner(ownerData);
      console.log(`Propietario creado: ${ownerData.nombre}`);
    }

    // Poblar contactos
    console.log("Poblando contactos...");
    for (const contactData of sampleContacts) {
      await contactService.createContact(contactData);
      console.log(`Contacto creado: ${contactData.nombre}`);
    }

    console.log("¡Población de datos completada exitosamente!");
  } catch (error) {
    console.error("Error al poblar datos:", error);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  populateFirestore();
} 