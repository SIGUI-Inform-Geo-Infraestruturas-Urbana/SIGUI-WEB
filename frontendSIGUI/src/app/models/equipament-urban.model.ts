import { Feature } from "ol";
import { Geometry, MultiPolygon } from "ol/geom";
import { distinct } from "rxjs";
import { DataSpatial } from "./data-spatial";
import { District } from "./district.model";
import { Street } from "./street.model";

export class EquipmentUrban extends DataSpatial{

   
    eq_co_cod : number = 0.0;
    eq_co_equipament : string = '';
    eq_co_type : string = '';
    eq_co_departament_admin : string = '';
    eq_co_name_complete : string = '';
    eq_co_first_name : string = '';
    eq_co_name : string = '';
    eq_co_name_map : string = '';
    eq_co_street : Street = new Street();
    eq_co_number_building : string= '';
    eq_co_district :District = new District();
    eq_co_observation : string= ''; 
    // eq_co_cod_maintainer= "models.IntegerField(blank=True, null=True) "
   


    constructor(id : number = 0, geometry : any = 0){
        super(id,geometry)
    }
      

    deserialize(inputData : Feature<Geometry>) {        
        // let properties = inputData.getProperties();
        // console.log(properties);       
        // this.id = <number>inputData.getId();
        // this.uf_name = properties['uf_name'];
        // this.uf_initials= properties['uf_initials'];      
        // this.uf_name_region = properties['uf_name_region'];
        // this.uf_area_state  = properties['uf_area_state'];
        // this.geometry = <MultiPolygon> properties['geometry'];
      
        return this;
    }
    serialize(inputData : Feature<Geometry>, geom : Geometry) {        
        // let properties = inputData.getProperties();
        // console.log(properties);       
        // this.id = <number>inputData.getId();
        // this.uf_name = properties['uf_name'];
        // this.uf_initials= properties['uf_initials'];      
        // this.uf_name_region = properties['uf_name_region'];
        // this.uf_area_state  = properties['uf_area_state'];
        // this.geometry =  <MultiPolygon> geom;       

        return this;
    }

    operation(): string {
        return 'Result Concrete City'
    }
}