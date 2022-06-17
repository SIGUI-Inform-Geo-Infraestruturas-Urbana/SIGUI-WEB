import { AfterViewInit, Component, ElementRef, OnInit, Input, Output, EventEmitter,Renderer2, ViewChild } from '@angular/core';
import { Feature  } from 'ol';
import { ManagerSession } from '../../../../../models/managerSession.model'
import { StateMapService } from '../../../../../services/shared/state-map.service'
import { ManagerVisualizationService } from '../../../../../services/shared/visualization/manager-visualization.service'

import {  Observable } from "rxjs";
//import { CountyService } from 'src/app/services/count/county.service';
import { County } from 'src/app/models/county.model';
import { Geometry, MultiPolygon, Polygon } from 'ol/geom';
import { UnitFederal } from 'src/app/models/unit-federal.model';
import { District } from 'src/app/models/district.model';
@Component({
  selector: 'app-popup-options-manager',
  templateUrl: './popup-options-manager.component.html',
  styleUrls: ['./popup-options-manager.component.css']
})
export class PopupOptionsManagerComponent implements OnInit {

  @Output() associarInfra: EventEmitter<Feature> = new EventEmitter<Feature>();
  @Output() associarCity: EventEmitter<Feature> = new EventEmitter<Feature>();
  @Input() featureSelect!: Feature; 
  public hiddenState : boolean = true;
  public hiddenCounty : boolean = true;
  public hiddenDistrict : boolean = true;
  public hiddenStreet : boolean = true;
  public hiddenComponent : boolean = true;

  constructor(private stateMap :StateMapService, public managerService : ManagerVisualizationService) {


    managerService.getSessionVisualization().subscribe(sessionVizu => {
      console.log('----------------');
      console.log(sessionVizu);
      this.hiddenComponent = sessionVizu.session_component;
      this.hiddenStreet = sessionVizu.session_streat;
      this.hiddenDistrict = sessionVizu.session_ditrict;
      this.hiddenCounty = sessionVizu.session_county;
      this.hiddenState = sessionVizu.session_state;
    })
  }

  ngOnInit(): void {
  }



  enableDivInfra():void{    
    if (this.featureSelect != undefined)
    {
      console.log('click infra');
      this.associarInfra.emit(this.featureSelect);
    }
    else
    {
      console.log('click infra vazio')
    }
  }
  enableDivMunicipio():void{    
    if (this.featureSelect != undefined)
    {
      console.log('click infra');
      this.associarCity.emit(this.featureSelect);
    }
    else
    {
      console.log('click infra vazio')
    }
  }
  connectFeatureFromState():void{    
    if (this.featureSelect != undefined)
    {
      console.log('click infra');
      //this.associarCity.emit(this.featureSelect);
      //console.log(this.featureSelect);
      let geom :Geometry = this.populateGeometry(this.featureSelect);
      let spatial = new UnitFederal().serialize(this.featureSelect,geom)
      this.stateMap.setFeatureSelect(spatial);
     // this.stateMap.create(this.featureSelect);
    }
    else
    {
      console.log('click infra vazio')
    }
  }
  connectFeatureFromCounty():void{    
    if (this.featureSelect != undefined)
    {
      console.log('click infra');
      //this.associarCity.emit(this.featureSelect);
      //console.log(this.featureSelect);
      let geom :Geometry = this.populateGeometry(this.featureSelect);
      let spatial = new County().seserialize(this.featureSelect,geom)
      console.log(spatial);
      this.stateMap.setFeatureSelect(spatial);
     // this.stateMap.create(this.featureSelect);
    }
    else
    {
      console.log('click infra vazio')
    }
  }
  connectFeatureFromDistrict():void{    
    if (this.featureSelect != undefined)
    {
      console.log('click infra');
      //this.associarCity.emit(this.featureSelect);
      //console.log(this.featureSelect);
      let geom :Geometry = this.populateGeometry(this.featureSelect);
      let spatial = new District().serialize(this.featureSelect,geom)
      this.stateMap.setFeatureSelect(spatial);
     // this.stateMap.create(this.featureSelect);
    }
    else
    {
      console.log('click infra vazio')
    }
  }

  populateGeometry(feature:Feature):Geometry{
    let MultiPolygonList = [];
    console.log('+++++++++++++++++');
    console.log(feature);     
    console.log('Teste register');
    let geometria:Polygon = <Polygon>feature.getGeometry();
    if(geometria != undefined){
      MultiPolygonList.push(geometria)
      let geometryMultPoly: Geometry = new MultiPolygon(MultiPolygonList);
      return geometryMultPoly;
    }
    else{
      return geometria;
    }
  }

}
