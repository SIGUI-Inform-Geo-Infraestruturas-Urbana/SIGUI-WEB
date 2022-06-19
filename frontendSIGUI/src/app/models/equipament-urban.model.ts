import { Feature } from "ol";
import { Geometry, LineString, MultiPolygon } from "ol/geom";
import { distinct } from "rxjs";
import { DataSpatial } from "./data-spatial";
import { District } from "./district.model";
import { PublicPlace } from "./public-place.model";
import { Street } from "./street.model";

export class EquipmentUrban extends DataSpatial{

   
    private eq_co_cod : number = 0.0;
    private eq_co_equipament : string = '';
    private eq_co_type : string = '';
    private eq_co_departament_admin : string = '';
    private eq_co_name_complete : string = '';
    private eq_co_first_name : string = '';
    private eq_co_name : string = '';
    private eq_co_name_map : string = '';
    private eq_co_street : Street = new Street();
    private eq_co_public_place : PublicPlace = new PublicPlace();
    private eq_co_number_building : string= '';
    private eq_co_district :District = new District();
    private eq_co_observation : string= ''; 
     // eq_co_cod_maintainer= "models.IntegerField(blank=True, null=True) "

    constructor(id : number = 0, geometry : any = 0){
        super(id,'estructure',geometry)
    }
      
    public get id_public_place() : number {
        return this.id;
    }
    public set id_public_place(value : number){
        this.id = value;
    }

    public get co_cod() : number {
        return this.eq_co_cod;
    }
    public set co_cod(value : number){
        this.eq_co_cod = value;
    }

    public get co_equipament() : string {
        return this.eq_co_equipament;
    }
    public set co_equipament(value : string){
        this.eq_co_equipament = value;
    }

    public get departament_admin() : string {
        return this.eq_co_departament_admin;
    }
    public set departament_admin(value : string){
        this.eq_co_departament_admin = value;
    }

    public get number_building() : string {
        return this.eq_co_number_building;
    }
    public set number_building(value : string){
        this.eq_co_number_building = value;
    }

    public get co_type() : string {
        return this.eq_co_type;
    }
    public set co_type(value : string){
        this.eq_co_type = value;
    }


    public get co_first_name() : string {
        return this.eq_co_first_name;
    }
    public set co_first_name(value : string){
        this.eq_co_first_name = value;
    }

    public get name() : string {
        return this.eq_co_name;
    }
    public set name(value : string){
        this.eq_co_name = value;
    }

    public get co_name_map() : string {
        return this.eq_co_name_map;
    }
    public set co_name_map(value : string){
        this.eq_co_name_map = value;
    }

    public get co_street() : Street {
        return this.eq_co_street;
    }

    public set co_street(value : Street){
        this.eq_co_street = value;
    }

    public get co_public_place() : PublicPlace {
        return this.eq_co_public_place;
    }

    public set co_public_place(value : PublicPlace){
        this.eq_co_public_place = value;
    }

    public get co_district () : District {
        return this.eq_co_district;
    }
    public set co_district (value : District)  {
       this.eq_co_district = value;
    }
    public set co_number_building(value : District){
        this.eq_co_district = value;
    }

    public get co_departament_admin() : string {
        return this.eq_co_equipament;
    }
    public set co_departament_admin(value : string){
        this.eq_co_departament_admin = value;
    }

    public get observation() : string {
        return this.eq_co_observation;
    }
    public set observation(value : string){
        this.eq_co_observation = value;
    }


    public get co_name_complete() : string {
        return this.eq_co_name_complete;
    }
    public set co_name_complete(value : string){
        this.eq_co_name_complete = value;
    }

    public get co_geometry() : string | Geometry {
        return this.geometry;
    }
    public set co_geometry(value : string | Geometry){
        this.geometry = value;
    }


    deserialize(inputData : Feature<Geometry>) {   
        let properties = inputData.getProperties();
        this.id = <number>inputData.getId();
        this.eq_co_cod = properties['eq_co_cod'];
        this.eq_co_equipament =properties['eq_co_equipament'];
        this.eq_co_type =properties['eq_co_type'];
        this.eq_co_departament_admin=properties['eq_co_departament_admin'];
        this.eq_co_name_complete =properties['eq_co_name_complete'];
        this.eq_co_first_name =properties['eq_co_first_name'];
        this.eq_co_name =properties['eq_co_name'];
        this.eq_co_name_map =properties['eq_co_name_map'];
        this.eq_co_street = properties['eq_co_street'];
        this.eq_co_public_place = properties['eq_co_public_place'];
        this.eq_co_number_building =properties['eq_co_number_building'];
        this.eq_co_district = properties['eq_co_district'];
        this.eq_co_observation =properties['eq_co_observation'];
        this.geometry = properties['geometry'];  

        return this;
       
    }
    serialize(inputData : Feature<Geometry>, geom : Geometry) {        
        let properties = inputData.getProperties();
        this.id = <number>inputData.getId();
        this.eq_co_cod = properties['eq_co_cod'];
        this.eq_co_equipament =properties['eq_co_equipament'];
        this.eq_co_type =properties['eq_co_type'];
        this.eq_co_departament_admin=properties['eq_co_departament_admin'];
        this.eq_co_name_complete =properties['eq_co_name_complete'];
        this.eq_co_first_name =properties['eq_co_first_name'];
        this.eq_co_name =properties['eq_co_name'];
        this.eq_co_name_map =properties['eq_co_name_map'];
        this.eq_co_street = properties['eq_co_street'];
        this.eq_co_public_place = properties['eq_co_public_place'];
        this.eq_co_number_building =properties['eq_co_number_building'];
        this.eq_co_district = properties['eq_co_district'];
        this.eq_co_observation =properties['eq_co_observation'];
        this.geometry = <MultiPolygon> geom;  
        

        return this;
    }

    operation(): string {
        return 'Result Concrete City'
    }
}