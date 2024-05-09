// Enums for standardized values
export enum PropertyType {
    Casa = "CASA",
    Apartamento = "APARTAMENTO",
    ApartamentoDuplex = "APARTAMENTO_DUPLEX",
    CasaCampestre = "CASA_CAMPESTRE",
    Penthouse = "PENTHOUSE",
    Apartaestudio = "APARTAESTUDIO",
    Lote = "LOTE",
    Oficina = "OFICINA",
    Local = "LOCAL",
    Bodega = "BODEGA",
    ProyectoInmobiliario = "PROYECTO_INMOBILIARIO",
}

export enum PaymentMethod {
    Credito = "CREDITO",
    RecursosPropios = "RECURSOS",
    Permutas = "PERMUTAS",
}

export enum LegalSituation {
    ListaParaEscriturar = "LISTA_PARA_ESCRITURAR",
    CreditoHipotecarioLeasing = "CREDITO_HIPOTECARIO_LEASING",
    CreditoPersonaNatural = "CREDITO_PERSONA_NATURAL",
    PatrimonioDeFamilia = "PATRIMONIO_DE_FAMILIA",
    Sucesion = "SUCESION",
    Otra = "OTRA",
}

export enum ProjectType {
    Rural = "RURAL",
    Urbano = "URBANO",
    Residencial = "RESIDENCIAL",
    Comercial = "COMERCIAL",
    Edificio = "EDIFICIO",
    Conjunto = "CONJUNTO",
}

// Interface definitions
export interface Field {
    type: "number" | "text" | "select" | "radio" | "email" | "tel";
    label: string;
    options?: Array<{ value: any; label: string }>;
}