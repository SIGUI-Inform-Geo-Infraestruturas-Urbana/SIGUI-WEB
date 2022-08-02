import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Feature } from 'ol';
import { Geometry, MultiPolygon, Polygon } from 'ol/geom';
import { controlViewData } from 'src/app/models/control-view-data.model';
import { County } from 'src/app/models/county.model';
import { StateMapService } from 'src/app/services/shared/state-map.service';


@Component({
  selector: 'app-popup-control-county',
  templateUrl: './popup-control-county.component.html',
  styleUrls: ['./popup-control-county.component.css']
})
export class PopupControlCountyComponent implements OnInit {

  @Input() validEdit: boolean; 
  @Input() validSave: boolean; 
  @Input() featureSelect!: Feature; 
  @Output() associarInfra: EventEmitter<Feature> = new EventEmitter<Feature>();
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();
  @Output() associarCity: EventEmitter<Feature> = new EventEmitter<Feature>();

  constructor(private stateMap :StateMapService) { 
    this.validEdit = false;
    this.validSave = false;
  }

  ngOnInit(): void {
  }

  enableDivCounty():void{    
    if (this.featureSelect != undefined)
    {
      console.log('click infra');
      let geom :Geometry = this.populateGeometry(this.featureSelect);
      let controlView : controlViewData= {
        dataSpatial : new County().seserialize(this.featureSelect,geom),
        managerMenu : null
      }

      this.stateMap.setFeatureSelect(controlView);
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
      console.log(this.featureSelect.getKeys());

      //this.associarCity.emit(this.featureSelect);
      //console.log(this.featureSelect);
      let geom :Geometry = this.populateGeometry(this.featureSelect);

      let controlView : controlViewData= {
        dataSpatial : new County().seserialize(this.featureSelect,geom),
        managerMenu : null
      }

      this.stateMap.setFeatureSelect(controlView);
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

  excludeFeature(){
    if (this.featureSelect != undefined)
    {
      let id: number =<number> this.featureSelect.getId();
      this.delete.emit(id)
    }
  }
}
