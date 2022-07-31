import { Feature } from 'ol';
import { Geometry, MultiPolygon } from 'ol/geom';
import {County} from './county.model'
import { DataSpatial } from './data-spatial';

export class District extends DataSpatial{
    // private id : number = 0;
    private dc_name : string = '';
    private dc_area : number = 0;
    // private geometry : string | Geometry  = '';
    private dc_county : number|County = new County(0); //Feature<Geometry> = new Feature();

    constructor(id : any = 0,geometry: any = 0){
        super(id,'district',<Geometry>geometry);
    }

    public get id_district() : number {
        return this.id;
    }
    public set id_district(value : number){
        this.id = value;
    }

    public get name() : string {
        return this.dc_name;
    }
    public set name(value : string){
        this.dc_name = value;
    }

    public get area() : number {
        return this.dc_area;
    }
    public set area(value : number){
        this.dc_area = value;
    }

    public get county() : number|County {
        return this.dc_county;
    }
    public set county(value : number|County){
        this.dc_county = value;
    }

    public get dc_geometry() : string | Geometry {
        return this.geometry;
    }
    public set dc_geometry(value : string | Geometry){
        this.geometry = value;
    }

    deserialize(inputData : Feature<Geometry>) {        
        let properties = inputData.getProperties();
        console.log(properties);       
        this.id = <number>inputData.getId();
        this.dc_name = properties['dc_name'];
        this.dc_area= properties['dc_area'];      
        this.dc_county = properties['dc_county']; 
        this.geometry = <MultiPolygon> properties['geometry'];
      
        return this;
    }
    serialize(inputData : Feature<Geometry>, geom : Geometry) {        
        let properties = inputData.getProperties()['properties'];
        this.idMap =  inputData.getId() == undefined ? 0 : <number>inputData.getId();
        
        if (properties != undefined){
        this.id = properties['id'];  
   
        this.dc_name = properties['dc_name'];
        this.dc_area= properties['dc_area'];      
        this.dc_county = properties['dc_county'];
        }   
        this.geometry =  <MultiPolygon> geom;

        return this;
    }

    operation(): string {
        return 'Result Concrete City'
    }
}