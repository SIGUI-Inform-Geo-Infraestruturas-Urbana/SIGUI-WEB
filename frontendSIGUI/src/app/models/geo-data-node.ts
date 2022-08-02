// export interface DataSpatial {      
//     operation():string;
// }
import { Injectable } from "@angular/core";
import { Geometry } from "ol/geom";
import { abstract } from "ol/util";
import { DataSpatial } from "./data-spatial";

export class GeoDataNode {  
    public indice : number = -1;    
    public id : number;
    public idMap !: number;
    public name_element?: string;
    public typeRepresentation ?: string; 
    public dataSpatial ?: null |DataSpatial;
    public dataNodes ?: null | GeoDataNode[];
    

    // public get id_spatial() : number {
    //     return this.id;
    // }
    // public set id_spatial(value : number){
    //     this.id = value;
    // }

    constructor (id : number,type : string,){
        this.id = id;
        this.typeRepresentation = type; 

    }


}
