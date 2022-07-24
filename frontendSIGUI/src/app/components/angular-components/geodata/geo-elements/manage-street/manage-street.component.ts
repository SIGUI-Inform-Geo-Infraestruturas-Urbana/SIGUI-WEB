import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Geometry } from 'ol/geom';
import { DataSpatial } from 'src/app/models/data-spatial';
import { District } from 'src/app/models/district.model';
import { Street } from 'src/app/models/street.model';
import { DistrictRepositoryService } from 'src/app/repositorys/district-repository.service';
import { StreetRepositoryService } from 'src/app/repositorys/street-repository.service';
import { StateMapService } from 'src/app/services/shared/state-map.service';
import { MatSnackBar} from '@angular/material/snack-bar'
import { HttpErrorResponse } from '@angular/common/http';
import { StreetManipulation } from 'src/app/services/street/street-manipulation/street-manipulation.service';

@Component({
  selector: 'app-manage-street',
  templateUrl: './manage-street.component.html',
  styleUrls: ['./manage-street.component.scss']
})
export class ManageStreetComponent implements OnInit {

  public districts : District[] = [];
  public street : Street;
  public streetForm!: FormGroup;
  public editable : boolean = false;
  public saving : boolean = true;

  constructor(public streetRepository: StreetRepositoryService,
    public districtRepository : DistrictRepositoryService, 
    private streetManipulation :StreetManipulation,
    private stateMap :StateMapService, private snackbar : MatSnackBar) {
      this.street = new Street();
      this.createForm(new Street(0));
      streetManipulation.getStreetManipulation().subscribe(feature => {
        console.log("+++6+iniciou")    
        console.log(feature)    
        this.initializeForm(feature);      
        //this.populateGeometry(feature);      
      })
  }

  initializeForm(equipam:Street ){//feature:DataSpatial
    //let city:County = <County>feature;   
    if ((equipam.id != undefined)&&(equipam.id != 0)){
      console.log(equipam.id)
      console.log('Valor já existe')
      console.log(equipam)
      this.updateForm(equipam);
      this.street = equipam;    
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

  updateForm(street : Street){
    console.log('updateForm')
    console.log(street)
    
    this.streetForm.patchValue({

      nameStreet : street.name_street,
      nameStreetPre : street.name_street_pre,
      idStreet : street.id,      
      codKey: street.cod_key,
      typeStreet: street.type_street,
      typeLegislation: street.type_legislation,
      selectDistrictE: street.district_e,
      selectDistrictD: street.district_d,
      zipCodeE: street.zip_code_e,
      zipCodeD: street.zip_code_d,
      selectDistrict: street.district,//geometry//geometry      
      geometry : street.st_geometry,//geometry//geometry       
      
    })
  }

  ngOnInit(): void {
    this.getDistrict();
    this.streetForm.get("selectDistrictE")?.valueChanges.subscribe(f => {this.onSelectDistrictE(f)})
    this.streetForm.get("selectDistrictD")?.valueChanges.subscribe(f => {this.onSelectDistrictD(f)})
    this.streetForm.get("selectDistrict")?.valueChanges.subscribe(f => {this.onSelectDistrict(f)})
  } 

  createForm(street : Street):void{
    this.streetForm = new FormGroup({
      nameStreet : new FormControl(street.name_street, [Validators.required]),
      nameStreetPre : new FormControl(street.name_street_pre, [Validators.required]),
      idStreet : new FormControl({value :  street.id, disabled : true}),      
      codKey: new FormControl(street.cod_key, [Validators.required]),
      typeStreet: new FormControl(street.type_street,[Validators.required]),
      typeLegislation: new FormControl(street.type_legislation,[Validators.required]),
      selectDistrictE: new FormControl(1),//street.district_e
      selectDistrictD: new FormControl(1),//street.district_d
      zipCodeE: new FormControl(street.zip_code_e,[Validators.required]),
      zipCodeD: new FormControl(street.zip_code_d,[Validators.required]),
      selectDistrict: new FormControl(street.district,[Validators.required]),//geometry//geometry      
      geometry: new FormControl(street.st_geometry),//geometry//geometry
    });
  }

  onSubmit(){
    if (this.streetForm.valid)
    {
      if((this.street.geometry != '0')&&(this.street.geometry != undefined)){  
    
          const streetSubmit: Street = new Street(this.street.id_street);
          streetSubmit.name_street = this.streetForm.get('nameStreet')?.value;
          streetSubmit.name_street_pre = this.streetForm.get('nameStreetPre')?.value;
          streetSubmit.cod_key = this.streetForm.get('codKey')?.value;
          streetSubmit.type_street = this.streetForm.get('typeStreet')?.value;
          streetSubmit.type_legislation = this.streetForm.get('typeLegislation')?.value;
          streetSubmit.district = this.street.district
          streetSubmit.district_e = this.street.district_e
          streetSubmit.district_d = this.street.district_d
          streetSubmit.zip_code_e = this.streetForm.get('zipCodeE')?.value;
          streetSubmit.zip_code_d = this.streetForm.get('zipCodeD')?.value;
          streetSubmit.st_geometry = <Geometry>this.street.geometry;   
          
          console.log(streetSubmit);
          if (this.saving == true){
            this.createDistrict(streetSubmit);
          }
          else if (this.editable == true){
            console.log('Não Geomtria')
            streetSubmit.id = this.streetForm.get('eq_co_cod')?.value;
            this.alterData(streetSubmit);
          }
      }
      else{
        this.snackbar.open('Geometria ou Infraestrutura Ocupada, não informada!','Fechar',{duration: 5 * 1000});     
      }
      
    }
    else
    {
      this.snackbar.open('Parametros Incorretos!','Fechar',{duration: 5 * 1000});     

    }
  }

  createDistrict(equi:Street):void{
    console.log('popu')
    console.log(equi)

    this.streetRepository.postData(equi).subscribe({
      next: (districts : Street) => {
        console.log(districts);
        this.initializeForm(districts);    
        this.snackbar.open(`Rua Cadastrado! ID { ${districts.id} }`,'Entendido',{duration: 8 * 1000});
        //this.countyRepositoryService.populateServiceViewMap(beers)
      },
      error: (err:HttpErrorResponse) => {
        console.log('TRATAR');
        console.log(err);
        this.openSnackBar(err.statusText);
      
      },
    
    })

  }

  alterData(equipament:Street):void{
    console.log('popu')
    console.log(equipament)

    this.streetRepository.editData(equipament).subscribe({
      next: (districts : Street) => {
        console.log(districts);
        this.initializeForm(districts);    
        this.snackbar.open(`Logradouro Edit! ID { ${districts.id} }`,'Entendido',{duration: 8 * 1000});
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
    this.snackbar.open(mensagem, 'Entendido!', {
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  populateGeometry(feature:DataSpatial){ 
    console.log('+++++++++++++++++');
    console.log(feature);     
    console.log('Teste register');
    let street:Street = <Street>feature;   
   
    if(street.st_geometry != '0'){
      console.log('Teste register');      
      this.street.geometry = street.st_geometry;
      console.log(this.street);
    }
  }

  onSelectDistrictE(value:number){
    console.log('select')
    console.log(value)
    this.street.district_e = <string> this.districts.find( a => a.id == value)?.name
    //this.district.county =this.cities[value-1];
    console.log(this.street.district_e)
  }
  onSelectDistrictD(value:number){
    console.log('select')
    console.log(value)
    this.street.district_d = <string> this.districts.find( a => a.id == value)?.name
    //this.district.county =this.cities[value-1];
    console.log(this.street.district_e)
  }
  onSelectDistrict(value:number){
    console.log('select')
    console.log(value)
    this.street.district = <number> this.districts.find( a => a.id == value)?.id
    //this.district.county =this.cities[value-1];
    console.log(this.street.district_e)
  }
}
