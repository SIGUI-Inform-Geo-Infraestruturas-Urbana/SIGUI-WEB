// export interface DataSpatial {      
//     operation():string;
// }
import { Injectable } from "@angular/core";
import { Geometry } from "ol/geom";
import { abstract } from "ol/util";

export abstract class DataSpatial {      
    public id : number;
    public geometry : string | Geometry;

    // public get id_spatial() : number {
    //     return this.id;
    // }
    // public set id_spatial(value : number){
    //     this.id = value;
    // }

    constructor (id : number,geometry : string | Geometry){
        this.id = id;
        this.geometry = geometry;
    }

    //operation():string;
}
