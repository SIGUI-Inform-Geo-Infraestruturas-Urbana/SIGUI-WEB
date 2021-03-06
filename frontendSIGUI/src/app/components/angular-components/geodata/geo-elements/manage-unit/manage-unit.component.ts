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
import { UnitManipulation } from 'src/app/services/unit-federal/unit-federal-manager/unit-federal-manipulation.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-manage-unit',
  templateUrl: './manage-unit.component.html',
  styleUrls: ['./manage-unit.component.scss']
})
export class ManageUnitComponent implements OnInit {

  public stateEntity! : UnitFederal;
  public stateFormu!: FormGroup;
  public editable : boolean = false;
  public saving : boolean = true;


  constructor(public unitFederativeRepository : UnitFederativeRepositoryService, 
    private unitManipulation :UnitManipulation,
    private stateMap :StateMapService,
    private snackBar: MatSnackBar){ 
    this.stateEntity = new UnitFederal();
    this.createForm(new UnitFederal(0));
  
    unitManipulation.getUnitManipulation().subscribe(feature => {
      console.log("+++6+iniciou")    
      console.log(feature)    
      this.initializeForm(feature);      
      //this.populateGeometry(feature);      
    }) 
 }

  ngOnInit(): void {
   // this.createForm(new UnitFederal());
  }

  initializeForm(feature:DataSpatial ){
    let infrastructure:UnitFederal = <UnitFederal>feature;   
    if ((infrastructure.id_unit_federal != undefined)&&(infrastructure.id_unit_federal != 0)){
      console.log(infrastructure.id_unit_federal)
      console.log('Valor j?? existe')
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
        citySubmit.initials = this.stateFormu.get('initialsUf')?.value;
        citySubmit.geometry = this.stateEntity.geometry,
        citySubmit.geocode = this.stateFormu.get('codUf')?.value
        citySubmit.name_region = this.stateFormu.get('nomeRegion')?.value,
        citySubmit.area_state = this.stateFormu.get('areaState')?.value,
        
        console.log(citySubmit);
        if (this.saving == true){
          this.createState(citySubmit);
        }
        else if (this.editable == true){
          console.log('N??o Geomtria')
          citySubmit.id = this.stateFormu.get('idState')?.value;
          this.alterData(citySubmit);
        }
      }
      else{
        console.log('N??o Geomtria')
      }
    }
    else
    {
      console.log('N??o Validado')
    }
  } 

  createState(equi:UnitFederal):void{
    console.log('popu')
    console.log(equi)

    this.unitFederativeRepository.postData(equi).subscribe({
      next: (districts : UnitFederal) => {
        console.log(districts);
        this.initializeForm(districts);    
        this.snackBar.open(`Unidade Federativa Cadastrado! ID { ${districts.id} }`,'Entendido',{duration: 8 * 1000});
        //this.countyRepositoryService.populateServiceViewMap(beers)
      },
      error: (err:HttpErrorResponse) => {
        console.log('TRATAR');
        console.log(err);
        this.openSnackBar(err.statusText);      
      },    
    })
  }

  openSnackBar(mensagem : string) {
    this.snackBar.open(mensagem, 'Entendido!', {
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  alterData(equipament:UnitFederal):void{
    console.log('popu')
    console.log(equipament)

    this.unitFederativeRepository.editData(equipament).subscribe({
      next: (districts : UnitFederal) => {
        console.log(districts);
        this.initializeForm(districts);    
        this.snackBar.open(`Unidade Federativa Edit! ID { ${districts.id} }`,'Entendido',{duration: 8 * 1000});
        //this.countyRepositoryService.populateServiceViewMap(beers)
      },
      error: (err:HttpErrorResponse) => {
        console.log('TRATAR');
        console.log(err);
        this.openSnackBar(err.statusText);      
      },
    
    })
  }

}
