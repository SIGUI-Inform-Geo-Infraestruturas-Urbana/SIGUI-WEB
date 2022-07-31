import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Feature } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { Geometry, LineString, MultiLineString, MultiPolygon, Polygon } from 'ol/geom';
import { Street } from 'src/app/models/street.model';
import { StateMapService } from 'src/app/services/shared/state-map.service';

@Component({
  selector: 'app-popup-control-street',
  templateUrl: './popup-control-street.component.html',
  styleUrls: ['./popup-control-street.component.css']
})
export class PopupControlStreetComponent implements OnInit {

  @Input() validEdit: boolean; 
  @Input() validSave: boolean; 
  @Input() featureSelect!: Feature; 
  @Output() associarInfra: EventEmitter<Feature> = new EventEmitter<Feature>();
  @Output() associarCity: EventEmitter<Feature> = new EventEmitter<Feature>();
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();
  
  constructor(private stateMap :StateMapService) { 
    this.validEdit = false;
    this.validSave = false;
  }

  ngOnInit(): void {
  }

  enableDivMunicipio(){

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

  populateLine(feature:Feature):Geometry{  

    let multiLineString : LineString[]= [];
    console.log('+++++++++++++++++');
    console.log(feature);     
    console.log('Teste register');
    let geometria:LineString = <LineString>feature.getGeometry();
    if(geometria != undefined){     
      multiLineString.push(geometria)
      let geometryMultPoly: Geometry = new MultiLineString(multiLineString);
      return geometryMultPoly;     
    }
    else{
      return geometria;
    }

  }
  excludeFeature(){
    if (this.featureSelect != undefined)
    {
      let id: number =<number> this.featureSelect.getId();
      this.delete.emit(id)
    }
  }

}
