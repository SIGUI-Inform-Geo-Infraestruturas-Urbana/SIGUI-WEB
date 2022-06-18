import { County } from "./county.model";
import { DataSpatial } from "./data-spatial";
import { Provider } from "./provider.model";

export class Subsystem{
    
    id : number = 0;
    ss_name : string = '';
    ss_description : string= ''
    ss_category : string = '';   
    co_provider : Provider= new Provider();
    
    constructor(id : number = 0, geometry : any = 0){
       
    }

    
}