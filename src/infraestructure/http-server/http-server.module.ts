import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { AuthController } from './controllers/auth.controller';

@Module({
    imports:[CoreModule],
    controllers:[
        AuthController
    ]
})
export class HttpServerModule {}
