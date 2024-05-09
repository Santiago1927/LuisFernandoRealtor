import { Field, LegalSituation, PaymentMethod, ProjectType, PropertyType } from "@/types/forms.d";

export const USER_ROLES = {
    BUYER: "buyer",
    SELLER: "seller",
};

const booleanOptions = [{ value: true, label: 'Sí' }, { value: false, label: 'No' }];

export const QUESTIONS: Record<string, Field> = {
    firstQuestion: { type: 'radio', label: '¿Deseas vender tu propiedad en menos de tres meses?', options: booleanOptions },
    secondQuestion: { type: 'radio', label: '¿Estás de acuerdo en vender tu propiedad a un precio competitivo en el mercado?', options: booleanOptions },
};

export const PERSONAL_DATA: Record<string, Field> = {
    nombre: { type: 'text', label: 'Nombre' },
    correo: { type: 'email', label: 'Correo Electrónico' },
    telefono: { type: 'tel', label: 'Telefono' },
};

export const CITY_OPTIONS = [
    { value: 'Bogota', label: 'Bogotá' },
    { value: 'Cali', label: 'Cali' },
    { value: 'Medellin', label: 'Medellin' },
    { value: 'Pasto', label: 'Pasto' },
];

export const PROPERTY_TYPE_OPTIONS = [
    { value: PropertyType.Casa, label: 'Casa' },
    { value: PropertyType.Apartamento, label: 'Apartamento' },
    { value: PropertyType.ApartamentoDuplex, label: 'Apartamento Duplex' },
    { value: PropertyType.CasaCampestre, label: 'Casa Campestre' },
    { value: PropertyType.Penthouse, label: 'Penthouse' },
    { value: PropertyType.Apartaestudio, label: 'Apartaestudio' },
    { value: PropertyType.Lote, label: 'Lote' },
    { value: PropertyType.Oficina, label: 'Oficina' },
    { value: PropertyType.Local, label: 'Local' },
    { value: PropertyType.Bodega, label: 'Bodega' },
    { value: PropertyType.ProyectoInmobiliario, label: 'Proyecto Inmobiliario' },
];

const livingInfoOwner = ['dirección', 'edadPropiedad', 'areaConstruida', 'terraza', 'patio', 'habitaciones', 'baños', 'parqueaderos', 'piso', 'estudio', 'deposito', 'balcon', 'vigilancia', 'piscina', 'valorAdministracion', 'valorAproximado', 'situacionJuridica', 'comentariosAdicionales'];
export const PROPERTY_INFO_OWNER: Record<PropertyType | "default", string[]> = {
    default: [],
    [PropertyType.Casa]: livingInfoOwner,
    [PropertyType.Apartamento]: livingInfoOwner,
    [PropertyType.ApartamentoDuplex]: livingInfoOwner,
    [PropertyType.Penthouse]: livingInfoOwner,
    [PropertyType.CasaCampestre]: livingInfoOwner,
    [PropertyType.Apartaestudio]: livingInfoOwner,
    [PropertyType.Lote]: ['dirección', 'area', 'valorAproximado', 'situacionJuridica', 'comentariosAdicionales'],
    [PropertyType.Oficina]: ['dirección', 'edadPropiedad', 'baños', 'parqueaderos', 'piso', 'deposito', 'balcon', 'vigilancia', 'valorAdministracion', 'valorAproximado', 'situacionJuridica', 'comentariosAdicionales'],
    [PropertyType.Local]: ['dirección', 'edadPropiedad', 'baños', 'parqueaderos', 'piso', 'deposito', 'valorAdministracion', 'valorAproximado', 'situacionJuridica', 'comentariosAdicionales'],
    [PropertyType.Bodega]: ['dirección', 'edadPropiedad', 'area', 'valorAproximado', 'situacionJuridica', 'comentariosAdicionales'],
    [PropertyType.ProyectoInmobiliario]: ['tipoProyecto', 'comentariosAdicionales'],
};

const livingInfoBuyer = ['habitaciones', 'baños', 'parqueaderos', 'deposito', 'formaDePago', 'presupuesto', 'comentariosAdicionales'];
const comercialInfoBuyer = ['area', 'formaDePago', 'presupuesto', 'comentariosAdicionales'];
export const PROPERTY_INFO_BUYER: Partial<Record<PropertyType, string[]>> = {
    [PropertyType.Casa]: livingInfoBuyer,
    [PropertyType.Apartamento]: livingInfoBuyer,
    [PropertyType.ApartamentoDuplex]: livingInfoBuyer,
    [PropertyType.Penthouse]: livingInfoBuyer,
    [PropertyType.CasaCampestre]: livingInfoBuyer,
    [PropertyType.Apartaestudio]: livingInfoBuyer,
    [PropertyType.Lote]: comercialInfoBuyer,
    [PropertyType.Oficina]: comercialInfoBuyer,
    [PropertyType.Local]: comercialInfoBuyer,
    [PropertyType.Bodega]: comercialInfoBuyer,
};

export const INPUT_INFO: Record<string, Field> = {
    areaConstruida: { type: 'number', label: 'Área Construida (m²)' },
    dirección: { type: 'text', label: 'Dirección Propiedad' },
    edadPropiedad: { type: 'number', label: 'Edad Propiedad (años)' },
    terraza: { type: 'number', label: 'Terraza (m²)' },
    patio: { type: 'number', label: 'Patio (m²)' },
    habitaciones: { type: 'number', label: 'Habitaciones' },
    baños: { type: 'number', label: 'Baños' },
    piso: { type: 'number', label: 'Piso' },
    parqueaderos: { type: 'number', label: 'Parqueaderos' },
    estudio: { type: 'radio', options: booleanOptions, label: 'Estudio' },
    deposito: { type: 'radio', options: booleanOptions, label: 'Deposito' },
    balcon: { type: 'radio', options: booleanOptions, label: 'Balcón' },
    vigilancia: { type: 'radio', options: booleanOptions, label: 'Vigilancia' },
    piscina: { type: 'radio', options: booleanOptions, label: 'Piscina' },
    formaDePago: { type: 'radio', options: [{ value: PaymentMethod.Credito, label: 'Crédito' }, { value: PaymentMethod.RecursosPropios, label: 'Recursos Propios' }, { value: PaymentMethod.Permutas, label: 'Permutas' }], label: 'Forma de Pago' },
    presupuesto: { type: 'number', label: 'Presupuesto (COP)' },
    valorAdministracion: { type: 'number', label: 'Valor Administración (COP)' },
    valorAproximado: { type: 'number', label: 'Valor Aproximado Propiedad (COP)' },
    area: { type: 'number', label: 'Área (m²)' },
    situacionJuridica: { type: 'select', options: [{ value: LegalSituation.ListaParaEscriturar, label: 'Lista para escriturar' }, { value: LegalSituation.CreditoHipotecarioLeasing, label: 'Credito Hipotecario Leasing' }, { value: LegalSituation.CreditoPersonaNatural, label: 'Credito Persona Natural' }, { value: LegalSituation.PatrimonioDeFamilia, label: 'Patrimonio de Familia' }, { value: LegalSituation.Sucesion, label: 'Sucesión' }, { value: LegalSituation.Otra, label: 'Otra' }], label: 'Situación Jurídica' },
    tipoProyecto: { type: 'select', options: [{ value: ProjectType.Rural, label: 'Rural' }, { value: ProjectType.Urbano, label: 'Urbano' }, { value: ProjectType.Residencial, label: 'Residencial' }, { value: ProjectType.Comercial, label: 'Comercial' }, { value: ProjectType.Edificio, label: 'Edificio' }, { value: ProjectType.Conjunto, label: 'Conjunto' }], label: 'Tipo de proyecto' },
    comentariosAdicionales: { type: 'text', label: 'Comentarios Adicionales' },
};
