import { Usuario } from "../../entity/usuario.collection";


export interface AuthRepository{
    findOneByEmail(email:string):Promise<Usuario>;
    findOneById(id:string): Promise<Usuario>;
}