export const propertyTypeOptions = [
    { value: 'CASA', label: 'Casa' },
    { value: 'APARTAMENTO', label: 'Apartamento' },
    { value: 'CASA CAMPESTRE', label: 'Casa Campestre' },
    { value: 'PENTHOUSE', label: 'Penthouse' },
    { value: 'APARTAESTUDIO', label: 'Apartaestudio' },
    { value: 'LOTE', label: 'Lote' },
    { value: 'OFICINA', label: 'Oficina' },
    { value: 'LOCAL', label: 'Local' },
    { value: 'BODEGA', label: 'Bodega' },
    { value: 'PROYECTO INMOBILIARIO', label: 'Proyecto Inmobiliario' },
];

export const cityOptions = [
    { value: 'Cali', label: 'Cali' },
    { value: 'Medellin', label: 'Medellin' },
    { value: 'Pasto', label: 'Pasto' },
];

export const additionalFields = {
    default: [],
    CASA: ['areaConstruida', 'terraza', 'patio', 'habitaciones', 'baños', 'estudios', 'parqueaderos', 'depósitos', 'balcones', 'pisos', 'valorAdministracion', 'vigilancia', 'piscina', 'valorAproximado', 'situacionJuridica'],
    APARTAMENTO: ['areaConstruida', 'terraza', 'patio', 'habitaciones', 'baños', 'estudios', 'parqueaderos', 'depósitos', 'balcones', 'pisos', 'valorAdministracion', 'vigilancia', 'piscina', 'valorAproximado', 'situacionJuridica'],
    PENTHOUSE: ['areaConstruida', 'terraza', 'patio', 'habitaciones', 'baños', 'estudios', 'parqueaderos', 'depósitos', 'balcones', 'pisos', 'valorAdministracion', 'vigilancia', 'piscina', 'valorAproximado', 'situacionJuridica'],
    CASA_CAMPESTRE: ['areaConstruida', 'terraza', 'patio', 'habitaciones', 'baños', 'estudios', 'parqueaderos', 'depósitos', 'balcones', 'pisos', 'valorAdministracion', 'vigilancia', 'piscina', 'valorAproximado', 'situacionJuridica'],
    APARTAESTUDIO: ['areaConstruida', 'terraza', 'patio', 'habitaciones', 'baños', 'estudios', 'parqueaderos', 'depósitos', 'balcones', 'pisos', 'valorAdministracion', 'vigilancia', 'piscina', 'valorAproximado', 'situacionJuridica'],
    LOTE: ['area', 'situacionJuridica'],
    OFICINA: ['baños', 'parqueaderos', 'depósitos', 'balcones', 'pisos', 'valorAdministracion', 'vigilancia', 'piscina'],
    LOCAL: ['baños', 'parqueaderos', 'depósitos', 'balcones', 'pisos', 'valorAdministracion', 'vigilancia', 'piscina'],
    PROYECTO_INMOBILIARIO: ['tipoProyecto']
};

type InputField = {
    type: "number" | "text" | "select" | "radio";
    label: string;
    options?: { value: any; label: string }[];
};

export const inputFields: Record<string, InputField> = {
    areaConstruida: { type: 'number', label: 'Área construida (m²)' },
    terraza: { type: 'number', label: 'Terraza (m²)' },
    patio: { type: 'number', label: 'Patio (m²)' },
    habitaciones: { type: 'number', label: 'Habitaciones' },
    baños: { type: 'number', label: 'Baños' },
    estudios: { type: 'number', label: 'Estudios' },
    parqueaderos: { type: 'number', label: 'Parqueaderos' },
    depósitos: { type: 'number', label: 'Depósitos' },
    balcones: { type: 'number', label: 'Balcones' },
    pisos: { type: 'number', label: 'Pisos' },
    valorAdministracion: { type: 'number', label: 'Valor administración (COP)' },
    vigilancia: { type: 'radio', options: [{ value: true, label: 'Sí' }, { value: false, label: 'No' }], label: 'Vigilancia' },
    piscina: { type: 'radio', options: [{ value: true, label: 'Sí' }, { value: false, label: 'No' }], label: 'Piscina' },
    valorAproximado: { type: 'number', label: 'Valor aproximado (COP)' },
    area: { type: 'number', label: 'Área (m²)' },
    situacionJuridica: { type: 'select', options: [{ value: 'LISTA PARA ESCRITURAR', label: 'Lista para escriturar' }, { value: 'GRAVAMEN', label: 'Gravamen' }, { value: 'OTRA', label: 'Otra' }], label: 'Situación jurídica' },
    tipoProyecto: { type: 'select', options: [{ value: 'RURAL', label: 'Rural' }, { value: 'URBANO', label: 'Urbano' }, { value: 'RESIDENCIAL', label: 'Residencial' }, { value: 'COMERCIAL', label: 'Comercial' }, { value: 'EDIFICIO', label: 'Edificio' }, { value: 'CONJUNTO', label: 'Conjunto' }], label: 'Tipo de proyecto' }
};
