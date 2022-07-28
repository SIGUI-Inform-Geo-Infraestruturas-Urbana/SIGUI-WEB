import { Feature } from 'ol';
import { Geometry, MultiPolygon } from 'ol/geom';
import {County} from './county.model'
import { DataSpatial } from './data-spatial';

export class FileData {
    
    public category : string = '';
    public file_dbf : File | string = '';
    public file_prj : File | string = '';
    public file_qpj : File | string = '';
    public file_cpg : File | string = '';
    public file_shp : File | string = '';
    public file_shx : File | string = '';
    public file_sbn : File | string = '';
    public file_sbx : File | string = '';
    //public file_shx : File | null = null;


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