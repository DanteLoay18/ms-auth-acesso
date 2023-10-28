
import { Controller} from '@nestjs/common';

import { CommandBus } from "@nestjs/cqrs";
import { MessagePattern } from '@nestjs/microservices';
import { LoginUsuarioRequest } from '../model/login-usuario.request';
import { CheckStatusUsuarioCommand, LoginUsuarioCommand } from 'src/core/application/features';

@Controller()
export class AuthController{

    constructor(
        private command: CommandBus
    ) {}
    
    
    @MessagePattern({cmd: 'login_usuario'})
    async loginUsuario(loginUsuarioDto:LoginUsuarioRequest) {

        
        return await this.command.execute(new LoginUsuarioCommand(loginUsuarioDto));
        
    }

    @MessagePattern({cmd: 'checkstatus_usuario'})
    async checkAuthStatus({usuario, idSistema}:any) {

        return await this.command.execute(new CheckStatusUsuarioCommand(usuario,idSistema ));
        
        
    }


  
}