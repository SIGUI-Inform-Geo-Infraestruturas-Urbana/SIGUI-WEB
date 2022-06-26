import { Feature } from "ol";
import { Geometry, LineString, MultiPolygon, Point } from "ol/geom";
import { DataSpatial } from "./data-spatial";
import { District } from "./district.model";
import { Equipament } from "./equipament.model";
// import { InfrastructureNetwork } from "./Infrastructure-network.model";
import { Network } from "./network.model";
import { Street } from "./street.model";
import { Subsystem } from "./subsystem.model";

export class Infrastructure extends DataSpatial{    
   
    private infra_name : string = '';   
    private infra_category : string = '';
    private infra_dependent : number|Infrastructure | null = null;
    private infra_subsystems : number|Subsystem = new Subsystem();
    private infra_street : number|Street | null = new Street();
   // private infra_equipaments : Equipament = new Equipament();
    // private infra_network : InfrastructureNetwork = new InfrastructureNetwork();   

    constructor(id : number = 0, geometry : any = 0){
        super(id,'infrastructure', geometry)
    }

    public get id_infra() : number {
        return this.id;
    }
    public set id_infra(value : number){
        this.id = value;
    }

    public get name() : string {
        return this.infra_name;
    }
    public set name(value : string){
        this.infra_name = value;
    }

    public get category() : string {
        return this.infra_category;
    }
    public set category(value : string){
        this.infra_category = value;
    }

    public get dependent() : number|Infrastructure | null{
        return this.infra_dependent;
    }
    public set dependent(value :number| Infrastructure| null){
        this.infra_dependent = value;
    }
    public get subsystems() : number|Subsystem {
        return this.infra_subsystems;
    }
    public set subsystems(value : number|Subsystem){
        this.infra_subsystems = value;
    }
    public get street() : number|Street | null  {
        return this.infra_street;
    }
    public set street(value : number|Street | null ){
        this.infra_street = value;
    }

    // public get equipaments() : Equipament {
    //     return this.infra_equipaments;
    // }
    // public set equipaments(value : Equipament){
    //     this.infra_equipaments = value;
    // }
    // public get network() : InfrastructureNetwork {
    //     return this.infra_network;
    // }
    // public set network(value : InfrastructureNetwork){
    //     this.infra_network = value;
    // }
   
    public get infra_geometry() : string | Geometry {
        return this.geometry;
    }
    public set infra_geometry(value : string | Geometry){
        this.geometry = value;
    }

    deserialize(inputData : Feature<Geometry>) {        
        let properties = inputData.getProperties();
        console.log(properties);       
        this.id = <number>inputData.getId();
        this.infra_name = properties['infra_name'];
        this.infra_category= properties['infra_category'];   
        this.infra_street= properties['infra_street'];      
        this.infra_dependent = properties['infra_dependent'];
        this.infra_subsystems = properties['infra_subsystems'];       
        this.geometry = <Point> properties['geometry'];
      
        return this;
    }
    serialize(inputData : Feature<Geometry>, geom : Geometry) {        
        let properties = inputData.getProperties()['properties'];
        console.log('????????????????????')
        console.log(properties);  
        //let a =properties['properties'] 
        //console.log(properties['infra_name']);  
        console.log('????????????????????')   
        this.id = <number>inputData.getId();  
        if (properties != undefined){
        this.id = properties['id'];
        this.infra_name = properties['infra_name'];
        this.infra_street= properties['infra_street'];
        this.infra_category= properties['infra_category'];      
        this.infra_dependent = properties['infra_dependent'];
        this.infra_subsystems = properties['infra_subsystems']; 
        }  
        this.geometry =  <Point> geom;             
        console.log(this.infra_name);      
        return this;
    }
    
    

}