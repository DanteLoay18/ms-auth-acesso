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
                    success:false,
                    message:"Credenciales no validas",
                    value: {}
                }
                
            
             
            if(usuario?.esEliminado){
                return {
                    success:false,
                    message:"Credenciales no validas",
                    value: {}
                }
            }
            

            
            if( !bcrypt.compareSync(password, usuario.password))
                return {
                    success:false,
                    message:"Credenciales no validas",
                    value: {}
                }
            
            
            return {
                    success:true,
                    message:"",
                    value:{
                        token: this.gwtJwtToken({_id:usuario._id, esEliminado:usuario.esEliminado})
                    }
            };
        } catch (error) {
            this.handleExceptions(error)
        }
            

      
    }

    

    async checkStatusAuth(idUsuario:string, idSistema:string, idRol:string){
        
        
        try {
            
            const usuarioEncontrado = await this.authService.findOneById(idUsuario);
            
            
            if(!usuarioEncontrado){
                return {
                    success:false,
                    message:'No se encontro ningun usuario',
                    value: {}
                }
            }

            if(usuarioEncontrado.esEliminado){
                return {
                    success:false,
                    message:'El usuario no existe',
                    value: {}
                }
            }
            
            if(idSistema!==undefined && idRol !==undefined){
                return {
                    success:true,
                    message:'',
                    value: {
                        token: this.gwtJwtToken({_id:idUsuario, esEliminado:usuarioEncontrado.esEliminado, idSistema, idRol})
                    }
                };
            }

            return {
                    success:true,
                    message:'',
                    value: {
                        token: this.gwtJwtToken({_id:idUsuario, esEliminado:usuarioEncontrado.esEliminado})
                    }
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