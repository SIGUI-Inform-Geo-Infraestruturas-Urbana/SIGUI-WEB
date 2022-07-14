import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Feature } from 'ol';
import { Geometry, LineString } from 'ol/geom';
import { Street } from 'src/app/models/street.model';
import { StateMapService } from 'src/app/services/shared/state-map.service';

@Component({
  selector: 'app-popup-control-street',
  templateUrl: './popup-control-street.component.html',
  styleUrls: ['./popup-control-street.component.css']
})
export class PopupControlStreetComponent implements OnInit {

  @Input() featureSelect!: Feature; 
  @Output() associarInfra: EventEmitter<Feature> = new EventEmitter<Feature>();
  @Output() associarCity: EventEmitter<Feature> = new EventEmitter<Feature>();

  constructor(private stateMap :StateMapService) { }

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

}