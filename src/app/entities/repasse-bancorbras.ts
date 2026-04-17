export interface IRepasseBancorbras {
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
    descontoComissao: string;
    comissaoLiquida: string;
    pg: string;
}

export class RepasseBancorbras implements IRepasseBancorbras {
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
        public descontoComissao: string,
        public comissaoLiquida: string,
        public pg: string,
    ) {}
}

export function getRepasseBancorbrasIdentier(repasse:IRepasseBancorbras): number | undefined {
    return repasse.id;
}