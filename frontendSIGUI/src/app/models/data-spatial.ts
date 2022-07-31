// export interface DataSpatial {      
//     operation():string;
// }
import { Injectable } from "@angular/core";
import { Geometry } from "ol/geom";
import { abstract } from "ol/util";

export abstract class DataSpatial {      
    public id : number;
    public idMap !: number;
    public typeRepresentation : string; 
    public geometry : string | Geometry;

    // public get id_spatial() : number {
    //     return this.id;
    // }
    // public set id_spatial(value : number){
    //     this.id = value;
    // }

    constructor (id : number,type : string, geometry : string | Geometry){
        this.id = id;
        this.typeRepresentation = type; 
        this.geometry = geometry;
    }

    //operation():string;
}
