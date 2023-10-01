import { BadRequestException,Injectable } from "@nestjs/common";
import { AuthService } from "src/core/domain/services/auth.service";
import * as bcrypt from 'bcrypt'
import { JwtPayload } from "src/infraestructure/adapters/jwt/interfaces/jwt-payload.interface";
import { JwtService } from "@nestjs/jwt";
import { LoginUsuarioDto } from "src/core/shared/dtos";

@Injectable()
export class AuthUseCases{
    constructor(private readonly authService:AuthService,
                private readonly jwtService: JwtService,){}




    async loginUsuario(loginUsuarioDto:LoginUsuarioDto){
        try {
            const {email, password} = loginUsuarioDto;
            const usuario = await this.findOneByTerm(email)
           
            if(!usuario)
                return {
                        error: 404,
                        message:`Credenciales no validas(email)`
                       }
                

            if( !bcrypt.compareSync(password, usuario.password))
                return {
                    error: 404,
                    message:`Credenciales no validas(password)`
                }
            
            

        
            return {
                    ...usuario,
                    token: this.gwtJwtToken({_id:usuario._id})
                    };
        } catch (error) {
            this.handleExceptions(error)
        }
            

      
    }

    

    async checkStatusAuth(usuario:string){
        
        
        try {
            
            const usuarioEncontrado = await this.authService.findOneById(usuario);
            
            
            if(!usuarioEncontrado){
                return {
                    error:400,
                    message:'No se encontro ningun usuario'
                }
            }
            
        
            return {
                ...usuarioEncontrado,
                token: this.gwtJwtToken({_id:usuario})
                };

        } catch (error) {
            this.handleExceptions(error);
        }

        
        
          
    }

    async findOneByTerm(term:string){
        try {
            
            const  usuario= await this.authService.findByEmail(term);

            return usuario;

            
        } catch (error) {
            this.handleExceptions(error)
        }
    }
    private gwtJwtToken(payload: JwtPayload){
        const token = this.jwtService.sign(payload);

        return token;
    }


    private handleExceptions(error:any){
        
        if(error.code==="23505")
        throw new BadRequestException(error.detail)
        
        

        throw new BadRequestException(error.message)
      }
    
    
}