import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UnitFederal } from '../../../models/unit-federal.model';
import { Feature } from 'ol';
import {RestApiService} from '../../../services/rest-api.service';
import {Polygon, MultiPolygon} from 'ol/geom';
import GeoJSON from 'ol/format/GeoJSON';
import {StateMapService} from '../../../services/shared/state-map.service'
import { DataSpatial } from 'src/app/models/data-spatial';
import { UnitFederativeRepositoryService } from 'src/app/repositorys/unit-federative-repository.service';


@Component({
  selector: 'app-maneger-state',
  templateUrl: './maneger-state.component.html',
  styleUrls: ['./maneger-state.component.css']
})
export class ManegerStateComponent implements OnInit {

  /*public states : UnitFederal[] = [];
  public stateEntity! : UnitFederal;
  public stateFormu!: FormGroup;

  constructor(public restApi: RestApiService, private stateMap :StateMapService){ 
    this.stateEntity = new UnitFederal(0);
    stateMap.getFeatureSelect().subscribe(feature => {
      console.log(feature)    
      this.populateGeometry(feature);      
    })  
  }*/

  public stateEntity! : UnitFederal;
  public stateFormu!: FormGroup;

  constructor(public unitFederativeRepository : UnitFederativeRepositoryService, private stateMap :StateMapService){ 
    this.stateEntity = new UnitFederal(0);
    stateMap.getFeatureSelect().subscribe(feature => {     
      console.log(feature)    
      this.populateGeometry(feature);      
    })    

 }

  ngOnInit(): void {
    this.createForm(new UnitFederal());
  }

  createForm(stateE : UnitFederal):void{
    this.stateFormu = new FormGroup({
      nameState : new FormControl(stateE.name),
      idState : new FormControl(stateE.id),
      initialsUf : new FormControl(stateE.initials),
       codUf: new FormControl(stateE.id),
      geometry: new FormControl(stateE.geometry),
      nomeRegion: new FormControl(stateE.name_region),//geometry//geometry
      areaState: new FormControl(stateE.area_state),
    });
  }

  populateGeometry(feature:DataSpatial){ 
    console.log('+++++++++++++++++');
    console.log(feature);     
    console.log('Teste register');
    let unit:UnitFederal = <UnitFederal>feature;   
   
    if(unit.uf_geometry != '0'){
      console.log('Teste FERATIVO');      
      this.stateEntity.geometry = unit.uf_geometry;
      console.log(this.stateEntity);
    }
  }  

  onSubmit(){
   
    const citySubmit: UnitFederal = new UnitFederal(this.stateFormu.get('codUf')?.value);    
    citySubmit.name = this.stateFormu.get('nameState')?.value;
    citySubmit.id_unit_federal = this.stateFormu.get('initialsUf')?.value;
    citySubmit.geometry = this.stateEntity.geometry,
    citySubmit.name_region = this.stateFormu.get('nomeRegion')?.value,
    citySubmit.area_state = this.stateFormu.get('areaState')?.value,
    
    console.log(citySubmit);
    this.createState(citySubmit); 
  } 

  createState(stateE:UnitFederal):void{
    console.log('popu')
    console.log(stateE)
    let a = this.unitFederativeRepository.createData(stateE);
  }

}
