
import { AuthRepository } from "../ports/outbound/auth.repository";


export class AuthService{
    constructor(private readonly authRepository:AuthRepository){}

    

    findByEmail(email:string){
        return this.authRepository.findOneByEmail(email);
    }

     findOneById(id:string){
        return this.authRepository.findOneById(id);
     }
}