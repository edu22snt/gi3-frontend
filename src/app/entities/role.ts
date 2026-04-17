export interface IRole {
    nome: string;
}

export class Role implements IRole {
    constructor(
        public nome: string,
    ) {}
}

export function getRoleIdentier(usuarioRole:IRole): string | undefined {
    return usuarioRole.nome;
}
