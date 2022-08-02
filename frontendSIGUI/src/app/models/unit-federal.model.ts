import { Feature } from "ol";
import { Geometry, MultiPolygon } from "ol/geom";
import { DataSpatial } from "./data-spatial";

export class UnitFederal extends DataSpatial{

    private uf_name : string = ''; 
    private uf_initials : string = '';
    private uf_name_region : string = '';
    private uf_area_state  : number = 0;   
    private uf_geocode : string = '';
   // private uf_geometry : string | Geometry  = '';

    constructor(id : number = 0, geometry : any = 0){
        super(id,'layer_vector_unit',geometry)
    }

    public get id_unit_federal() : number {
        return this.id;
    }
    public set id_unit_federal(value : number){
        this.id = value;
    }

    public get name() : string {
        return this.uf_name;
    }
    public set name(value : string){
        this.uf_name = value;
    }

    public get initials() : string {
        return this.uf_initials;
    }
    public set initials(value : string){
        this.uf_initials = value;
    }
    public get geocode() : string {
        return this.uf_geocode;
    }
    public set geocode(value : string){
        this.uf_geocode = value;
    }

    public get name_region() : string {
        return this.uf_name_region;
    }
    public set name_region(value : string){
        this.uf_name_region = value;
    }

    public get area_state() : number {
        return this.uf_area_state;
    }
    public set area_state(value : number){
        this.uf_area_state = value;
    }

    public get uf_geometry() : string | Geometry {
        return this.geometry;
    }
    public set uf_geometry(value : string | Geometry){
        this.geometry = value;
    }
          

    deserialize(inputData : Feature<Geometry>) {        
        let properties = inputData.getProperties();
        console.log('deserialize');
        console.log(properties);       
        this.id = <number>inputData.getId();
        this.uf_name = properties['uf_name'];
        this.uf_initials= properties['uf_initials'];      
        this.uf_name_region = properties['uf_name_region'];
        this.uf_area_state  = properties['uf_area_state'];
        this.uf_geocode  = properties['uf_geocode'];
        this.geometry = <MultiPolygon> properties['geometry'];
      
        return this;
    }
    serialize(inputData : Feature<Geometry>, geom : Geometry) {        
        let properties = inputData.getProperties()['properties'];
        console.log(properties);       
        this.idMap =  inputData.getId() == undefined ? 0 : <number>inputData.getId();
        
        if (properties != undefined){
        this.id = properties['id'];
        this.uf_name = properties['uf_name'];
        this.uf_initials= properties['uf_initials'];      
        this.uf_name_region = properties['uf_name_region'];
        this.uf_area_state  = properties['uf_area_state'];
        this.uf_geocode  = properties['uf_geocode'];
        }
        this.geometry =  <MultiPolygon> geom;       

        return this;
    }

    operation(): string {
        return 'Result Concrete City'
    }
}