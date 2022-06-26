import { Feature } from "ol";
import { Geometry, LineString, MultiPolygon } from "ol/geom";
import { distinct } from "rxjs";
import { DataSpatial } from "./data-spatial";
import { District } from "./district.model";
import { Street } from "./street.model";

export class PublicPlace extends DataSpatial{  
   
    private pp_cod_sector : number = 0; 
    private pp_cod_block : number = 0; 
    private pp_cod_face : number = 0;
    private pp_total_residences : number = 0;   
    private pp_total_general : number = 0;     
    private pp_district : number|District = new District();
    private pp_streat : number|Street = new Street (); 


    constructor(id : number = 0, geometry : any = 0){
        super(id,'publicplace',geometry)
    }

    public get id_public_place() : number {
        return this.id;
    }
    public set id_public_place(value : number){
        this.id = value;
    }

    public get cod_sector() : number {
        return this.pp_cod_sector;
    }
    public set cod_sector(value : number){
        this.pp_cod_sector = value;
    }

    public get cod_block() : number {
        return this.pp_cod_block;
    }
    public set cod_block(value : number){
        this.pp_cod_block = value;
    }

    public get cod_face() : number {
        return this.pp_cod_face;
    }
    public set cod_face(value : number){
        this.pp_cod_face = value;
    }

    public get total_residences() : number {
        return this.pp_total_residences;
    }
    public set total_residences(value : number){
        this.pp_total_residences = value;
    }

    public get total_general() : number {
        return this.pp_total_general;
    }
    public set total_general(value : number){
        this.pp_total_general = value;
    }

    public get district() : number|District {
        return this.pp_district;
    }
    public set district(value : number|District){
        this.pp_district = value;
    }

    public get streat() : number|Street {
        return this.pp_streat;
    }
    public set streat(value : number|Street){
        this.pp_streat = value;
    }
    public get pp_geometry() : string | Geometry {
        return this.geometry;
    }
    public set pp_geometry(value : string | Geometry){
        this.geometry = value;
    }
      

    deserialize(inputData : Feature<Geometry>) {      
        
        let properties = inputData.getProperties();
        console.log(properties);       
        this.id = <number>inputData.getId();
        this.pp_cod_sector = properties['pp_cod_sector'];
        this.pp_cod_block= properties['pp_cod_block'];      
        this.pp_cod_face = properties['pp_cod_face'];
        this.pp_total_residences  = properties['pp_total_residences'];
        this.pp_district  = properties['pp_total_residences'];
        this.pp_streat  = properties['pp_streat'];
        this.geometry = <LineString> properties['geometry'];
      
        return this;
    }
    serialize(inputData : Feature<Geometry>, geom : Geometry) {        
        let properties = inputData.getProperties()['properties'];
        this.id = <number>inputData.getId();
        if (properties != undefined){
        this.pp_cod_sector = properties['pp_cod_sector'];
        this.pp_cod_block= properties['pp_cod_block'];      
        this.pp_cod_face = properties['pp_cod_face'];
        this.pp_total_residences  = properties['pp_total_residences'];
        this.pp_district  = properties['pp_total_residences'];
        this.pp_streat  = properties['pp_streat'];
        }
        this.geometry =  <MultiPolygon> geom;       

        return this;
    }

    operation(): string {
        return 'Result Concrete City'
    }
}