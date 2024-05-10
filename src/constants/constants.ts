import { Field, LegalSituation, PaymentMethod, ProjectType, PropertyType } from "@/types/forms.d";

export const USER_ROLES = {
    BUYER: "buyer",
    SELLER: "seller",
};

const booleanOptions = [{ value: true, label: 'Sí' }, { value: false, label: 'No' }];

export const QUESTIONS: Record<string, Field> = {
    firstQuestion: { id: 'firstQuestion', type: 'radio', label: '¿Deseas vender tu propiedad en menos de tres meses?', options: booleanOptions },
    secondQuestion: { id: 'secondQuestion', type: 'radio', label: '¿Estás de acuerdo en vender tu propiedad a un precio competitivo en el mercado?', options: booleanOptions },
};

export const PERSONAL_DATA: Record<string, Field> = {
    nombre: { id: 'nombre', type: 'text', label: 'Nombre' },
    correo: { id: 'correo', type: 'email', label: 'Correo Electrónico' },
    telefono: { id: 'telefono', type: 'tel', label: 'Telefono' },
};

export const CITY_OPTIONS = [
    { value: 'Bogota', label: 'Bogotá' },
    { value: 'Cali', label: 'Cali' },
    { value: 'Medellin', label: 'Medellin' },
    { value: 'Pasto', label: 'Pasto' },
];

export const LEGAL_SITUATIONS_OPTIONS = [
    { value: LegalSituation.ListaParaEscriturar, label: 'Lista para escriturar' },
    { value: LegalSituation.CreditoHipotecarioLeasing, label: 'Credito Hipotecario Leasing' },
    { value: LegalSituation.CreditoPersonaNatural, label: 'Credito Persona Natural' },
    { value: LegalSituation.PatrimonioDeFamilia, label: 'Patrimonio de Familia' },
    { value: LegalSituation.Sucesion, label: 'Sucesión' },
    { value: LegalSituation.Otra, label: 'Otra' },
];

export const PAYMENT_METHOD_OPTIONS = [
    { value: PaymentMethod.Credito, label: 'Crédito' },
    { value: PaymentMethod.RecursosPropios, label: 'Recursos Propios' },
    { value: PaymentMethod.Permutas, label: 'Permutas' },
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

const livingInfoOwner = ['direccion', 'edadPropiedad', 'areaConstruida', 'terraza', 'patio', 'habitaciones', 'baños', 'parqueaderos', 'piso', 'estudio', 'deposito', 'balcon', 'vigilancia', 'piscina', 'valorAdministracion', 'valorAproximado', 'situacionJuridica', 'comentariosAdicionales'];
export const PROPERTY_INFO_OWNER: Record<PropertyType | "default", string[]> = {
    default: [],
    [PropertyType.Casa]: livingInfoOwner,
    [PropertyType.Apartamento]: livingInfoOwner,
    [PropertyType.ApartamentoDuplex]: livingInfoOwner,
    [PropertyType.Penthouse]: livingInfoOwner,
    [PropertyType.CasaCampestre]: livingInfoOwner,
    [PropertyType.Apartaestudio]: livingInfoOwner,
    [PropertyType.Lote]: ['direccion', 'area', 'valorAproximado', 'situacionJuridica', 'comentariosAdicionales'],
    [PropertyType.Oficina]: ['direccion', 'edadPropiedad', 'baños', 'parqueaderos', 'piso', 'deposito', 'balcon', 'vigilancia', 'valorAdministracion', 'valorAproximado', 'situacionJuridica', 'comentariosAdicionales'],
    [PropertyType.Local]: ['direccion', 'edadPropiedad', 'baños', 'parqueaderos', 'piso', 'deposito', 'valorAdministracion', 'valorAproximado', 'situacionJuridica', 'comentariosAdicionales'],
    [PropertyType.Bodega]: ['direccion', 'edadPropiedad', 'area', 'valorAproximado', 'situacionJuridica', 'comentariosAdicionales'],
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
    areaConstruida: { id: 'areaConstruida', type: 'number', label: 'Área Construida (m²)' },
    direccion: { id: 'direccion', type: 'text', label: 'Dirección Propiedad' },
    edadPropiedad: { id: 'edadPropiedad', type: 'number', label: 'Edad Propiedad (años)' },
    terraza: { id: 'terraza', type: 'number', label: 'Terraza (m²)' },
    patio: { id: 'patio', type: 'number', label: 'Patio (m²)' },
    habitaciones: { id: 'habitaciones', type: 'number', label: 'Habitaciones' },
    baños: { id: 'baños', type: 'number', label: 'Baños' },
    piso: { id: 'piso', type: 'number', label: 'Piso' },
    parqueaderos: { id: 'parqueaderos', type: 'number', label: 'Parqueaderos' },
    estudio: { id: 'estudio', type: 'radio', options: booleanOptions, label: 'Estudio' },
    deposito: { id: 'deposito', type: 'radio', options: booleanOptions, label: 'Deposito' },
    balcon: { id: 'balcon', type: 'radio', options: booleanOptions, label: 'Balcón' },
    vigilancia: { id: 'vigilancia', type: 'radio', options: booleanOptions, label: 'Vigilancia' },
    piscina: { id: 'piscina', type: 'radio', options: booleanOptions, label: 'Piscina' },
    formaDePago: { id: 'formaDePago', type: 'radio', options: [{ value: PaymentMethod.Credito, label: 'Crédito' }, { value: PaymentMethod.RecursosPropios, label: 'Recursos Propios' }, { value: PaymentMethod.Permutas, label: 'Permutas' }], label: 'Forma de Pago' },
    presupuesto: { id: 'presupuesto', type: 'number', label: 'Presupuesto (COP)' },
    valorAdministracion: { id: 'valorAdministracion', type: 'number', label: 'Valor Administración (COP)' },
    valorAproximado: { id: 'valorAproximado', type: 'number', label: 'Valor Aproximado Propiedad (COP)' },
    area: { id: 'area', type: 'number', label: 'Área (m²)' },
    situacionJuridica: { id: 'situacionJuridica', type: 'select', options: [{ value: LegalSituation.ListaParaEscriturar, label: 'Lista para escriturar' }, { value: LegalSituation.CreditoHipotecarioLeasing, label: 'Credito Hipotecario Leasing' }, { value: LegalSituation.CreditoPersonaNatural, label: 'Credito Persona Natural' }, { value: LegalSituation.PatrimonioDeFamilia, label: 'Patrimonio de Familia' }, { value: LegalSituation.Sucesion, label: 'Sucesión' }, { value: LegalSituation.Otra, label: 'Otra' }], label: 'Situación Jurídica' },
    tipoProyecto: { id: 'tipoProyecto', type: 'select', options: [{ value: ProjectType.Rural, label: 'Rural' }, { value: ProjectType.Urbano, label: 'Urbano' }, { value: ProjectType.Residencial, label: 'Residencial' }, { value: ProjectType.Comercial, label: 'Comercial' }, { value: ProjectType.Edificio, label: 'Edificio' }, { value: ProjectType.Conjunto, label: 'Conjunto' }], label: 'Tipo de proyecto' },
    comentariosAdicionales: { id: 'comentariosAdicionales', type: 'text', label: 'Comentarios Adicionales' },
};
