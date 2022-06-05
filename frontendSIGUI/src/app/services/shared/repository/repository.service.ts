import { Injectable } from '@angular/core';

import { Component, OnInit, Input, Renderer2 ,ElementRef, Output , EventEmitter} from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import {City} from '../../../models/city.model';
import { Feature } from 'ol';
import {RestApiService} from '../../../services/rest-api.service';
import { Geometry, Point, Polygon, MultiPolygon} from 'ol/geom';
import GeoJSON from 'ol/format/GeoJSON';

import {StateMapService} from '../../../services/shared/state-map.service'

import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(public restApi: RestApiService) { }

  createCity(city:City):void{
    console.log('popu')
    console.log(city)
    this.restApi.setMunicipios(city).subscribe((data : {}) => {
      console.log('populate')
      console.log(data)
    })
  }

  // getCounty(){
  //     let a = {};
  //     console.log("entrou")
  //     this.restApi.getMunicipios().map
  //     // map((geojsonObject : {}) => {
  //     //   console.log('populate')  
        
  //     //   console.log(geojsonObject)      

  //     // })    
  
  //   } 
}
