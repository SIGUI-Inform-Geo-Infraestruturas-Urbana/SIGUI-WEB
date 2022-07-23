import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl , Validators} from '@angular/forms';
import { UnitFederal } from '../../../../../models/unit-federal.model';
import { getArea } from 'ol/sphere';
import { Feature } from 'ol';
import {RestApiService} from '../../../../../services/rest-api.service';
import {Polygon, MultiPolygon, Geometry} from 'ol/geom';
import GeoJSON from 'ol/format/GeoJSON';
import {StateMapService} from '../../../../../services/shared/state-map.service'
import { DataSpatial } from 'src/app/models/data-spatial';
import { UnitFederativeRepositoryService } from 'src/app/repositorys/unit-federative-repository.service';
import { Infrastructure } from 'src/app/models/infrastructure.model';
import { Coordinate } from 'ol/coordinate';
import { MatSnackBar} from '@angular/material/snack-bar'

@Component({
  selector: 'app-manage-unit',
  templateUrl: './manage-unit.component.html',
  styleUrls: ['./manage-unit.component.scss']
})
export class ManageUnitComponent implements OnInit {

  public stateEntity! : UnitFederal;
  public stateFormu!: FormGroup;

  constructor(public unitFederativeRepository : UnitFederativeRepositoryService, private stateMap :StateMapService,
    private snackBar: MatSnackBar){ 
    this.stateEntity = new UnitFederal(0);
    this.createForm(new UnitFederal(0));
    stateMap.getFeatureSelect().subscribe(feature => {     
      console.log(feature)    
      this.initializeForm(feature);   
    })    
 }

  ngOnInit(): void {
   // this.createForm(new UnitFederal());
  }

  initializeForm(feature:DataSpatial ){
    let infrastructure:UnitFederal = <UnitFederal>feature;   
    if ((infrastructure.id_unit_federal != undefined)&&(infrastructure.id_unit_federal != 0)){
      console.log(infrastructure.id_unit_federal)
      console.log('Valor já existe')
      console.log(infrastructure)
      this.updateForm(infrastructure);
      this.stateEntity = infrastructure;    
    }
    else
    {
      console.log('Definir nova variavel')
      this.populateGeometry(infrastructure); 
      this.updateForm(infrastructure);       
    }
  }

  updateForm(infrastructure : UnitFederal){
    this.stateFormu.patchValue({
      idState : infrastructure.id,
      nameState :  infrastructure.name,       
      initialsUf : infrastructure.initials,
      codUf: infrastructure.id,
      geometry: infrastructure.geometry,
      nomeRegion: infrastructure.name_region,
      areaState: this.generateArea(infrastructure)
    })
  }
  // generateCoordinate(unit:UnitFederal):string{
  //   if(unit.geometry != '0'){  
  //     let geom = <Polygon>unit.geometry;
  //     let coordinatePoint:Coordinate= <Coordinate>geom.getCoordinates();
  //     console.log('Coord')
  //     console.log(coordinatePoint)     
  //     this.overlay.setPosition(coordinatePoint); 
  //     this.coordenadaPoint = toStringHDMS(toLonLat(coordinatePoint));
  //     return ''
  //   }
  //   else{
  //     return ''
  //   }
  // } 
  generateArea(unit:UnitFederal):number{  
    if(unit.geometry != '0'){  
      const area = getArea(<Polygon>unit.geometry);
      let output;
      if (area > 10000) {
        output = Math.round((area / 1000000) * 100) / 100 //+ ' ' + 'km<sup>2</sup>';
      } else {
        output = Math.round(area * 100) / 100 //+ ' ' + 'm<sup>2</sup>';
      }
      console.log(output);
      return output;
    }
    else{
      return 0;
    }
  }  

  createForm(stateE : UnitFederal):void{
    this.stateFormu = new FormGroup({
      nameState : new FormControl(stateE.name,[Validators.required]),
      idState : new FormControl(stateE.id),
      initialsUf : new FormControl(stateE.initials,[Validators.required]),
      codUf: new FormControl(stateE.geocode,[Validators.required]),
      geometry: new FormControl(stateE.geometry,),
      nomeRegion: new FormControl(stateE.name_region,[Validators.required]),//geometry//geometry
      areaState: new FormControl(stateE.area_state,[Validators.required]),
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
   
    if (this.stateFormu.valid)
    {
      if((this.stateEntity.geometry != '0')&&(this.stateEntity.geometry != undefined)){  
        const citySubmit: UnitFederal = new UnitFederal(this.stateFormu.get('idState')?.value);    
        citySubmit.name = this.stateFormu.get('nameState')?.value;
        citySubmit.id_unit_federal = this.stateFormu.get('initialsUf')?.value;
        citySubmit.geometry = this.stateEntity.geometry,
        citySubmit.geocode = this.stateFormu.get('codUf')?.value
        citySubmit.name_region = this.stateFormu.get('nomeRegion')?.value,
        citySubmit.area_state = this.stateFormu.get('areaState')?.value,
        
        console.log(citySubmit);
        this.createState(citySubmit); 
      }
      else{
        console.log('Não Geomtria')
      }
    }
    else
    {
      console.log('Não Validado')
    }
  } 

  createState(stateE:UnitFederal):void{
    console.log('popu')
    console.log(stateE)
    let a = this.unitFederativeRepository.createData(stateE)
    .then((value:UnitFederal) => {
      console.log(value)
      this.initializeForm(value);  
      this.snackBar.open(`Unidade Federativa Cadastrada! ID { ${value.id} }`,'Entendido',{duration: 8 * 1000});   
    })
    
  } 

}
