import { Base } from "src/core/shared/domain/base";


export class Usuario extends Base{


    nombres:     string;
    email:   string;
    password:   string;
    primerApellido:  string;
    segundoApellido:  string;
    defaultPassword: string;
    isDefaultPassword:boolean;
    avatarText:string;

  

}