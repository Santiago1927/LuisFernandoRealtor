/**
 * Enumeración que define los roles de usuario en el sistema
 * Se utiliza para identificar si el usuario es propietario o comprador
 */
export enum Role {
    Owner = "OWNER",    // Propietario que desea vender/alquilar
    Buyer = "BUYER",    // Comprador que busca propiedades
}

/**
 * Enumeración que define los tipos de propiedades inmobiliarias disponibles
 * Categoriza las diferentes clases de propiedades que se pueden listar
 */
export enum PropertyType {
    Casa = "CASA",                              // Casa unifamiliar
    Apartamento = "APARTAMENTO",                // Apartamento estándar
    ApartamentoDuplex = "APARTAMENTO_DUPLEX",   // Apartamento dúplex
    CasaCampestre = "CASA_CAMPESTRE",           // Casa campestre/finca
    Penthouse = "PENTHOUSE",                    // Penthouse de lujo
    Apartaestudio = "APARTAESTUDIO",            // Apartaestudio
    Lote = "LOTE",                              // Terreno/lote
    Oficina = "OFICINA",                        // Oficina comercial
    Local = "LOCAL",                            // Local comercial
    Bodega = "BODEGA",                          // Bodega/almacén
    ProyectoInmobiliario = "PROYECTO_INMOBILIARIO", // Proyecto en desarrollo
}

/**
 * Enumeración que define las ciudades donde se ofrecen servicios inmobiliarios
 * Lista de ciudades principales cubiertas por la plataforma
 */
export enum City {
    Medellin = "MEDELLIN",  // Medellín, Antioquia
    Bogota = "BOGOTA",      // Bogotá, Cundinamarca
    Cali = "CALI",          // Cali, Valle del Cauca
    Pasto = "PASTO",        // Pasto, Nariño
}

/**
 * Enumeración que define los campos de datos personales estándar
 * Campos básicos que se recopilan en todos los formularios
 */
export enum PersonalData {
    Nombre = "nombre",      // Nombre completo del usuario
    Correo = "correo",      // Dirección de correo electrónico
    Telefono = "telefono",  // Número de teléfono de contacto
}

/**
 * Enumeración que define los métodos de pago disponibles
 * Formas en que los compradores pueden financiar la adquisición de propiedades
 */
export enum PaymentMethod {
    Credito = "CREDITO",           // Crédito bancario o hipotecario
    RecursosPropios = "RECURSOS",  // Pago con recursos propios
    Permutas = "PERMUTAS",         // Intercambio de propiedades
}

/**
 * Enumeración que define las situaciones jurídicas de las propiedades
 * Estados legales que puede tener una propiedad para su venta
 */
export enum LegalSituation {
    ListaParaEscriturar = "LISTA_PARA_ESCRITURAR",           // Propiedad lista para escriturar
    CreditoHipotecarioLeasing = "CREDITO_HIPOTECARIO_LEASING", // Propiedad con crédito hipotecario
    CreditoPersonaNatural = "CREDITO_PERSONA_NATURAL",       // Propiedad con crédito de persona natural
    PatrimonioDeFamilia = "PATRIMONIO_DE_FAMILIA",           // Propiedad en patrimonio de familia
    Sucesion = "SUCESION",                                   // Propiedad en proceso de sucesión
    Otra = "OTRA",                                           // Otra situación jurídica
}

/**
 * Enumeración que define los tipos de proyectos inmobiliarios
 * Categorías para clasificar proyectos de desarrollo inmobiliario
 */
export enum ProjectType {
    Rural = "RURAL",           // Proyecto en zona rural
    Urbano = "URBANO",         // Proyecto en zona urbana
    Residencial = "RESIDENCIAL", // Proyecto residencial
    Comercial = "COMERCIAL",   // Proyecto comercial
    Edificio = "EDIFICIO",     // Proyecto de edificio
    Conjunto = "CONJUNTO",     // Proyecto de conjunto residencial
}

/**
 * Interfaz que define la estructura de un campo de formulario
 * @param id - Identificador único del campo
 * @param type - Tipo de campo (number, text, select, radio, email, tel)
 * @param label - Etiqueta descriptiva del campo
 * @param options - Opciones disponibles para campos select y radio (opcional)
 */
export interface Field {
    id: string;
    type: "number" | "text" | "select" | "radio" | "email" | "tel";
    label: string;
    options?: Array<{ value: any; label: string }>;
}

/**
 * Interfaz que define la estructura de datos de los formularios
 * @param tipoPropiedad - Tipo de propiedad seleccionado (opcional)
 * @param [key: string] - Propiedades adicionales dinámicas
 */
export interface FormData {
    tipoPropiedad?: PropertyType;
    [key: string]: any;
}

/**
 * Interfaz que define las propiedades del componente BuyerForm
 * @param formSubmit - Función callback que se ejecuta al enviar el formulario
 * @param loading - Estado de carga del formulario
 */
export interface BuyerFormProps {
    formSubmit: (data: FormData) => void;
    loading: boolean;
}

/**
 * Interfaz que define las propiedades del componente OwnerForm
 * @param formSubmit - Función callback que se ejecuta al enviar el formulario
 * @param loading - Estado de carga del formulario
 */
export interface OwnerFormProps {
    formSubmit: (data: FormData) => void;
    loading: boolean;
}