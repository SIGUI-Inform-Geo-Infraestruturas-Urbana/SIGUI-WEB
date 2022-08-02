import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber, throwError } from 'rxjs';
import {map} from 'rxjs/operators';
import { CountyRepositoryService } from '../../repositorys/county-repository.service'
import { County} from '../../models/county.model'
import GeoJSON from 'ol/format/GeoJSON';
import { Feature } from 'ol';
import { Geometry, MultiPolygon } from 'ol/geom';
import { CreatorSpatials } from 'src/app/models/creator-spatials';
import { DataSpatial } from 'src/app/models/data-spatial';
import { GeoDataLayerNode } from 'src/app/models/geo-data-layer-node.model';
import { GeoDataNode } from 'src/app/models/geo-data-node';

@Injectable({
  providedIn: 'root'
})

export class DataSpatialService {

  /* 
   optionsDraws = [
    {id: 1, name:'layer_vectorIteration'},
    {id: 2, name:'layer_vector_unit'},
    {id: 3, name:'layer_vector_county'},
    {id: 4, name:'layer_vector_district'},
    {id: 5, name:'layer_vector_street'},
    {id: 6, name:'layer_vector_rede'},
    {id: 7, name:'layer_vector_infrastructure'},
    {id: 8, name:'layer_vector_equipament'},  //layer_vectorIteration
layer_vector_publicplace
  ]; */

  TREE_DATA : GeoDataNode[] = [
    {
      id: 1,
      idMap : 0,
      indice : 0,
      name_element :  "CAMADA DE ITERAÇOES",
      typeRepresentation : 'layer_vectorIteration',
      dataSpatial : null,   
      dataNodes : null,      
    },
    {
      id: 1,
      idMap : 0,
      indice : 1,
      name_element :  "CAMADA DE UNIDADES FEDERATIVAS",
      typeRepresentation : 'layer_vector_unit',
      dataSpatial : null,   
      dataNodes : null,     
    },
    {
      id: 1,
      idMap : 0,
      indice : 2,
      name_element :  "CAMADA DE MUNICIPIOS",
      typeRepresentation : 'layer_vector_county',
      dataSpatial : null,   
      dataNodes : null,   
    },
    {
      id: 1,
      idMap : 0,
      indice : 2,
      name_element :  "CAMADA DE DISTRITOS",
      typeRepresentation : 'layer_vector_district',
      dataSpatial : null,   
      dataNodes : null,       
    },
    {
      id: 1,
      idMap : 0,
      indice : 3,
      name_element :  "CAMADA DE RUAS",
      typeRepresentation : 'layer_vector_street',
      dataSpatial : null,   
      dataNodes : null,   
    },
    {
      id: 1,
      idMap : 0,
      indice : 4,
      name_element :  "CAMADA DE LOGRADOURO",
      typeRepresentation : 'layer_vector_publicplace',
      dataSpatial : null,   
      dataNodes : null,   
    },
    {
      id: 1,
      idMap : 0,
      indice : 5,
      name_element :  "CAMADA DE INFRAESTRUTURAS",
      typeRepresentation : 'layer_vector_infrastructure',
      dataSpatial : null,   
      dataNodes : null,   
    },
    {
      id: 1,
      idMap : 0,
      indice : 6,
      name_element :  "CAMADA DE EQUIPAMENTOS",
      typeRepresentation : 'layer_vector_equipament',
      dataSpatial : null,   
      dataNodes : null,       
    },
    {
      id: 1,
      idMap : 0,
      indice : 7,
      name_element :  "CAMADA DE REDES",
      typeRepresentation : 'layer_vector_rede',
      dataSpatial : null,   
      dataNodes : null,     
    },
  ] 

  private contadorIdMap : number = 0;
  dataChange = new BehaviorSubject<GeoDataNode[]>(this.TREE_DATA);

  private readonly _spatials = new BehaviorSubject<DataSpatial[]>([]);
  readonly spatials$: Observable<DataSpatial[]> = this._spatials.asObservable();
    
  constructor() { }

  generateContador():number{
    this.contadorIdMap = this.contadorIdMap + 1;
    return this.contadorIdMap;
  }

  insertTree(indice : number , valuesData : DataSpatial[])
  {
    let elem : GeoDataNode = <GeoDataNode> this.TREE_DATA.find( x => x.typeRepresentation = valuesData[0].typeRepresentation);

    //let geom = feature.getGeometry()?.getType();
    valuesData.forEach(element => {
      let treeItem = this.TREE_DATA[elem.indice]
      if (treeItem.dataNodes == null)
      {
        treeItem.dataNodes = [
          {
            id : element.id,
            idMap : element.idMap,
            indice : 0,
            typeRepresentation : element.typeRepresentation,
            name_element : `${element.typeRepresentation}-${element.id}`  
          }
        ];
        this.TREE_DATA[elem.indice] = treeItem;
      }
      else{
        let value ={
          id : element.id,
          idMap : element.idMap,
          indice : 0,
          typeRepresentation : element.typeRepresentation,
          name_element : `${element.typeRepresentation}-${element.id}`
        }
        treeItem.dataNodes.push(value);
        this.TREE_DATA[elem.indice] = treeItem;
      }
      this.dataChange.next(this.TREE_DATA);    
    });

   
  }


  insertData(valuesData : DataSpatial[]){

    for (let index = 0; index < valuesData.length; index++) {
      const element = valuesData[index];
      element.idMap = this.generateContador();
      valuesData[index] = element;         
    } 
    this._spatials.next(valuesData);   
    this.insertTree(2,valuesData);  
  } 

  definedGeomIteration(feature : Feature):Feature{
    let geom = feature.getGeometry()?.getType();
    feature.setId(this.generateContador());
    let treeItem = this.TREE_DATA[0]
    if (treeItem.dataNodes == null)
    {
      treeItem.dataNodes = [
        {
          id : 0,
          idMap :<number> feature.getId(),
          indice : 0,
          typeRepresentation : 'layer_vectorIteration',
          name_element : `${geom}-${<number> feature.getId()}`
        }
      ];
      this.TREE_DATA[0] = treeItem;
    }
    else{
      let value ={
        id : 0,
        idMap :<number> feature.getId(),
        indice : 0,
        typeRepresentation : 'layer_vectorIteration',
        name_element : `${geom}-${<number> feature.getId()}`
      }
      treeItem.dataNodes.push(value);
      this.TREE_DATA[0] = treeItem;
    }
    this.dataChange.next(this.TREE_DATA);  
    return feature
  }

  get data(): GeoDataNode[] {
    return this.dataChange.value;
  }

  insertItem(parent: GeoDataNode[]) {
      this.dataChange.next(parent);    
  }

  updateItem(node: GeoDataNode[]) {   
    this.dataChange.next(node);
  }

  getDataSpatial():Observable<DataSpatial[]>{//City[]//Feature<Geometry>
    return this.spatials$;//this._counties.getValue();
  } 

  setDataSpatial(value : DataSpatial[]){//DataSpatial[]
    this._spatials.next(value);
  }

  public converterFromFeatures(cities:DataSpatial[]): Feature[]{
    let features: Feature[] = [] 
    for (let index = 0; index < cities.length; index++) {
      const element = cities[index];
      let featureNew = new Feature({
        id: element.id,
        properties : element,
        geometry : <Geometry>element.geometry
      })
      features.push(featureNew);
    };
    return features;
  }

   // TREE_DATA: GeoDataLayerNode[] = [
  //   {
  //     id_category: 1,
  //     name_element: "CAMADA DE ITERAÇOES",
  //     sub_brand: [{id_category: 1, name_element: "layer_vectorIteration", category: "layer_vectorIteration"}]
  //   },
  //   {
  //     id_category: 2,
  //     name_element: "CAMADA DE UNIDADES FEDERATIVAS",
  //     sub_brand: [{id_category: 1, name_element: "layer_vector_unit", category: "layer_vector_unit"}]
  //   },
  //   {
  //     id_category: 3,
  //     name_element: "CAMADA DE MUNICIPIOS",
  //     sub_brand: [{id_category: 1, name_element: "layer_vector_county", category: "layer_vector_county"}]
  //   },
  //   {
  //     id_category: 4,
  //     name_element: "CAMADA DE DISTRITOS",
  //     sub_brand: [{id_category: 1, name_element: "layer_vector_district", category: "layer_vector_district"}]
  //   },
  
  //   {
  //     id_category: 5,
  //     name_element: "CAMADA DE RUAS",
  //     sub_brand: [{id_category: 1, name_element: "layer_vector_street", category: "layer_vector_street"}]
  //   },
  //   {
  //     id_category: 6,
  //     name_element: "CAMADA DE INFRAESTRUTURAS",
  //     sub_brand: [{id_category: 1, name_element: "layer_vector_infrastructure", category: "layer_vector_infrastructure"}]
  //   },
  //   {
  //     id_category: 8,
  //     name_element: "CAMADA DE EQUIPAMENTOS",
  //         sub_brand: [{id_category: 1, name_element: "layer_vector_equipament", category: "layer_vector_equipament"}]
  //   }, 
  // ];
  
}
