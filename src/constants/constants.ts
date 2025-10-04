import {
  Field,
  LegalSituation,
  PaymentMethod,
  ProjectType,
  PropertyType,
  City,
  PersonalData,
  Role,
} from "@/types/forms.d";

export const USER_ROLES = {
  [Role.Owner]: "Propietario",
  [Role.Buyer]: "Comprador",
};

const booleanOptions = [
  { value: true, label: "Sí" },
  { value: false, label: "No" },
];

export const QUESTIONS: Record<string, Field> = {
  firstQuestion: {
    id: "firstQuestion",
    type: "radio",
    label: "¿Deseas vender tu propiedad en menos de tres meses?",
    options: booleanOptions,
  },
  secondQuestion: {
    id: "secondQuestion",
    type: "radio",
    label:
      "¿Estás de acuerdo en vender tu propiedad a un precio que este acorde al mercado?",
    options: booleanOptions,
  },
};

export const PERSONAL_DATA: Record<string, Field> = {
  [PersonalData.Nombre]: {
    id: PersonalData.Nombre,
    type: "text",
    label: "Nombre",
  },
  [PersonalData.Correo]: {
    id: PersonalData.Correo,
    type: "email",
    label: "Correo",
  },
  [PersonalData.Telefono]: {
    id: PersonalData.Telefono,
    type: "tel",
    label: "Teléfono",
  },
};

export const CITY_OPTIONS = [
  { value: City.Medellin, label: "Medellín" },
  { value: City.Bogota, label: "Bogotá" },
  { value: City.Cali, label: "Cali" },
  { value: City.Pasto, label: "Pasto" },
];

export const PROJECT_TYPE_OPTIONS = [
  { value: ProjectType.Rural, label: "Rural" },
  { value: ProjectType.Urbano, label: "Urbano" },
  { value: ProjectType.Residencial, label: "Residencial" },
  { value: ProjectType.Comercial, label: "Comercial" },
  { value: ProjectType.Edificio, label: "Edificio" },
  { value: ProjectType.Conjunto, label: "Conjunto" },
];

export const LEGAL_SITUATION_OPTIONS = [
  { value: LegalSituation.ListaParaEscriturar, label: "Lista para escriturar" },
  {
    value: LegalSituation.CreditoHipotecarioLeasing,
    label: "Credito Hipotecario Leasing",
  },
  {
    value: LegalSituation.CreditoPersonaNatural,
    label: "Credito Persona Natural",
  },
  { value: LegalSituation.PatrimonioDeFamilia, label: "Patrimonio de Familia" },
  { value: LegalSituation.Sucesion, label: "Sucesión" },
  { value: LegalSituation.Otra, label: "Otra" },
];

export const PAYMENT_METHOD_OPTIONS = [
  { value: PaymentMethod.Credito, label: "Crédito" },
  { value: PaymentMethod.RecursosPropios, label: "Recursos Propios" },
  { value: PaymentMethod.Permutas, label: "Permutas" },
];

export const PROPERTY_TYPE_OPTIONS = [
  { value: PropertyType.Casa, label: "Casa" },
  { value: PropertyType.Apartamento, label: "Apartamento" },
  { value: PropertyType.ApartamentoDuplex, label: "Apartamento Duplex" },
  { value: PropertyType.CasaCampestre, label: "Casa Campestre" },
  { value: PropertyType.Penthouse, label: "Penthouse" },
  { value: PropertyType.Apartaestudio, label: "Apartaestudio" },
  { value: PropertyType.Lote, label: "Lote" },
  { value: PropertyType.Oficina, label: "Oficina" },
  { value: PropertyType.Local, label: "Local" },
  { value: PropertyType.Bodega, label: "Bodega" },
  { value: PropertyType.ProyectoInmobiliario, label: "Proyecto Inmobiliario" },
];

const livingInfoOwner = [
  "direccion",
  "edadPropiedad",
  "areaConstruida",
  "habitaciones",
  "baños",
  "piso",
  "estudio",
  "deposito",
  "balcon",
  "piscina",
  "tieneParqueadero",
  "tieneTerraza",
  "tienePatio",
  "tieneAdministracion",
  "valorAproximado",
  "situacionJuridica",
];

export const PROPERTY_INFO_OWNER: Record<PropertyType | "default", string[]> = {
  default: [],
  [PropertyType.Casa]: [
    "direccion",
    "edadPropiedad",
    "areaConstruida",
    "numeroPisos",
    "habitaciones",
    "baños",
    "tieneParqueadero",
    "tieneTerraza",
    "tienePatio",
    "estudio",
    "deposito",
    "balcon",
    "piscina",
    "tieneAdministracion",
    "valorAproximado",
    "situacionJuridica",
  ],
  [PropertyType.Apartamento]: livingInfoOwner,
  [PropertyType.ApartamentoDuplex]: livingInfoOwner,
  [PropertyType.Penthouse]: livingInfoOwner,
  [PropertyType.CasaCampestre]: [
    "direccion",
    "edadPropiedad",
    "areaConstruida",
    "habitaciones",
    "baños",
    "estudio",
    "deposito",
    "balcon",
    "piscina",
    "Parqueadero",
    "Terraza",
    "Patio",
    "Administracion",
    "valorAproximado",
    "situacionJuridica",
  ],
  [PropertyType.Apartaestudio]: livingInfoOwner,
  [PropertyType.Lote]: [
    "direccion",
    "area",
    "tieneAdministracion",
    "valorAproximado",
    "situacionJuridica",
  ],
  [PropertyType.Oficina]: [
    "direccion",
    "edadPropiedad",
    "areaConstruida",
    "baños",
    "deposito",
    "balcon",
    "tieneParqueadero",
    "tieneTerraza",
    "tienePatio",
    "tieneAdministracion",
    "valorAproximado",
    "situacionJuridica",
  ],
  [PropertyType.Local]: [
    "direccion",
    "edadPropiedad",
    "baños",
    "parqueaderos",
    "deposito",
    "tieneAdministracion",
    "valorAproximado",
    "situacionJuridica",
  ],
  [PropertyType.Bodega]: [
    "direccion",
    "edadPropiedad",
    "area",
    "tieneAdministracion",
    "valorAproximado",
    "situacionJuridica",
  ],
  [PropertyType.ProyectoInmobiliario]: ["tipoProyecto"],
};

const livingInfoBuyer = [
  "habitaciones",
  "baños",
  "parqueaderos",
  "deposito",
  "formaDePago",
  "presupuesto",
];

const comercialInfoBuyer = ["area", "formaDePago", "presupuesto"];

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
  areaConstruida: {
    id: "areaConstruida",
    type: "number",
    label: "Área Construida (m²)",
  },
  area: { id: "area", type: "number", label: "Área (m²)" },
  terraza: { id: "terraza", type: "number", label: "Terraza (m²)" },
  patio: { id: "patio", type: "number", label: "Patio (m²)" },
  areaParqueadero: {
    id: "areaParqueadero",
    type: "number",
    label: "Área Parqueadero (m²)",
  },
  numeroParqueaderos: {
    id: "numeroParqueaderos",
    type: "number",
    label: "Número de Parqueaderos",
  },
  areaTerraza: {
    id: "areaTerraza",
    type: "number",
    label: "Área Terraza (m²)",
  },
  areaPatio: { id: "areaPatio", type: "number", label: "Área Patio (m²)" },
  numeroPisos: { id: "numeroPisos", type: "number", label: "Número de Pisos" },

  direccion: { id: "direccion", type: "text", label: "Dirección Propiedad" },
  edadPropiedad: {
    id: "edadPropiedad",
    type: "number",
    label: "Edad Propiedad (años)",
  },
  piso: { id: "piso", type: "number", label: "Piso" },

  habitaciones: { id: "habitaciones", type: "number", label: "Habitaciones" },
  baños: { id: "baños", type: "number", label: "Baños" },
  parqueaderos: { id: "parqueaderos", type: "number", label: "Parqueaderos" },

  tieneParqueadero: {
    id: "tieneParqueadero",
    type: "checkbox",
    label: "Parqueadero",
  },
  tieneTerraza: {
    id: "tieneTerraza",
    type: "checkbox",
    label: "Terraza",
  },
  tienePatio: {
    id: "tienePatio",
    type: "checkbox",
    label: "Patio",
  },
  tieneAdministracion: {
    id: "tieneAdministracion",
    type: "checkbox",
    label: "Administración",
  },

  estudio: {
    id: "estudio",
    type: "radio",
    options: booleanOptions,
    label: "Estudio",
  },
  deposito: {
    id: "deposito",
    type: "radio",
    options: booleanOptions,
    label: "Bodega",
  },
  balcon: {
    id: "balcon",
    type: "checkbox",
    label: "Balcón",
  },
  vigilancia: {
    id: "vigilancia",
    type: "radio",
    options: booleanOptions,
    label: "Vigilancia",
  },
  piscina: {
    id: "piscina",
    type: "radio",
    options: booleanOptions,
    label: "Piscina",
  },

  formaDePago: {
    id: "formaDePago",
    type: "radio",
    options: [
      { value: PaymentMethod.Credito, label: "Crédito" },
      { value: PaymentMethod.RecursosPropios, label: "Recursos Propios" },
      { value: PaymentMethod.Permutas, label: "Permutas" },
    ],
    label: "Forma de Pago",
  },
  presupuesto: {
    id: "presupuesto",
    type: "number",
    label: "Presupuesto (COP)",
  },
  valorAdministracion: {
    id: "valorAdministracion",
    type: "number",
    label: "Valor Administración (COP)",
  },
  valorAproximado: {
    id: "valorAproximado",
    type: "number",
    label: "Valor Aproximado Propiedad (COP)",
  },

  situacionJuridica: {
    id: "situacionJuridica",
    type: "select",
    options: [
      {
        value: LegalSituation.ListaParaEscriturar,
        label: "Lista para escriturar",
      },
      {
        value: LegalSituation.CreditoHipotecarioLeasing,
        label: "Credito Hipotecario Leasing",
      },
      {
        value: LegalSituation.CreditoPersonaNatural,
        label: "Credito Persona Natural",
      },
      {
        value: LegalSituation.PatrimonioDeFamilia,
        label: "Patrimonio de Familia",
      },
      { value: LegalSituation.Sucesion, label: "Sucesión" },
      { value: LegalSituation.Otra, label: "Otra" },
    ],
    label: "Situación Jurídica",
  },
  tipoProyecto: {
    id: "tipoProyecto",
    type: "select",
    options: [
      { value: ProjectType.Rural, label: "Rural" },
      { value: ProjectType.Urbano, label: "Urbano" },
      { value: ProjectType.Residencial, label: "Residencial" },
      { value: ProjectType.Comercial, label: "Comercial" },
      { value: ProjectType.Edificio, label: "Edificio" },
      { value: ProjectType.Conjunto, label: "Conjunto" },
    ],
    label: "Tipo de proyecto",
  },

  comentariosAdicionales: {
    id: "comentariosAdicionales",
    type: "text",
    label: "Comentarios Adicionales",
  },
};
