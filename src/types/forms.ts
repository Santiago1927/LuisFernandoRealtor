export const propertyTypeOptions = [
    { value: 'CASA', label: 'Casa' },
    { value: 'APARTAMENTO', label: 'Apartamento' },
    { value: 'APARTAMENTO_DUPLEX', label: 'Apartamento Duplex' },
    { value: 'CASA_CAMPESTRE', label: 'Casa Campestre' },
    { value: 'PENTHOUSE', label: 'Penthouse' },
    { value: 'APARTAESTUDIO', label: 'Apartaestudio' },
    { value: 'LOTE', label: 'Lote' },
    { value: 'OFICINA', label: 'Oficina' },
    { value: 'LOCAL', label: 'Local' },
    { value: 'BODEGA', label: 'Bodega' },
    { value: 'PROYECTO_INMOBILIARIO', label: 'Proyecto Inmobiliario' },
];

export const cityOptions = [
    { value: 'Bogota', label: 'Bogotá' },
    { value: 'Cali', label: 'Cali' },
    { value: 'Medellin', label: 'Medellin' },
    { value: 'Pasto', label: 'Pasto' },
];

export const additionalFields = {
    default: [],
    CASA: ['dirección', 'edadPropiedad', 'areaConstruida', 'terraza', 'patio', 'habitaciones', 'baños', 'parqueaderos', 'piso', 'estudio', 'deposito', 'balcon', 'vigilancia', 'piscina', 'valorAdministracion', 'valorAproximado', 'situacionJuridica', 'comentariosAdicionales'],
    APARTAMENTO: ['dirección', 'edadPropiedad', 'areaConstruida', 'terraza', 'patio', 'habitaciones', 'baños', 'parqueaderos', 'piso', 'estudio', 'deposito', 'balcon', 'vigilancia', 'piscina', 'valorAdministracion', 'valorAproximado', 'situacionJuridica', 'comentariosAdicionales'],
    APARTAMENTO_DUPLEX: ['dirección', 'edadPropiedad', 'areaConstruida', 'terraza', 'patio', 'habitaciones', 'baños', 'parqueaderos', 'piso', 'estudio', 'deposito', 'balcon', 'vigilancia', 'piscina', 'valorAdministracion', 'valorAproximado', 'situacionJuridica', 'comentariosAdicionales'],
    PENTHOUSE: ['dirección', 'edadPropiedad', 'areaConstruida', 'terraza', 'patio', 'habitaciones', 'baños', 'parqueaderos', 'piso', 'estudio', 'deposito', 'balcon', 'vigilancia', 'piscina', 'valorAdministracion', 'valorAproximado', 'situacionJuridica', 'comentariosAdicionales'],
    CASA_CAMPESTRE: ['dirección', 'edadPropiedad', 'areaConstruida', 'terraza', 'patio', 'habitaciones', 'baños', 'parqueaderos', 'piso', 'estudio', 'deposito', 'balcon', 'vigilancia', 'piscina', 'valorAdministracion', 'valorAproximado', 'situacionJuridica', 'comentariosAdicionales'],
    APARTAESTUDIO: ['dirección', 'edadPropiedad', 'areaConstruida', 'terraza', 'patio', 'habitaciones', 'baños', 'parqueaderos', 'piso', 'estudio', 'deposito', 'balcon', 'vigilancia', 'piscina', 'valorAdministracion', 'valorAproximado', 'situacionJuridica', 'comentariosAdicionales'],
    LOTE: ['dirección', 'area', 'valorAproximado', 'situacionJuridica', 'comentariosAdicionales'],
    OFICINA: ['dirección', 'edadPropiedad', 'baños', 'parqueaderos', 'piso', 'deposito', 'balcon', 'vigilancia', 'valorAdministracion', 'valorAproximado', 'situacionJuridica', 'comentariosAdicionales'],
    LOCAL: ['dirección', 'edadPropiedad', 'baños', 'parqueaderos', 'piso', 'deposito', 'valorAdministracion', 'valorAproximado', 'situacionJuridica', 'comentariosAdicionales'],
    BODEGA: ['dirección', 'edadPropiedad', 'area', 'valorAproximado', 'situacionJuridica', 'comentariosAdicionales'],
    PROYECTO_INMOBILIARIO: ['tipoProyecto', 'comentariosAdicionales']
};

export const additionalFieldsBuyer = {
    default: [],
    CASA: ['habitaciones', 'baños', 'parqueaderos', 'deposito', 'formaDePago', 'presupuesto', 'comentariosAdicionales'],
    APARTAMENTO: ['habitaciones', 'baños', 'parqueaderos', 'deposito', 'formaDePago', 'presupuesto', 'comentariosAdicionales'],
    APARTAMENTO_DUPLEX: ['habitaciones', 'baños', 'parqueaderos', 'deposito', 'formaDePago', 'presupuesto', 'comentariosAdicionales'],
    PENTHOUSE: ['habitaciones', 'baños', 'parqueaderos', 'deposito', 'formaDePago', 'presupuesto', 'comentariosAdicionales'],
    CASA_CAMPESTRE: ['habitaciones', 'baños', 'parqueaderos', 'deposito', 'formaDePago', 'presupuesto', 'comentariosAdicionales'],
    APARTAESTUDIO: ['habitaciones', 'baños', 'parqueaderos', 'deposito', 'formaDePago', 'presupuesto', 'comentariosAdicionales'],
    LOTE: ['area', 'formaDePago', 'presupuesto', 'comentariosAdicionales'],
    OFICINA: ['area', 'formaDePago', 'presupuesto', 'comentariosAdicionales'],
    LOCAL: ['area', 'formaDePago', 'presupuesto', 'comentariosAdicionales'],
    BODEGA: ['area', 'formaDePago', 'presupuesto', 'comentariosAdicionales'],
};

type InputField = {
    type: "number" | "text" | "select" | "radio";
    label: string;
    options?: { value: any; label: string }[];
};

export const inputFields: Record<string, InputField> = {
    areaConstruida: { type: 'number', label: 'Área Construida (m²)' },
    dirección: { type: 'text', label: 'Dirección Propiedad' },
    edadPropiedad: { type: 'number', label: 'Edad Propiedad (años)' },
    terraza: { type: 'number', label: 'Terraza (m²)' },
    patio: { type: 'number', label: 'Patio (m²)' },
    habitaciones: { type: 'number', label: 'Habitaciones' },
    baños: { type: 'number', label: 'Baños' },
    piso: { type: 'number', label: 'Piso' },
    parqueaderos: { type: 'number', label: 'Parqueaderos' },
    estudio: { type: 'radio', options: [{ value: true, label: 'Sí' }, { value: false, label: 'No' }], label: 'Estudio' },
    deposito: { type: 'radio', options: [{ value: true, label: 'Sí' }, { value: false, label: 'No' }], label: 'Deposito' },
    balcon: { type: 'radio', options: [{ value: true, label: 'Sí' }, { value: false, label: 'No' }], label: 'Balcón' },
    vigilancia: { type: 'radio', options: [{ value: true, label: 'Sí' }, { value: false, label: 'No' }], label: 'Vigilancia' },
    piscina: { type: 'radio', options: [{ value: true, label: 'Sí' }, { value: false, label: 'No' }], label: 'Piscina' },
    formaDePago: { type: 'radio', options: [{ value: 'CREDITO', label: 'Crédito' }, { value: 'RECURSOS', label: 'Recursos Propios' }, { value: 'PERMUTAS', label: 'Permutas' }], label: 'Forma de Pago' },
    presupuesto: { type: 'number', label: 'Presupuesto (COP)' },
    valorAdministracion: { type: 'number', label: 'Valor Administración (COP)' },
    valorAproximado: { type: 'number', label: 'Valor Aproximado Propiedad (COP)' },
    area: { type: 'number', label: 'Área (m²)' },
    situacionJuridica: { type: 'select', options: [{ value: 'LISTA_PARA_ESCRITURAR', label: 'Lista para escriturar' }, { value: 'CREDITO_(HIPOTECARIO, LEASING)', label: 'Credito (Hipotecario, Lesing)' }, { value: 'CREDITO_PERSONA_NATURAL', label: 'Credito Persona Natural' }, { value: 'PATRIMONIO_DE_FAMILIA', label: 'Patrimonio de Familia' }, { value: 'SUCESION,', label: 'Sucesión' }, { value: 'OTRA', label: 'Otra' }], label: 'Situación Jurídica' },
    tipoProyecto: { type: 'select', options: [{ value: 'RURAL', label: 'Rural' }, { value: 'URBANO', label: 'Urbano' }, { value: 'RESIDENCIAL', label: 'Residencial' }, { value: 'COMERCIAL', label: 'Comercial' }, { value: 'EDIFICIO', label: 'Edificio' }, { value: 'CONJUNTO', label: 'Conjunto' }], label: 'Tipo de proyecto' },
    comentariosAdicionales: { type: 'text', label: 'Comentarios Adicionales' },
};

type PersonalField = {
    type: "text" | "email" | "tel";
    label: string;
    options?: { value: any; label: string }[];
};

export const personalFields: Record<string, PersonalField> = {
    nombre: { type: 'text', label: 'Nombre' },
    correo: { type: 'email', label: 'Correo Electrónico' },
    telefono: { type: 'tel', label: 'Telefono' },
};

type QuestionField = {
    type: "radio";
    label: string;
    options?: { value: any; label: string }[];
};

export const questions: Record<string, QuestionField> = {
    one: { type: 'radio', label: '¿Deseas vender tu propiedad en menos de tres meses?', options: [{ value: true, label: 'Sí' }, { value: false, label: 'No' }] },
    two: { type: 'radio', label: '¿Estás de acuerdo en vender tu propiedad a un precio competitivo en el mercado?', options: [{ value: true, label: 'Sí' }, { value: false, label: 'No' }] },
};
