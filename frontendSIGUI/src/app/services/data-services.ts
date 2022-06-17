import { Feature } from "ol";
import { Geometry } from "ol/geom";
import { abstract } from "ol/util";
import { DataSpatial } from "../models/data-spatial";
import { CountyRepositoryService } from "../repositorys/county-repository.service";
import { DataSpatialService } from "./count/data-spatials.service";

export abstract class DataServices {
 // constructor(public dataSpatialService : DataSpatialService) { }
    //abstract findFetch(idParam : number):boolean;
    abstract convertFeature(features :Feature<Geometry>[]):DataSpatial[];
    abstract conversionJson(geojsonObject: string):Feature[];
   // abstract converterFromFeatures(cities:DataSpatial[]): Feature[];
}
