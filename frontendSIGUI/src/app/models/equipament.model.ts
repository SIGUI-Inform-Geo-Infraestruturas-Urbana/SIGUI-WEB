import { DataSpatial } from "./data-spatial";

export class Equipament extends DataSpatial{
    constructor(id : number = 0, geometry : any = 0){
        super(id,'equipament',geometry)
    }
    
}