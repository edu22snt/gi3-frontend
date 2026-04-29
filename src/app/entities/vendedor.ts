import { ContratoParcela } from "./contrato-parcelas";

export interface IVendedor {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    status: string;
}

export class Vendedor implements IVendedor {
    constructor(
        public id: number,
        public nome: string,
        public email: string,
        public telefone: string,
        public status: string,
    ) {}
}

export function getVendedorIdentifier(vendedor:IVendedor): number | undefined {
    return vendedor.id;
}
