import { Role } from "./role";

export interface IUsuario {
    id: number;
    username: string;
    password: string;
    roles: Role;
}

export class Usuario implements IUsuario {
    constructor(
        public id: number,
        public username: string,
        public password: string,
        public roles: Role,
    ) {}
}

export function getUsuarioIdentier(usuario:IUsuario): number | undefined {
    return usuario.id;
}
