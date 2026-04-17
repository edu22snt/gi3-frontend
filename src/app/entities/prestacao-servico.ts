export interface IPrestacaoServico {
    id: number;
    vendedor: string;
    contrato: string;
    parcela: string;
    valor: string;
    empresa: string;
}

export class PrestacaoServico implements IPrestacaoServico {
    constructor(
        public id: number,
        public vendedor: string,
        public contrato: string,
        public parcela: string,
        public valor: string,
        public empresa: string
    ) {}
}

export function getPrestacaoServicoIdentier(prestacao:IPrestacaoServico): number | undefined {
    return prestacao.id;
}
