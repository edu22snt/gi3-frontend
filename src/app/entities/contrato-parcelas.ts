import { Contrato } from "./contrato";

export interface IContratoParcela {
    id?: number;
    numeroParcela?: string;
    status?: string;
    numeroContrato?: string;
}

export class ContratoParcela implements IContratoParcela {
    constructor(
        public id?: number,
        public numeroParcela?: string,
        public status?: string,
        public numeroContrato?: string,
    ) {}
}

export function getContratoParcelaIdentifier(contratoParcela:IContratoParcela): number | undefined {
    return contratoParcela.id;
}
