import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AuthRepository } from "src/core/domain/ports/outbound/auth.repository";
import { Usuario } from "src/infraestructure/persistence/db/entities/usuario.entity";


@Injectable()
export class MongoAuthRepository implements AuthRepository {
    
    constructor(@InjectModel(Usuario.name) private authRepository: Model<Usuario>) { }
    
    
    findOneById(id: string): Promise<Usuario> {
        return this.authRepository.findById(id);
    }

    findOneByEmail(email: string): Promise<Usuario> {
        return this.authRepository.findOne({email});
    }
        
    
    
    
    
    
}