import {
  propertyService,
  buyerService,
  ownerService,
  contactService,
} from "../firebase/firestoreService";
import { Amenity, PaymentMethod, ExchangeType } from "../src/types/property";

// Datos de ejemplo para propiedades
const sampleProperties = [
  {
    title: "Hermosa casa en Medellín",
    address: "Calle 123 #45-67, Medellín",
    city: "Medellin",
    price: 850000000,
    description:
      "Casa moderna con excelente ubicación, 3 habitaciones, 2 baños, garaje para 2 carros.",
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800",
    ],
    videos: [],
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    type: "Casa" as const,
    status: "available" as const,
    lat: 6.2442,
    lng: -75.5812,
    // Nuevos campos
    conjunto_cerrado: true,
    valor_administracion: 150000,
    zonas_comunes: [
      "piscina",
      "gym",
      "zona BBQ",
      "juegos infantiles",
      "portería",
    ] as Amenity[],
    numero_pisos: 2,
    formas_de_pago: [
      "Crédito hipotecario o leasing",
      "Recursos propios",
    ] as PaymentMethod[],
    edad_propiedad: "5 años",
  },
  {
    title: "Apartamento de lujo en Bogotá",
    address: "Carrera 15 #93-47, Bogotá",
    city: "Bogota",
    price: 1200000000,
    description:
      "Apartamento de lujo en zona exclusiva, acabados premium, vista panorámica.",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    ],
    videos: [],
    bedrooms: 4,
    bathrooms: 3,
    area: 220,
    type: "Apartamento" as const,
    status: "available" as const,
    lat: 4.711,
    lng: -74.0721,
    // Nuevos campos
    conjunto_cerrado: true,
    valor_administracion: 280000,
    zonas_comunes: [
      "piscina",
      "gym",
      "sauna",
      "turco",
      "terraza",
      "lobby",
      "portería",
      "parqueadero para visitantes",
    ] as Amenity[],
    formas_de_pago: [
      "Crédito hipotecario o leasing",
      "Recursos propios",
    ] as PaymentMethod[],
    edad_propiedad: "Nueva",
  },
  {
    title: "Local comercial en Cali",
    address: "Avenida 4 Norte #6N-23, Cali",
    city: "Cali",
    price: 450000000,
    description: "Local comercial en zona de alto tráfico, ideal para negocio.",
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
    ],
    videos: [],
    area: 150,
    type: "Local" as const,
    status: "available" as const,
    lat: 3.4516,
    lng: -76.532,
    // Nuevos campos
    conjunto_cerrado: false,
    valor_administracion: 80000,
    zonas_comunes: ["recepción", "parqueadero para visitantes"] as Amenity[],
    formas_de_pago: ["Recursos propios", "Permutas"] as PaymentMethod[],
    tipo_permuta: "Propiedades" as ExchangeType,
    permuta_porcentaje: 30,
    edad_propiedad: "10 años",
  },
  {
    title: "Lote en zona residencial",
    address: "Carrera 50 #80-120, Medellín",
    city: "Medellin",
    price: 320000000,
    description:
      "Lote plano en zona residencial consolidada, ideal para construir.",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
    ],
    videos: [],
    area: 400,
    type: "Lote" as const,
    status: "available" as const,
    lat: 6.2518,
    lng: -75.5636,
    // Nuevos campos específicos para lote
    conjunto_cerrado: false,
    lote_frente: 16,
    lote_fondo: 25,
    formas_de_pago: [
      "Recursos propios",
      "Crédito hipotecario o leasing",
    ] as PaymentMethod[],
    edad_propiedad: "Terreno disponible",
  },
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
  },
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

    piscina: false,
    valorAdministracion: 150000,
    valorAproximado: 900000000,
    situacionJuridica: "LISTA_PARA_ESCRITURAR",
    comentariosAdicionales: "Casa en excelente estado, lista para vender.",
    userType: "owner",
  },
];

// Datos de ejemplo para contactos
const sampleContacts = [
  {
    nombre: "Ana López",
    correo: "ana.lopez@email.com",
    telefono: "3201111111",
    asunto: "Consulta sobre servicios inmobiliarios",
    mensaje:
      "Hola, me gustaría obtener más información sobre sus servicios de asesoría inmobiliaria. ¿Podrían contactarme?",
    userType: "contact",
  },
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
