import { DataSpatial } from "./data-spatial";
import { Subsystem } from "./subsystem.model";

export class Network {
    id : number = 0;
    net_name : string = '';
    net_category : string = ''; 
    net_status : string = '';
    net_subsystems : number | Subsystem = new Subsystem(0);      

    constructor(id : number = 0){
      this.id  = id;
    }

    public get id_network() : number {
        return this.id;
    }
    public set id_network(value : number){
        this.id = value;
    }
    public get name() : string {
        return this.net_name;
    }
    public set name(value : string){
        this.net_name = value;
    }

    public get category() : string {
        return this.net_category;
    }
    public set category(value : string){
        this.net_category = value;
    }
    public get status() : string {
        return this.net_status;
    }
    public set status(value : string){
        this.net_status = value;
    }
    public get subsystems() : number | Subsystem {
        return this.net_subsystems;
    }
    public set subsystems(value : number | Subsystem){
        this.net_subsystems = value;
    }
}