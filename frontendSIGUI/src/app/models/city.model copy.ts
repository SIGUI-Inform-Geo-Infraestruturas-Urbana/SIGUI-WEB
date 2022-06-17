import {UnitFederal} from './unit-federal.model'
import { Feature } from 'ol';
import { Geometry, MultiPolygon} from 'ol/geom';
import { DataSpatial } from './data-spatial';

export class City implements DataSpatial{
    id : number = 0;
    name_county : string = '';
    initials_uf : string = '';
    cod_ibge : number = 0;
    cod_environmental : number = 0;
    name_ugrhi: string = '';
    number_ugrhi : number = 0;
    geometry : string | Geometry = '';
    id_state : UnitFederal = new UnitFederal(0); //Feature<Geometry> = new Feature();
    area_county: number = 0;

    constructor(id : any = 0,name_county: any = '',initials_uf: any = '',cod_ibge: any = 0
        ,cod_environmental: any = 0,name_ugrhi: any = 0,number_ugrhi: any = 0,geometry: any = 0
        ,id_state: any = 0,area_county: any = 0){
        this.id = id;
        this.name_county = name_county;
        this.initials_uf = initials_uf;
        this.cod_ibge =cod_ibge ;
        this.cod_environmental = cod_environmental;
        this.name_ugrhi = name_ugrhi;
        this.number_ugrhi = number_ugrhi;
        this.geometry = geometry;
        this.id_state = id_state; //Feature<Geometry> = new Feature();
        this.area_county = area_county;
    }

    deserialize(inputData : Feature<Geometry>) {        
        let properties = inputData.getProperties();
        console.log(properties);       
        this.id = <number>inputData.getId();
        this.name_county = properties['name_county'];;
        this.initials_uf = properties['initials_uf'];;
        this.cod_ibge =properties['cod_ibge']; ;
        this.cod_environmental = properties['cod_environmental'];;
        this.name_ugrhi = properties['name_ugrhi'];;
        this.number_ugrhi = properties['number_ugrhi'];;
        this.geometry = <MultiPolygon> properties['geometry'];
        this.id_state = properties['id_state']; //Feature<Geometry> = new Feature();
        this.area_county = properties['area_county'];

        return this;
    }
    seserialize(inputData : Feature<Geometry>, geom : Geometry) {        
        let properties = inputData.getProperties();
        console.log(properties);       
        this.id = <number>inputData.getId();
        this.name_county = properties['name_county'];;
        this.initials_uf = properties['initials_uf'];;
        this.cod_ibge =properties['cod_ibge']; ;
        this.cod_environmental = properties['cod_environmental'];;
        this.name_ugrhi = properties['name_ugrhi'];;
        this.number_ugrhi = properties['number_ugrhi'];;
        this.geometry = <MultiPolygon> geom;
        this.id_state = properties['id_state']; //Feature<Geometry> = new Feature();
        this.area_county = properties['area_county'];

        return this;
    }
    operation(): string {
        return 'Result Concrete City'
    }
}


