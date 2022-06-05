import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { StateEntity } from '../../../models/state.model';
import { Feature } from 'ol';
import {RestApiService} from '../../../services/rest-api.service';
import {Polygon, MultiPolygon} from 'ol/geom';
import GeoJSON from 'ol/format/GeoJSON';
import {StateMapService} from '../../../services/shared/state-map.service'


@Component({
  selector: 'app-maneger-state',
  templateUrl: './maneger-state.component.html',
  styleUrls: ['./maneger-state.component.css']
})
export class ManegerStateComponent implements OnInit {

  public states : StateEntity[] = [];
  public stateEntity! : StateEntity;
  public stateFormu!: FormGroup;

  constructor(public restApi: RestApiService, private stateMap :StateMapService){ 
    this.stateEntity = new StateEntity(0);
    stateMap.getFeatureSelect().subscribe(feature => {
      console.log(feature)    
      this.populateGeometry(feature);      
    })  
  }

  ngOnInit(): void {
    this.createForm(new StateEntity());
  }

  createForm(stateE : StateEntity):void{
    this.stateFormu = new FormGroup({
      nameState : new FormControl(stateE.name_state),
      idState : new FormControl(stateE.id_state),
      initialsUf : new FormControl(stateE.initials_uf),
      codUf: new FormControl(stateE.cod_uf),
      geometry: new FormControl(stateE.geometry),
      nomeRegion: new FormControl(stateE.nome_region),//geometry//geometry
      areaState: new FormControl(stateE.area_state),
    });
  }

  populateGeometry(feature:Feature){
    let MultiPolygonList = [];
    let geometria:Polygon = <Polygon>feature.getGeometry();
    if(geometria != undefined){
      MultiPolygonList.push(geometria)
      let geometryMultPoly: MultiPolygon = new MultiPolygon(MultiPolygonList);

      var geojson_parser = new GeoJSON();
      var geometryJson = geojson_parser.writeGeometry(geometryMultPoly);

      this.stateEntity.geometry = geometryJson;
      console.log(this.stateEntity);
    }
  }

  onSubmit(){
   
    const citySubmit: StateEntity = new StateEntity(this.stateFormu.get('idState')?.value).deserialize({
      name_state : this.stateFormu.get('nameState')?.value,
      initials_uf : this.stateFormu.get('initialsUf')?.value,
      cod_uf : this.stateFormu.get('codUf')?.value,
      geometry :  this.stateEntity.geometry,
      nome_region : this.stateFormu.get('nomeRegion')?.value,
      area_state : this.stateFormu.get('areaState')?.value,

    })
    console.log(citySubmit);
    this.createState(citySubmit);
  }

  createState(stateE:StateEntity):void{
    console.log('popu')
    console.log(stateE)
    this.restApi.setState(stateE).subscribe((data : {}) => {
      console.log('populate')
      console.log(data)
    })
  }

}
