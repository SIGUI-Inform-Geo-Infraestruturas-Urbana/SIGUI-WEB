import { Feature } from "ol";
import { Geometry, Point } from "ol/geom";
import { DataSpatial } from "./data-spatial";
import { Infrastructure } from "./infrastructure.model";
import { Network } from "./network.model";

export class InfrastructureNetwork extends DataSpatial{

    private infra_net_serial_number :number = 0;
    private infra_net_representation : string = '';
    private infra_net_status : string = '';
    private infra_net_infrastructure_in : number|Infrastructure = new Infrastructure();
    private infra_net_infrastructure_out : number|Infrastructure = new Infrastructure();
    private infra_net_network : number|Network = new Network();   

    constructor(id : number = 0, geometry : any = 0){
        super(id,'layer_vector_rede',geometry)
    }

    public get id_network() : number {
        return this.id;
    }
    public set id_network(value : number){
        this.id = value;
    }

    public get serial_number () : number {
        return this.infra_net_serial_number;
    }
    public set serial_number (value : number){
        this.infra_net_serial_number = value;
    }

    public get representation () : string {
        return this.infra_net_representation;
    }
    public set representation (value : string){
        this.infra_net_representation = value;
    }

    public get status () : string {
        return this.infra_net_status;
    }
    public set status (value : string){
        this.infra_net_status = value;
    }

    public get infrastructure_in () : number|Infrastructure {
        return this.infra_net_infrastructure_in;
    }
    public set infrastructure_in (value : number|Infrastructure){
        this.infra_net_infrastructure_in = value;
    }

    public get infrastructure_out () : number|Infrastructure {
        return this.infra_net_infrastructure_out;
    }
    public set infrastructure_out (value : number|Infrastructure){
        this.infra_net_infrastructure_out = value;
    }

    public get network () : number|Network {
        return this.infra_net_network;
    }
    public set network (value : number|Network){
        this.infra_net_network = value;
    }

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
        this.infra_net_serial_number = properties['infra_net_serial_number'];
        this.infra_net_representation= properties['infra_net_representation'];      
        this.infra_net_infrastructure_in = properties['infra_net_infrastructure_in'];
        this.infra_net_infrastructure_out = properties['infra_net_infrastructure_out'];       
        this.infra_net_network = properties['infra_net_network'];
        this.geometry = <Point> properties['geometry'];
      
        return this;
    }
    serialize(inputData : Feature<Geometry>, geom : Geometry) {        
        let properties = inputData.getProperties()['properties'];
        this.idMap =  inputData.getId() == undefined ? 0 : <number>inputData.getId();
        
        if (properties != undefined){
            this.id = properties['id'];
            this.infra_net_serial_number = properties['infra_net_serial_number'];
            this.infra_net_representation= properties['infra_net_representation'];      
            this.infra_net_infrastructure_in = properties['infra_net_infrastructure_in'];
            this.infra_net_infrastructure_out = properties['infra_net_infrastructure_out'];       
            this.infra_net_network = properties['infra_net_network']; 
        }  
        this.geometry =  <Point> geom;             
       // console.log(this.infra_name);      
        return this;
    }


}