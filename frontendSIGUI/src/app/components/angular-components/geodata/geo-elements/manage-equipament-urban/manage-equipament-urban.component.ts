import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Geometry } from 'ol/geom';
import { DataSpatial } from 'src/app/models/data-spatial';
import { District } from 'src/app/models/district.model';
import { EquipmentUrban } from 'src/app/models/equipament-urban.model';
import { Infrastructure } from 'src/app/models/infrastructure.model';
import { PublicPlace } from 'src/app/models/public-place.model';
import { Street } from 'src/app/models/street.model';
import { Subsystem } from 'src/app/models/subsystem.model';
import { DistrictRepositoryService } from 'src/app/repositorys/district-repository.service';
import { EquipamentUrbanRepositoryService } from 'src/app/repositorys/equipament-urban-repository.service';
import { InfrastructureRepositoryService } from 'src/app/repositorys/infrastructure-repository.service';
import { PublicPlaceRepositoryService } from 'src/app/repositorys/public-place-repository.service';
import { StreetRepositoryService } from 'src/app/repositorys/street-repository.service';
import { SubsystemRepositoryService } from 'src/app/repositorys/subsystem-repository.service';
import { StateMapService } from 'src/app/services/shared/state-map.service';
import { MatSnackBar} from '@angular/material/snack-bar'
import { HttpErrorResponse } from '@angular/common/http';
import { EquipamentUrbanManipulationService } from 'src/app/services/equipamentUrban/equipamentUrban-manager/equipamentUrban-manipulation.service';

@Component({
  selector: 'app-manage-equipament-urban',
  templateUrl: './manage-equipament-urban.component.html',
  styleUrls: ['./manage-equipament-urban.component.scss']
})
export class ManageEquipamentUrbanComponent implements OnInit {

  public streets : Street[] = [];  
  public publicPlaces : PublicPlace[] = [];  
  public districts : District[] = [];
  public equipament : EquipmentUrban;
  public equipamentForm!: FormGroup;
  public editable : boolean = false;
  public saving : boolean = true;

  constructor( public districtRepository : DistrictRepositoryService,
   public streetRepository: StreetRepositoryService , 
   public publicPlaceRepository: PublicPlaceRepositoryService , 
   public EquipamentUrbanRepository: EquipamentUrbanRepositoryService ,
   private equipamentUrbanManipulation :EquipamentUrbanManipulationService,   
   public snackBar : MatSnackBar,
    private stateMap :StateMapService) {
    this.equipament = new EquipmentUrban();
    this.createForm(new EquipmentUrban(0));
    equipamentUrbanManipulation.getEquipamentUrbanManipulation().subscribe(feature => {
      console.log("+++6+iniciou")    
      console.log(feature)    
      this.initializeForm(feature);      
      //this.populateGeometry(feature);      
    })
  }

  ngOnInit(): void {
    // this.createForm(new EquipmentUrban(0));
    this.getDistrict();
    this.getStreet();
    this.getPublicPlace();
    this.equipamentForm.get("eq_co_street")?.valueChanges.subscribe(f => {this.onSelectStreet(f)})
    this.equipamentForm.get("eq_co_district")?.valueChanges.subscribe(f => {this.onSelectDistrict(f)})
    this.equipamentForm.get("eq_co_public_place")?.valueChanges.subscribe(f => {this.onSelectPP(f)})
     
  }

  initializeForm(equipam:EquipmentUrban ){//feature:DataSpatial
    //let city:County = <County>feature;   
    if ((equipam.id != undefined)&&(equipam.id != 0)){
      console.log(equipam.id)
      console.log('Valor já existe')
      console.log(equipam)
      this.updateForm(equipam);
      this.equipament = equipam;    
      this.editable = true;
      this.saving = false;
    }
    else
    {
      console.log('Definir nova variavel')
      this.populateGeometry(equipam); 
      this.updateForm(equipam);      
      this.editable = false;
      this.saving = true; 
    }
  }

  updateForm(infrastructure : EquipmentUrban){
    console.log('updateForm')
    console.log(infrastructure)
    
    this.equipamentForm.patchValue({

      eq_co_cod : infrastructure.co_cod,
      eq_co_equipament : infrastructure.co_equipament,
      eq_co_type :  infrastructure.co_type,
      eq_co_departament_admin : infrastructure.co_type,
      eq_co_name_complete :  infrastructure.co_name_complete,
      eq_co_first_name : infrastructure.co_first_name,
      eq_co_name : infrastructure.name,
      eq_co_name_map : infrastructure.co_name_map,
      eq_co_street : infrastructure.co_street,
      eq_co_public_place : infrastructure.co_public_place,
      eq_co_number_building : infrastructure.co_number_building,
      eq_co_district : infrastructure.co_district,
      eq_co_observation : infrastructure.observation,          
      
    })
  }


  createForm(infrastructure : EquipmentUrban):void{
    this.equipamentForm = new FormGroup({

      eq_co_cod : new FormControl({value : infrastructure.co_cod,disabled : true}),
     
      eq_co_equipament :  new FormControl(infrastructure.co_equipament ,[Validators.required]),
      eq_co_type :  new FormControl(infrastructure.co_type ,[Validators.required]),
      eq_co_departament_admin :  new FormControl(infrastructure.departament_admin ,[Validators.required]),
      eq_co_name_complete :   new FormControl(infrastructure.co_name_complete ,[Validators.required]),
      eq_co_first_name :  new FormControl(infrastructure.co_first_name ,[Validators.required]),
      eq_co_name :   new FormControl(infrastructure.name ,[Validators.required]),
      eq_co_name_map :   new FormControl(infrastructure.co_name_map ,[Validators.required]),
      eq_co_street : new FormControl(infrastructure.co_street ,[Validators.required]),
      eq_co_public_place :  new FormControl(infrastructure.co_public_place ,[Validators.required]),
      eq_co_number_building :  new FormControl(infrastructure.co_number_building),
      eq_co_district :  new FormControl(infrastructure.co_district ,[Validators.required]),
      eq_co_observation :  new FormControl(infrastructure.observation),          
      
    });
  }

  populateGeometry(feature:DataSpatial){
    console.log('+++++++++++++++++');
    console.log(feature);     
    console.log('Teste register');
    let infrastructure:EquipmentUrban = <EquipmentUrban>feature;   
   
    if(infrastructure.co_geometry != '0'){
      console.log('Teste register');      
      this.equipament.geometry = infrastructure.co_geometry;
      console.log(this.equipament);
    }
  }

  getDistrict(){
    this.districtRepository.findFetch() //.pipe(catchError(()=> { return throwError (() => new Error ("Teste de Tratamento")); }))    
    .subscribe({
      next: (data : District[]) => {
        console.log('getcounty')
        console.log(data);
        this.districts = data;
      },
      error: (err:HttpErrorResponse) => {
        console.log('TRATAR');
        console.log(err);
        this.openSnackBar(err.statusText);
        //this._counties.error(err);
      },
    });
  }

  getStreet(){

    this.streetRepository.findFetch() //.pipe(catchError(()=> { return throwError (() => new Error ("Teste de Tratamento")); }))    
    .subscribe({
      next: (data : Street[]) => {
        console.log('getcounty')
        console.log(data);
        this.streets = data;
      },
      error: (err:HttpErrorResponse) => {
        console.log('TRATAR');
        console.log(err);
        this.openSnackBar(err.statusText);
        //this._counties.error(err);
      },
    });
  }
  getPublicPlace(){

    this.publicPlaceRepository.findFetch() //.pipe(catchError(()=> { return throwError (() => new Error ("Teste de Tratamento")); }))    
    .subscribe({
      next: (data : PublicPlace[]) => {
        console.log('getcounty')
        console.log(data);
        this.publicPlaces = data;
      },
      error: (err:HttpErrorResponse) => {
        console.log('TRATAR');
        console.log(err);
        this.openSnackBar(err.statusText);
        //this._counties.error(err);
      },
    });
  }

  openSnackBar(mensagem : string) {
    this.snackBar.open(mensagem, 'Entendido!', {
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  onSelectDistrict(value:number){
    console.log('select')
    console.log(value)
    this.equipament.co_district = <number> this.districts.find( a => a.id == value)?.id
    //this.district.county =this.cities[value-1];
    console.log(this.equipament)
  }
  onSelectPP(value:number){
    console.log('select')
    console.log(value)
    this.equipament.co_public_place = <number> this.publicPlaces.find( a => a.id == value)?.id
    //this.district.county =this.cities[value-1];
    console.log(this.equipament)
  }
  onSelectStreet(value:number){
    console.log('select')
    console.log(value)
    this.equipament.co_street = <number> this.streets.find( a => a.id == value)?.id
    //this.district.county =this.cities[value-1];
    console.log(this.equipament)
  }

  onSubmit(){


    if (this.equipamentForm.valid)
    {
      if((this.equipament.geometry != '0')&&(this.equipament.geometry != undefined))
      {  

        const equipamentUrbanSubmit: EquipmentUrban = new EquipmentUrban(this.equipament.id);

        equipamentUrbanSubmit.co_cod = this.equipamentForm.get('eq_co_cod')?.value;
        equipamentUrbanSubmit.co_equipament = this.equipamentForm.get('eq_co_equipament')?.value;
        equipamentUrbanSubmit.co_type = this.equipamentForm.get('eq_co_type')?.value;
        equipamentUrbanSubmit.co_departament_admin = this.equipamentForm.get('eq_co_departament_admin')?.value;
        equipamentUrbanSubmit.co_name_complete = this.equipamentForm.get('eq_co_name_complete')?.value;
        equipamentUrbanSubmit.co_first_name = this.equipamentForm.get('eq_co_first_name')?.value;
        equipamentUrbanSubmit.name = this.equipamentForm.get('eq_co_name')?.value;
        equipamentUrbanSubmit.co_name_map = this.equipamentForm.get('eq_co_name_map')?.value;
        equipamentUrbanSubmit.co_street = this.equipament.co_street;
        equipamentUrbanSubmit.co_public_place = this.equipament.co_public_place;
        equipamentUrbanSubmit.co_number_building = this.equipamentForm.get('eq_co_number_building')?.value;
        equipamentUrbanSubmit.co_district = this.equipament.co_district;
        equipamentUrbanSubmit.observation = this.equipamentForm.get('eq_co_observation')?.value;
        equipamentUrbanSubmit.geometry = <Geometry>this.equipament.geometry;     

        console.log(equipamentUrbanSubmit);
        if (this.saving == true){
          this.createPublicPlace(equipamentUrbanSubmit);
        }
        else if (this.editable == true){
          console.log('Não Geomtria')
          equipamentUrbanSubmit.id = this.equipamentForm.get('eq_co_cod')?.value;
          this.alterData(equipamentUrbanSubmit);
        }
      }
      else {
        console.log('Não Geomtria')
      }
    }
    else
    {
      console.log('Não Validado')
    }

  }

  createPublicPlace(equi:EquipmentUrban):void{
    console.log('popu')
    console.log(equi)

    this.EquipamentUrbanRepository.postData(equi).subscribe({
      next: (districts : EquipmentUrban) => {
        console.log(districts);
        this.initializeForm(districts);    
        this.snackBar.open(`Equipamento Cadastrado! ID { ${districts.id} }`,'Entendido',{duration: 8 * 1000});
        //this.countyRepositoryService.populateServiceViewMap(beers)
      },
      error: (err:HttpErrorResponse) => {
        console.log('TRATAR');
        console.log(err);
        this.openSnackBar(err.statusText);
      
      },
    
    })

  }

  alterData(equipament:EquipmentUrban):void{
    console.log('popu')
    console.log(equipament)

    this.EquipamentUrbanRepository.editData(equipament).subscribe({
      next: (districts : EquipmentUrban) => {
        console.log(districts);
        this.initializeForm(districts);    
        this.snackBar.open(`Cidade Edit! ID { ${districts.id} }`,'Entendido',{duration: 8 * 1000});
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
