import {UnitFederal} from './unit-federal.model'
import { Feature } from 'ol';
import { Geometry, MultiPolygon} from 'ol/geom';
import { DataSpatial } from './data-spatial';
import { Injectable } from '@angular/core';


export class County extends DataSpatial{

    //private id : number = 0;   
    private co_name : string = '';
    private co_initials_uf: string = '';
    private co_cod_ibge : string = '';
    private co_name_ugrhi : string = '';
    private co_number_ugrhi : number = 0;
    private co_cod_environmental: number = 0;
    private co_unit_federal : number|UnitFederal = new UnitFederal(0); 
    private co_area_county: number = 0;   
    //private co_geometry : string | Geometry = '';     

    constructor(id : any = 0,name_county: any = '',initials_uf: any = '',cod_ibge: any = 0
        ,cod_environmental: any = 0,name_ugrhi: any = 0,number_ugrhi: any = 0,geometry: any = 0
        ,id_state: any = 0,area_county: any = 0){
        super(id,'layer_vector_county',<Geometry>geometry);
        //this.id = id;
        this.co_name = name_county;
        this.co_initials_uf = initials_uf;      
        this.co_cod_environmental = cod_environmental;
        this.co_name_ugrhi = name_ugrhi;
        this.co_number_ugrhi = number_ugrhi;
        //this.co_geometry = geometry;
        this.co_unit_federal = id_state; //Feature<Geometry> = new Feature();
        this.co_area_county = area_county;
    }

    public get id_county() : number {
        return this.id;
    }
    public set id_county(value : number){
        this.id = value;
    }
    
    public get name() : string {
        return this.co_name;
    }
    public set name(value : string){
        this.co_name = value;
    }
    public get ibge() : string {
        return this.co_cod_ibge;
    }
    public set ibge(value : string){
        this.co_cod_ibge = value;
    }

    public get initials_uf() : string {
        return this.co_initials_uf;
    }
    public set initials_uf(value : string){
        this.co_initials_uf = value;
    }  

    public get name_ugrhi() : string {
        return this.co_name_ugrhi;
    }

    public set name_ugrhi(value : string){
        this.co_name_ugrhi = value;
    }

    public get number_ugrhi() : number {
        return this.co_number_ugrhi;
    }
    public set number_ugrhi(value : number){
        this.co_number_ugrhi = value;
    }

    public get cod_environmental() : number {
        return this.co_cod_environmental;
    }
    public set cod_environmental(value : number){
        this.co_cod_environmental = value;
    }

    public get unit_federal() : number|UnitFederal {
        return this.co_unit_federal;
    }
    public set unit_federal(value : number|UnitFederal){
        this.co_unit_federal = value;
    }

    public get area_county() : number {
        return this.co_area_county;
    }
    public set area_county(value : number){
        this.co_area_county = value;
    }

    public get co_geometry() : string | Geometry {
        return this.geometry;
    }
    public set co_geometry(value : string | Geometry){
        this.geometry = value;
    }

    deserialize(inputData : Feature<Geometry>) {        
        let properties = inputData.getProperties();
        console.log(properties);       
        this.id = <number>inputData.getId();
        this.co_name = properties['co_name'];
        this.co_initials_uf= properties['co_initials_uf'];      
        this.co_cod_environmental = properties['co_cod_environmental'];//co_cod_ibge
        this.co_cod_ibge  = properties['co_cod_ibge'];
        this.co_name_ugrhi  = properties['co_name_ugrhi'];
        this.co_number_ugrhi = properties['numbeco_number_ugrhir_ugrhi'];
        this.co_geometry = <MultiPolygon> properties['geometry'];
        this.co_unit_federal = properties['co_unit_federal']; //Feature<Geometry> = new Feature();
        this.co_area_county = properties['co_area_county'];

        return this;
    }
    seserialize(inputData : Feature<Geometry>, geom : Geometry) {        
        let properties = inputData.getProperties()['properties'];
        console.log(properties);       
        //this.id = <number>inputData.getId();
        this.idMap =  inputData.getId() == undefined ? 0 : <number>inputData.getId();
        
        if (properties != undefined){
        this.id = properties['id'];
        this.co_name = properties['co_name'];
        this.co_initials_uf= properties['co_initials_uf'];      
        this.co_cod_environmental = properties['co_cod_environmental'];
        this.co_cod_ibge  = properties['co_cod_ibge'];
        this.co_name_ugrhi  = properties['co_name_ugrhi'];
        this.co_number_ugrhi = properties['co_number_ugrhi'];
        this.co_unit_federal = properties['co_unit_federal']; //Feature<Geometry> = new Feature();
        this.co_area_county = properties['co_area_county'];
        }
        this.co_geometry = <MultiPolygon> geom;

        return this;
    }
    operation(): string {
        return 'Result Concrete City'
    }
}



