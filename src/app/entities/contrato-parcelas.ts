import { Contrato } from "./contrato";

export interface IContratoParcela {
    id?: number;
    numeroParcela?: string;
    status?: string;
    descontoComissao?: number;
    base?: number;
    comissao?: number;
    liquido?: number;
}

export class ContratoParcela implements IContratoParcela {
    constructor(
        public id?: number,
        public numeroParcela?: string,
        public status?: string,
        public descontoComissao?: number,
        public base?: number,
        public comissao?: number,
        public liquido?: number,
    ) {}
}

export function getContratoParcelaIdentifier(contratoParcela:IContratoParcela): number | undefined {
    return contratoParcela.id;
}
