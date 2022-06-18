import { Geometry } from "ol/geom";
import { DataSpatial } from "./data-spatial";
import { Infrastructure } from "./infrastructure.model";
import { Network } from "./network.model";

export class InfrastructureNetwork extends DataSpatial{

    private infra_net_serial_number :number = 0;
    private infra_net_representation : string = '';
    private infra_net_status : string = '';
    private infra_net_infrastructure_in : Infrastructure = new Infrastructure();
    private infra_net_infrastructure_out : Infrastructure = new Infrastructure();
    private infra_net_network : Network = new Network();   

    constructor(id : number = 0, geometry : any = 0){
        super(id,'infraNet',geometry)
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

    public get infrastructure_in () : Infrastructure {
        return this.infra_net_infrastructure_in;
    }
    public set infrastructure_in (value : Infrastructure){
        this.infra_net_infrastructure_in = value;
    }

    public get infrastructure_out () : Infrastructure {
        return this.infra_net_infrastructure_out;
    }
    public set infrastructure_out (value : Infrastructure){
        this.infra_net_infrastructure_out = value;
    }

    public get network () : Network {
        return this.infra_net_network;
    }
    public set network (value : Network){
        this.infra_net_network = value;
    }

    public get infra_geometry() : string | Geometry {
        return this.geometry;
    }
    public set infra_geometry(value : string | Geometry){
        this.geometry = value;
    }


}