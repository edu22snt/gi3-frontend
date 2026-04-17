export interface IUsuarioRole {
    id: number;
    nome: string;
}

export class UsuarioRole implements IUsuarioRole {
    constructor(
        public id: number,
        public nome: string,
    ) {}
}

export function getUsuarioRoleIdentier(usuarioRole:IUsuarioRole): number | undefined {
    return usuarioRole.id;
}
