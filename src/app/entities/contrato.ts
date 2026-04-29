import { ContratoParcela } from "./contrato-parcelas";
import { IVendedor } from "./vendedor";

export interface IContrato {
    id: number;
    numeroContrato: string;
    vendedor: IVendedor;
    tipo: string;
    empresa: string;
    qntParcelas: number;
    valor: number;
    parcelas: ContratoParcela[];
}

export class Contrato implements IContrato {
    constructor(
        public id: number,
        public numeroContrato: string,
        public vendedor: IVendedor,
        public tipo: string,
        public empresa: string,
        public qntParcelas: number,
        public valor: number,
        public parcelas: ContratoParcela[]
    ) {}
}

export function getContratoIdentifier(contrato:IContrato): number | undefined {
    return contrato.id;
}
