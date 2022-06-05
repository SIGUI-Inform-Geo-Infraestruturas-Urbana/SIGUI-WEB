import {City} from './city.model'

export class District {
    id_district : number = 0;
    nome_district : string = '';
    area_district : number = 0;
    geometry : string = '';
    id_County : City = new City(0); //Feature<Geometry> = new Feature();

    constructor(id : any){
        this.id_district = id;
    }

    deserialize(inputData : any) {
        Object.assign(this,inputData);
        return this;
    }
}