import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Feature } from 'ol';
import { Geometry, LineString } from 'ol/geom';
import { controlViewData } from 'src/app/models/control-view-data.model';
import { PublicPlace } from 'src/app/models/public-place.model';
import { StateMapService } from 'src/app/services/shared/state-map.service';


@Component({
  selector: 'app-popup-control-publicplace',
  templateUrl: './popup-control-publicplace.component.html',
  styleUrls: ['./popup-control-publicplace.component.css']
})
export class PopupControlPublicplaceComponent implements OnInit {

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

  connectFeatureFromPublicPlace():void{    
    if (this.featureSelect != undefined)
    {
      console.log('click infra');
      //this.associarCity.emit(this.featureSelect);
      //console.log(this.featureSelect);
      let geom :Geometry = this.populateLine(this.featureSelect);

      let controlView : controlViewData= {
        dataSpatial :  new PublicPlace().serialize(this.featureSelect,geom),
        managerMenu : null
      }

      this.stateMap.setFeatureSelect(controlView);
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
  excludeFeature(){
    if (this.featureSelect != undefined)
    {
      let id: number =<number> this.featureSelect.getId();
      this.delete.emit(id)
    }
  }

}
