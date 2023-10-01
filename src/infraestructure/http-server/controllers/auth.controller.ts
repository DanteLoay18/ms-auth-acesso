
import { Controller} from '@nestjs/common';

import { CommandBus } from "@nestjs/cqrs";
import { MessagePattern } from '@nestjs/microservices';
import {stringify} from 'uuid'
import { LoginUsuarioRequest } from '../model/login-usuario.request';
import { CheckStatusUsuarioCommand, LoginUsuarioCommand } from 'src/core/application/features';

@Controller()
export class AuthController{

    constructor(
        private command: CommandBus
    ) {}
    
    
    @MessagePattern({cmd: 'login_usuario'})
    async loginUsuario(loginUsuarioDto:LoginUsuarioRequest) {

        
        const {token,_doc, error, message}=await this.command.execute(new LoginUsuarioCommand(loginUsuarioDto));
        if(error)
            return {
                error,
                message
            }
 
            
        delete _doc.password;
        _doc._id=stringify(_doc._id);
        
        return {
            token,
            ..._doc
        };
    }

    @MessagePattern({cmd: 'checkstatus_usuario'})
    async checkAuthStatus({usuario}:any) {

        
        const {token,_doc, error, message} = await this.command.execute(new CheckStatusUsuarioCommand(usuario));
        
        if(error)
        return {
            error,
            message
        }
    

        
        delete _doc.password;
        _doc._id=stringify(_doc._id);
        return {
            token,
            ..._doc
        };
    }

  
}