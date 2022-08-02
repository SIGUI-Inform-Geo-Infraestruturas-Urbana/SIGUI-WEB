import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Feature } from 'ol';
import { Geometry, Point } from 'ol/geom';
import { controlViewData } from 'src/app/models/control-view-data.model';
import { EquipmentUrban } from 'src/app/models/equipament-urban.model';
import { StateMapService } from 'src/app/services/shared/state-map.service';


@Component({
  selector: 'app-popup-control-equipamenturban',
  templateUrl: './popup-control-equipamenturban.component.html',
  styleUrls: ['./popup-control-equipamenturban.component.css']
})
export class PopupControlEquipamenturbanComponent implements OnInit {

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

  connectFeatureFromEstruture():void{    
    if (this.featureSelect != undefined)
    {
      console.log('click infra');
      //this.associarCity.emit(this.featureSelect);
      //console.log(this.featureSelect);
      let geom :Geometry = this.populatePoint(this.featureSelect);
      let controlView : controlViewData= {
        dataSpatial : new EquipmentUrban().serialize(this.featureSelect,geom),
        managerMenu : null
      }

      this.stateMap.setFeatureSelect(controlView);
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
  excludeFeature(){
    if (this.featureSelect != undefined)
    {
      let id: number =<number> this.featureSelect.getId();
      this.delete.emit(id)
    }
  }

}
