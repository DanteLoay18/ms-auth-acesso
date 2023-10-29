

export class CheckStatusUsuarioCommand {
    
    constructor(
                public readonly usuarioDto:string,
                public readonly idSistema:string,
                public readonly idRol:string
                ) { }
    
}