import { AfterViewInit, Component, ElementRef, OnInit, Input, Output, EventEmitter,Renderer2, ViewChild } from '@angular/core';
import { Feature  } from 'ol';
import { ManagerSession } from '../../../../../models/managerSession.model'
import { StateMapService } from '../../../../../services/shared/state-map.service'
import { ManagerVisualizationService } from '../../../../../services/shared/visualization/manager-visualization.service'

import {  Observable } from "rxjs";
//import { CountyService } from 'src/app/services/count/county.service';
import { County } from 'src/app/models/county.model';
import { Geometry, LineString, MultiPolygon, Point, Polygon } from 'ol/geom';
import { UnitFederal } from 'src/app/models/unit-federal.model';
import { District } from 'src/app/models/district.model';
import { Infrastructure } from 'src/app/models/infrastructure.model';
import { AssociationInfrastructuresComponent } from '../../../association-infrastructures/association-infrastructures.component';
import { InfrastructureNetwork } from 'src/app/models/Infrastructure-network.model';
import { DataAssociationService } from 'src/app/services/count/data-association.service';
import { Coordinate } from 'ol/coordinate';
import { EquipmentUrban } from 'src/app/models/equipament-urban.model';
import { Street } from 'src/app/models/street.model';
import { PublicPlace } from 'src/app/models/public-place.model';
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
  public hiddenPublicPlace : boolean = true;
  public hiddenInfrastructure : boolean = true;
  public hiddenEstructure : boolean = true;  

  constructor(private stateMap :StateMapService, private dataAssociationService : DataAssociationService,
    public managerService : ManagerVisualizationService) {

    managerService.getSessionVisualization().subscribe(sessionVizu => {
      console.log('----------------');
      console.log(sessionVizu);
      this.hiddenPublicPlace = sessionVizu.session_public_place;
      this.hiddenInfrastructure = sessionVizu.session_infrastructure;
      this.hiddenEstructure = sessionVizu.session_estructure;
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
  connectFeatureFromStreet():void{    
    if (this.featureSelect != undefined)
    {
      console.log('click infra');
      //this.associarCity.emit(this.featureSelect);
      //console.log(this.featureSelect);
      let geom :Geometry = this.populateLine(this.featureSelect);
      let spatial = new Street().serialize(this.featureSelect,geom)
      this.stateMap.setFeatureSelect(spatial);
     // this.stateMap.create(this.featureSelect);
    }
    else
    {
      console.log('click infra vazio')
    }
  }
  connectFeatureFromPublicPlace():void{    
    if (this.featureSelect != undefined)
    {
      console.log('click infra');
      //this.associarCity.emit(this.featureSelect);
      //console.log(this.featureSelect);
      let geom :Geometry = this.populateLine(this.featureSelect);
      let spatial = new PublicPlace().serialize(this.featureSelect,geom)
      this.stateMap.setFeatureSelect(spatial);
     // this.stateMap.create(this.featureSelect);
    }
    else
    {
      console.log('click infra vazio')
    }
  }
  connectFeatureFromInfrastructure():void{    
    if (this.featureSelect != undefined)
    {
      console.log('click infra');
      //this.associarCity.emit(this.featureSelect);
      //console.log(this.featureSelect);
      let geom :Geometry = this.populatePoint(this.featureSelect);
      let spatial = new Infrastructure().serialize(this.featureSelect,geom)
      this.stateMap.setFeatureSelect(spatial);
     // this.stateMap.create(this.featureSelect);
    }
    else
    {
      console.log('click infra vazio')
    }
  }

  connectFeatureFromEstruture():void{    
    if (this.featureSelect != undefined)
    {
      console.log('click infra');
      //this.associarCity.emit(this.featureSelect);
      //console.log(this.featureSelect);
      let geom :Geometry = this.populatePoint(this.featureSelect);
      let spatial = new EquipmentUrban().serialize(this.featureSelect,geom)
      this.stateMap.setFeatureSelect(spatial);
     // this.stateMap.create(this.featureSelect);
    }
    else
    {
      console.log('click infra vazio')
    }
  }

  associateFeatureFromInfrastructure():void{ 

    if (this.featureSelect != undefined)
    {
      console.log('click associations');
      let geom :Point = <Point>this.populatePoint(this.featureSelect);
      let infraAssociation = <InfrastructureNetwork>this.dataAssociationService.getInfraNet();
      let infra = <Infrastructure>infraAssociation.infrastructure_in
      let geome : Point = <Point> infra.infra_geometry;
      infraAssociation.infrastructure_out = new Infrastructure().serialize(this.featureSelect,geom)
      console.log(infraAssociation.infrastructure_out )
      var points:Coordinate[] = [geome.getCoordinates(),geom.getCoordinates()]

      // let nerFeature = new Feature({
      //   geometry : new LineString(points)
      // })
          infraAssociation.infra_geometry = new LineString(points);
      this.dataAssociationService.setnfraNetNext(infraAssociation);

      console.log('---TESTE----')
      console.log(infraAssociation)

      this.dataAssociationService.setDataOut( new Infrastructure().serialize(this.featureSelect,geom));
     // this.stateMap.create(this.featureSelect);
    }
    else
    {
      console.log('click infra vazio')
    }
  }
  populatePoint(feature:Feature):Geometry{  
    console.log('+++++++++++++++++');
    console.log(feature);     
    console.log('Teste register');
    let geometria:Point = <Point>feature.getGeometry();
    if(geometria != undefined){     
      return geometria;
    }
    else{
      return geometria;
    }
  }

  populateLine(feature:Feature):Geometry{  
    console.log('+++++++++++++++++');
    console.log(feature);     
    console.log('Teste register');
    let geometria:LineString = <LineString>feature.getGeometry();
    if(geometria != undefined){     
      return geometria;
    }
    else{
      return geometria;
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
