import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Feature } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { Geometry, LineString, Point } from 'ol/geom';
import { InfrastructureNetwork } from 'src/app/models/Infrastructure-network.model';
import { Infrastructure } from 'src/app/models/infrastructure.model';
import { DataAssociationService } from 'src/app/services/count/data-association.service';
import { StateMapService } from 'src/app/services/shared/state-map.service';


@Component({
  selector: 'app-popup-control-infrastructure',
  templateUrl: './popup-control-infrastructure.component.html',
  styleUrls: ['./popup-control-infrastructure.component.css']
})
export class PopupControlInfrastructureComponent implements OnInit {

  @Input() validEdit: boolean; 
  @Input() validSave: boolean; 
  @Input() featureSelect!: Feature; 
  @Output() associarInfra: EventEmitter<Feature> = new EventEmitter<Feature>();
  @Output() associarCity: EventEmitter<Feature> = new EventEmitter<Feature>();

  constructor(private stateMap :StateMapService, private dataAssociationService : DataAssociationService) { 
    this.validEdit = false;
    this.validSave = false;
  }

  ngOnInit(): void {
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

  addNodeFatherNetwork(){
    if (this.featureSelect != undefined)
    {

     //console.log(this.featureSelect);
     let geom :Geometry = this.populatePoint(this.featureSelect);
     let spatial = new Infrastructure().serialize(this.featureSelect,geom)
     let infraAssociation = new InfrastructureNetwork()
     infraAssociation.infrastructure_in = <Infrastructure>spatial;
     
     this.stateMap.setFeatureSelect(infraAssociation);
  
    console.log('passou  fdfrd')
    console.log(infraAssociation)
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
}
