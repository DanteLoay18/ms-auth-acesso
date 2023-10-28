import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthUseCases } from './application/services/auth.useCases';
import { LoginUsuarioCommand } from './application/features/login/loginUsuario.command';
import { LoginUsuarioHandler } from './application/features/login/loginUsuario.handler';
import { CheckStatusUsuarioCommand } from './application/features/status/checkStatus.command';
import { CheckStatusUsuarioHandler } from './application/features/status/checkStatus.handler';
import { AuthService } from './domain/services/auth.service';
import { AuthRepository } from './domain/ports/outbound/auth.repository';
import { JwtService } from '@nestjs/jwt';
import { PersistenceModule } from 'src/infraestructure/persistence/persistence.module';
import { AUTH_REPOSITORY, AdaptersModule } from 'src/infraestructure/adapters/adapters.module';

const AUTH_PROVIDERS=[
    AuthUseCases,
    
    LoginUsuarioCommand,
    LoginUsuarioHandler,
    CheckStatusUsuarioCommand,
    CheckStatusUsuarioHandler,
]


const providers = [
    ...AUTH_PROVIDERS,
]



@Module({
    imports:[
        PersistenceModule,
        AdaptersModule,
        CqrsModule
    ],
    providers:[
        ...providers,
        {
            provide:AuthService,
            useFactory:(
                authRepository:AuthRepository
            )=> new AuthService(authRepository),
            inject:[
                AUTH_REPOSITORY
            ]
        },
        {
            provide: AuthUseCases,
            useFactory: (authService: AuthService, jwtService: JwtService) => new AuthUseCases(authService,jwtService),
            inject: [
              AuthService, JwtService
            ] 
        },
        
    ],
    exports:[
        ...providers,
        CqrsModule,
        AdaptersModule
    ]
})
export class CoreModule {}
