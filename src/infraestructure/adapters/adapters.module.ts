import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongoAuthRepository } from './domain/mongo-auth.repository';
import { PersistenceModule } from '../persistence/persistence.module';

export const AUTH_REPOSITORY = 'AUTH_REPOSITORY';

const providers = [
    MongoAuthRepository,
    {
        provide: AUTH_REPOSITORY,
        useExisting: MongoAuthRepository,
    },
   
]


@Module({
    imports:[
        ConfigModule,
        PersistenceModule,
        PassportModule.register({defaultStrategy:'jwt'}),
        JwtModule.registerAsync({
            imports:[ConfigModule],
            inject:[ConfigService],
            useFactory: (configService:ConfigService) => {

                return {
                    secret: configService.get('JWT_SECRET'),
                    signOptions:{
                        expiresIn:'4h'
                    }
                }
            }
        })
    ],
    providers:[
        ...providers
    ],
    exports:[
        ...providers,
        PassportModule,
        JwtModule
    ]
})
export class AdaptersModule {}
