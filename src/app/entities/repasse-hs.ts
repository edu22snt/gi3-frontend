export interface IRepasseHs {
    id: number;
    cliente: string;
    contrato: string;
    venda: string;
    mes: string;
    bem: string;
    parcela: string;
    valorBase: string;
    comissaoGi3: string;
    comissaoVendedor: string;
    pg: string;
}

export class RepasseHs implements IRepasseHs {
    constructor(
        public id: number,
        public cliente: string,
        public contrato: string,
        public venda: string,
        public mes: string,
        public bem: string,
        public parcela: string,
        public valorBase: string,
        public comissaoGi3: string,
        public comissaoVendedor: string,
        public pg: string,
    ) {}
}

export function getRepasseHsIdentier(repasse:IRepasseHs): number | undefined {
    return repasse.id;
}