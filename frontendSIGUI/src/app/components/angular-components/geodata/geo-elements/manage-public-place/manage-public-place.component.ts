import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Geometry } from 'ol/geom';
import { DataSpatial } from 'src/app/models/data-spatial';
import { District } from 'src/app/models/district.model';
import { PublicPlace } from 'src/app/models/public-place.model';
import { Street } from 'src/app/models/street.model';
import { DistrictRepositoryService } from 'src/app/repositorys/district-repository.service';
import { PublicPlaceRepositoryService } from 'src/app/repositorys/public-place-repository.service';
import { StreetRepositoryService } from 'src/app/repositorys/street-repository.service';
import { StateMapService } from 'src/app/services/shared/state-map.service';
import { MatSnackBar} from '@angular/material/snack-bar'
import { HttpErrorResponse } from '@angular/common/http';
import { PublicPlaceManipulation } from 'src/app/services/public-place/public-place-manager/public-place-manipulation.service';

@Component({
  selector: 'app-manage-public-place',
  templateUrl: './manage-public-place.component.html',
  styleUrls: ['./manage-public-place.component.scss']
})
export class ManagePublicPlaceComponent implements OnInit {

  public districts : District[] = [];
  public streets : Street[] = [];
  public publicPlace : PublicPlace;
  public ppForm!: FormGroup;
  public editable : boolean = false;
  public saving : boolean = true;

  constructor(public publicplaceRepository: PublicPlaceRepositoryService,public districtRepository : DistrictRepositoryService, 
    public streetRepositoryService : StreetRepositoryService,
    private publicPlaceManipulation :PublicPlaceManipulation, private stateMap :StateMapService, 
    private snakeBar : MatSnackBar) {
      this.publicPlace = new PublicPlace();
      this.createForm(new PublicPlace(0));
      publicPlaceManipulation.getPublicPlaceManipulation().subscribe(feature => {
        console.log("+++6+iniciou")    
        console.log(feature)    
        this.initializeForm(feature);      
        //this.populateGeometry(feature);      
      })
  }

  ngOnInit(): void {
   
    this.getDistrict();
    this.getStreet();
    // this.ppForm.get("selectDistrictE")?.valueChanges.subscribe(f => {this.onSelectDistrictE(f)})
    // this.ppForm.get("selectDistrictD")?.valueChanges.subscribe(f => {this.onSelectDistrictD(f)})
    this.ppForm.get("pp_district")?.valueChanges.subscribe(f => {this.onSelectDistrict(f)})
    this.ppForm.get("pp_streat")?.valueChanges.subscribe(f => {this.onSelectStreet(f)})
  } 

  initializeForm(equipam:PublicPlace ){//feature:DataSpatial
    //let city:County = <County>feature;   
    if ((equipam.id != undefined)&&(equipam.id != 0)){
      console.log(equipam.id)
      console.log('Valor já existe')
      console.log(equipam)
      this.updateForm(equipam);
      this.publicPlace = equipam;    
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

  updateForm(publicPlace : PublicPlace){
    console.log('updateForm')
    console.log(publicPlace)
    
    this.ppForm.patchValue({

      pp_public_place : publicPlace.id_public_place,
      pp_cod_sector : publicPlace.cod_sector,
      pp_cod_block : publicPlace.cod_block,
      pp_cod_face : publicPlace.cod_face,      
      pp_total_residences: publicPlace.total_residences,
      pp_total_general: publicPlace.total_general,
      pp_district: publicPlace.district,
      pp_streat: publicPlace.streat,
      geometry: publicPlace.geometry,        
      
    })
  }

  createForm(pp_cod_face : PublicPlace):void{

    
    this.ppForm = new FormGroup({
      pp_public_place : new FormControl({value : pp_cod_face.id_public_place, disabled : true}),
      pp_cod_sector : new FormControl(pp_cod_face.cod_sector, [Validators.required]),
      pp_cod_block : new FormControl(pp_cod_face.cod_block,[Validators.required]),
      pp_cod_face : new FormControl(pp_cod_face.cod_face,[Validators.required]),      
      pp_total_residences: new FormControl(pp_cod_face.total_residences),
      pp_total_general: new FormControl(pp_cod_face.total_general),
      pp_district: new FormControl(pp_cod_face.district,[Validators.required]),
      pp_streat: new FormControl(pp_cod_face.streat,[Validators.required]),
      geometry: new FormControl(pp_cod_face.geometry),
     });
  }

  onSubmit(){
   
    if (this.ppForm.valid)
    {
      if((this.publicPlace.geometry != '0')&&(this.publicPlace.geometry != undefined))
      {  
        const streetSubmit: PublicPlace = new PublicPlace(this.publicPlace.id_public_place);
        streetSubmit.cod_sector = this.ppForm.get('pp_cod_sector')?.value;
        streetSubmit.cod_block = this.ppForm.get('pp_cod_block')?.value;
        streetSubmit.cod_face = this.ppForm.get('pp_cod_face')?.value;
        streetSubmit.total_residences = this.ppForm.get('pp_total_residences')?.value;
        streetSubmit.total_general = this.ppForm.get('pp_total_general')?.value;
        streetSubmit.district = this.publicPlace.district
        streetSubmit.streat = this.publicPlace.streat
        streetSubmit.pp_geometry = <Geometry>this.publicPlace.geometry;   

        console.log(streetSubmit);
        if (this.saving == true){
          this.createPublicPlace(streetSubmit);
        }
        else if (this.editable == true){
          console.log('Não Geomtria')
          streetSubmit.id = this.ppForm.get('eq_co_cod')?.value;
          this.alterData(streetSubmit);
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

  createPublicPlace(equi:PublicPlace):void{
    console.log('popu')
    console.log(equi)

    this.publicplaceRepository.postData(equi).subscribe({
      next: (districts : PublicPlace) => {
        console.log(districts);
        this.initializeForm(districts);    
        this.snakeBar.open(`Logradouro Cadastrado! ID { ${districts.id} }`,'Entendido',{duration: 8 * 1000});
        //this.countyRepositoryService.populateServiceViewMap(beers)
      },
      error: (err:HttpErrorResponse) => {
        console.log('TRATAR');
        console.log(err);
        this.openSnackBar(err.statusText);
      
      },
    
    })

  }

  alterData(equipament:PublicPlace):void{
    console.log('popu')
    console.log(equipament)

    this.publicplaceRepository.editData(equipament).subscribe({
      next: (districts : PublicPlace) => {
        console.log(districts);
        this.initializeForm(districts);    
        this.snakeBar.open(`Logradouro Edit! ID { ${districts.id} }`,'Entendido',{duration: 8 * 1000});
        //this.countyRepositoryService.populateServiceViewMap(beers)
      },
      error: (err:HttpErrorResponse) => {
        console.log('TRATAR');
        console.log(err);
        this.openSnackBar(err.statusText);      
      },
    
    })
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

  openSnackBar(mensagem : string) {
    this.snakeBar.open(mensagem, 'Entendido!', {
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  getStreet(){
    this.streetRepositoryService.findFetch().subscribe((data : Street[])=>{
      console.log('STREET')
      console.log(data[0])
      this.streets = data;
    })
  }

  populateGeometry(feature:DataSpatial){ 
    console.log('+++++++++++++++++');
    console.log(feature);     
    console.log('Teste register');
    let street:PublicPlace = <PublicPlace>feature;   
   
    if(street.pp_geometry != '0'){
      console.log('Teste register');      
      this.publicPlace.geometry = street.pp_geometry;
      console.log(this.publicPlace);
    }
  }

  // onSelectDistrictE(value:number){
  //   console.log('select')
  //   console.log(value)
  //   this.publicPlace.district_e = <string> this.districts.find( a => a.id == value)?.name
  //   //this.district.county =this.cities[value-1];
  //   console.log(this.publicPlace.district_e)
  // }
  // onSelectDistrictD(value:number){
  //   console.log('select')
  //   console.log(value)
  //   this.publicPlace.district_d = <string> this.districts.find( a => a.id == value)?.name
  //   //this.district.county =this.cities[value-1];
  //   console.log(this.publicPlace.district_e)
  // }
  onSelectDistrict(value:number){
    console.log('select')
    console.log(value)
    this.publicPlace.district = <number> this.districts.find( a => a.id == value)?.id
    //this.district.county =this.cities[value-1];
    console.log(this.publicPlace.district)
  }
  onSelectStreet(value:number){
    console.log('select')
    console.log(value)
    this.publicPlace.streat = <number> this.streets.find( a => a.id == value)?.id
    //this.district.county =this.cities[value-1];
    console.log(this.publicPlace.district)
  }
}
