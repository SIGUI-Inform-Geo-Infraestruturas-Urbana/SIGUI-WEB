import { Feature } from "ol";
import { Geometry, LineString, MultiPolygon } from "ol/geom";
import { DataSpatial } from "./data-spatial";
import { District } from "./district.model";

export class Street extends DataSpatial{
    
    private st_cod_key :string = ''; 
    private st_status :string = '';
    private st_name_street :string = '';    
    private st_name_street_pre :string= '';
    private st_type_street :string= '';
    private st_type_legislation :string= '';
    private st_district_e : string= '';
    private st_district_d : string= '';
    private st_zip_code_e:string = '';
    private st_zip_code_d :string= '';
    private st_district : District=  new District(); 

    constructor(id : number = 0, geometry : any = 0){
        super(id, geometry)
    }

    public get id_street() : number {
        return this.id;
    }
    public set id_street(value : number){
        this.id = value;
    }

    public get cod_key() : string {
        return this.st_cod_key;
    }
    public set cod_key(value : string){
        this.st_cod_key = value;
    }

    public get status() : string {
        return this.st_status;
    }
    public set status(value : string){
        this.st_status = value;
    }
    public get name_street() : string {
        return this.st_name_street;
    }
    public set name_street(value : string){
        this.st_name_street = value;
    }

    public get name_street_pre() : string {
        return this.st_name_street_pre;
    }
    public set name_street_pre(value : string){
        this.st_name_street_pre = value;
    }
    public get type_street() : string {
        return this.st_type_street;
    }
    public set type_street(value : string){
        this.st_type_street = value;
    }
    public get type_legislation() : string {
        return this.st_type_legislation;
    }
    public set type_legislation(value : string){
        this.st_type_legislation = value;
    }
    public get district_e() : string {
        return this.st_district_e;
    }
    public set district_e(value : string){
        this.st_district_e = value;
    }
    public get district_d() : string {
        return this.st_district_d;
    }
    public set district_d(value : string){
        this.st_district_d = value;
    }
    public get zip_code_e() : string {
        return this.st_zip_code_e;
    }
    public set zip_code_e(value : string){
        this.st_zip_code_e = value;
    }
    public get zip_code_d() : string {
        return this.st_zip_code_d;
    }
    public set zip_code_d(value : string){
        this.st_zip_code_d = value;
    }    
    public get district() : District {
        return this.st_district;
    }
    public set district(value : District){
        this.st_district = value;
    }
    public get st_geometry() : string | Geometry {
        return this.geometry;
    }
    public set st_geometry(value : string | Geometry){
        this.geometry = value;
    }

    deserialize(inputData : Feature<Geometry>) {        
        let properties = inputData.getProperties();
        console.log(properties);       
        this.id = <number>inputData.getId();
        this.st_cod_key = properties['st_cod_key'];
        this.st_district= properties['st_district'];      
        this.st_district_d = properties['st_district_d'];
        this.st_district_e = properties['st_district_e'];
        this.st_name_street  = properties['st_name_street'];
        this.st_name_street_pre  = properties['st_name_street_pre'];
        this.st_status  = properties['st_status'];
        this.st_type_legislation  = properties['st_type_legislation'];
        this.st_type_street  = properties['st_type_street'];
        this.st_zip_code_d  = properties['st_zip_code_d'];
        this.st_zip_code_e  = properties['st_zip_code_e'];
        this.geometry = <LineString> properties['geometry'];
      
        return this;
    }
    serialize(inputData : Feature<Geometry>, geom : Geometry) {        
        let properties = inputData.getProperties();
        console.log(properties);       
        this.id = <number>inputData.getId();
        this.st_cod_key = properties['st_cod_key'];
        this.st_district= properties['st_district'];      
        this.st_district_d = properties['st_district_d'];
        this.st_district_e = properties['st_district_e'];
        this.st_name_street  = properties['st_name_street'];
        this.st_name_street_pre  = properties['st_name_street_pre'];
        this.st_status  = properties['st_status'];
        this.st_type_legislation  = properties['st_type_legislation'];
        this.st_type_street  = properties['st_type_street'];
        this.st_zip_code_d  = properties['st_zip_code_d'];
        this.st_zip_code_e  = properties['st_zip_code_e'];
        this.geometry =  <LineString> geom;      

        return this;
    }
    
    

}