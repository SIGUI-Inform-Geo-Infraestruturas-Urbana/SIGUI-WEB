import { Feature } from 'ol';
import { Geometry, MultiPolygon } from 'ol/geom';
import {County} from './county.model'
import { DataSpatial } from './data-spatial';

export class FileData {
    
    public category : string = '';
    public file_dbf : File | null = null;
    public file_prj : File | null = null;
    public file_qpj : File | null = null;
    public file_cpg : File | null = null;
    public file_shp : File | null = null;
    public file_shx : File | null = null;


    constructor(id : string){
       this.category = id;
    }   

    deserialize(category : Feature<Geometry>) {        
         
        return this;
    }
    serialize(inputData : Feature<Geometry>, geom : Geometry) {      
       

        return this;
    }

    operation(): string {
        return 'Result Concrete City'
    }
}