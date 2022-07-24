import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup ,Validators} from '@angular/forms';
import { getArea } from 'ol/sphere';
import { Geometry, Point, Polygon } from 'ol/geom';
import { DataSpatial } from 'src/app/models/data-spatial';
import { Infrastructure } from 'src/app/models/infrastructure.model';
import { Street } from 'src/app/models/street.model';
import { Subsystem } from 'src/app/models/subsystem.model';
import { InfrastructureRepositoryService } from 'src/app/repositorys/infrastructure-repository.service';
import { StreetRepositoryService } from 'src/app/repositorys/street-repository.service';
import { SubsystemRepositoryService } from 'src/app/repositorys/subsystem-repository.service';
import { StateMapService } from 'src/app/services/shared/state-map.service';
import { Coordinate, toStringHDMS } from 'ol/coordinate';
import { toLonLat } from 'ol/proj';
import { MatSnackBar} from '@angular/material/snack-bar'
import { HttpErrorResponse } from '@angular/common/http';
import { InfrastructureManipulation } from 'src/app/services/infrastructure/infrastructure-manager/Infrastruture-manipulation.service';

@Component({
  selector: 'app-manage-infrastructure',
  templateUrl: './manage-infrastructure.component.html',
  styleUrls: ['./manage-infrastructure.component.scss']
})
export class ManageInfrastructureComponent implements OnInit {

  public infrastructures : Infrastructure[] = [];
  public streets : Street[] = [];  
  public subsystems : Subsystem[] = [];
  public infrastructureAssociation!: Infrastructure; 
  public infrastructure : Infrastructure;
  public infrastrutureForm!: FormGroup;
  public enableAssociation: boolean = false;
  public editable : boolean = false;
  public saving : boolean = true;

  constructor( public infrastructureRepository : InfrastructureRepositoryService,
    public subsystemRepositoryService : SubsystemRepositoryService, 
    private infrastructureManipulation :InfrastructureManipulation,   
    public streetRepository: StreetRepositoryService , 
    private stateMap :StateMapService, private snakeBar : MatSnackBar) {
    this.infrastructure = new Infrastructure(0);
    this.createForm(new Infrastructure(0));
    infrastructureManipulation.getInfrastructureManipulation().subscribe(feature => {
      console.log("+++6+iniciou")    
      console.log(feature)    
      this.initializeForm(feature);      
      //this.populateGeometry(feature);      
    })
  }

  ngOnInit(): void {    
    this.getSubsystem();
    this.getInfraestructure();
    this.getStreet();
    this.infrastrutureForm.get("selectOcupante")?.valueChanges.subscribe(f => {this.onSelectOcupante(f)})
    this.infrastrutureForm.get("selectSubsystem")?.valueChanges.subscribe(f => {this.onSelectsubsystem(f)})  
    this.infrastrutureForm.get("selectStreet")?.valueChanges.subscribe(f => {this.onSelectstreet(f)})  
  }

  initializeForm(feature:DataSpatial ){
    let infrastructure:Infrastructure = <Infrastructure>feature;   
    if ((infrastructure.id_infra != undefined)&&(infrastructure.id_infra != 0)){
      console.log(infrastructure.id_infra)
      console.log('Valor já existe')
      console.log(infrastructure)
      this.updateForm(infrastructure);
      this.infrastructure = infrastructure;
      this.infrastructureAssociation = infrastructure;
      this.enableAssociation = true;
    }
    else
    {
      console.log('Definir nova variavel')
      this.populateGeometry(infrastructure);

      this.updateForm(infrastructure);       
    }

  }

  createForm(infrastructure : Infrastructure):void{
    this.infrastrutureForm = new FormGroup({
      idInfrastructure : new FormControl({value : infrastructure.id,disabled : true}),
      infraName: new FormControl(infrastructure.name, [Validators.required]),    
      infraCategory : new FormControl(infrastructure.category,[Validators.required]),
      selectOcupante : new FormControl(infrastructure.dependent),      
      selectSubsystem: new FormControl(infrastructure.subsystems,[Validators.required]),         
      selectStreet: new FormControl(infrastructure.subsystems),   
      geometry: new FormControl(0),   
    });    
  }
  updateForm(infrastructure : Infrastructure){
    this.infrastrutureForm.patchValue({
      idInfrastructure : infrastructure.id,
      infraName: infrastructure.name,    
      infraCategory : infrastructure.category,
     // selectOcupante : 0,      
    //  selectSubsystem: 0, 
     // selectStreet: 0,
      geometry : this.generateCoordinate(infrastructure)
    })
  }

  populateGeometry(infrastructure:Infrastructure){
    console.log('+++++++++++++++++');   
    console.log('Teste register'); 
   
    if(infrastructure.infra_geometry != '0'){
      console.log('Teste register');      
      this.infrastructure.geometry = infrastructure.infra_geometry;
      console.log(this.infrastructure);
    }
  }


  generateCoordinate(unit:Infrastructure):string{
      if((unit.geometry != '0')&&(unit.geometry != null)){  
        let geom = <Point>unit.geometry;
        let coordinatePoint:Coordinate= <Coordinate>geom.getCoordinates();
        console.log('Coord')
        console.log(coordinatePoint)         
        return toStringHDMS(toLonLat(coordinatePoint));
      }
      else{
        return ''
      }
    } 

  getSubsystem(){
    this.subsystemRepositoryService.findFetch() //.pipe(catchError(()=> { return throwError (() => new Error ("Teste de Tratamento")); }))    
    .subscribe({
      next: (data : Subsystem[]) => {
        console.log('getcounty')
        console.log(data);
        this.subsystems = data;
      },
      error: (err:HttpErrorResponse) => {
        console.log('TRATAR');
        console.log(err);
        this.openSnackBar(err.statusText);
        //this._counties.error(err);
      },
    });
  }

  getInfraestructure(){

    this.infrastructureRepository.findFetch() //.pipe(catchError(()=> { return throwError (() => new Error ("Teste de Tratamento")); }))    
    .subscribe({
      next: (data : Infrastructure[]) => {
        console.log('getcounty')
        console.log(data);
        this.infrastructures = data;
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

  openSnackBar(mensagem : string) {
    this.snakeBar.open(mensagem, 'Entendido!', {
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  onSelectOcupante(value:number){
    console.log('select')
    console.log(value)
    this.infrastructure.dependent = <number> this.infrastructures.find( a => a.id == value)?.id
    //this.district.county =this.cities[value-1];
    console.log(this.infrastructure.dependent)
  }
  onSelectsubsystem(value:number){
    console.log('select')
    console.log(value)
    this.infrastructure.subsystems = <number> this.subsystems.find( a => a.id == value)?.id
    //this.district.county =this.cities[value-1];
    console.log(this.infrastructure.subsystems)
  }
  onSelectstreet(value:number){
    console.log('select')
    console.log(value)
    this.infrastructure.street= <number> this.streets.find( a => a.id == value)?.id
    //this.district.county =this.cities[value-1];
    console.log(this.infrastructure.street)
  }

  onSubmit(){
    if (this.infrastrutureForm.valid)
      {
        if((this.infrastructure.geometry != '0')&&(this.infrastructure.geometry != undefined)){  
      
          const infraSubmit: Infrastructure = new Infrastructure(this.infrastructure.id_infra);
          infraSubmit.name = this.infrastrutureForm.get('infraName')?.value;
          infraSubmit.category = this.infrastrutureForm.get('infraCategory')?.value;
          infraSubmit.dependent = null//this.infrastructure.dependent != undefined ? this.infrastructure.dependent : null;
          infraSubmit.subsystems = this.infrastructure.subsystems;
          infraSubmit.street = this.infrastructure.street;
          infraSubmit.infra_geometry = <Geometry>this.infrastructure.geometry;       
          console.log('sdaa');
          console.log(infraSubmit.subsystems);          
        
          if (this.saving == true){
            this.createDistrict(infraSubmit);
          }
          else if (this.editable == true){
            console.log('Não Geomtria')
            infraSubmit.id = this.infrastrutureForm.get('eq_co_cod')?.value;
            this.alterData(infraSubmit);
          }
        }
        else if((this.infrastructure.dependent != undefined)){  
    
          console.log('passoy')
          const infraSubmit: Infrastructure = new Infrastructure(this.infrastructure.id_infra);
          infraSubmit.name = this.infrastrutureForm.get('infraName')?.value;
          infraSubmit.category = this.infrastrutureForm.get('infraCategory')?.value;
          infraSubmit.dependent = this.infrastructure.dependent != undefined ? this.infrastructure.dependent : null;
          infraSubmit.subsystems = this.infrastructure.subsystems;
          infraSubmit.street = this.infrastructure.street;
          infraSubmit.infra_geometry = '0'
          console.log('sdaa');
          console.log(infraSubmit.subsystems);
          this.createDistrict(infraSubmit);
        }
        else{
          this.snakeBar.open('Geometria ou Infraestrutura Ocupada, não informada!','Fechar',{duration: 5 * 1000});     
        }
        
      }
      else
      {
        this.snakeBar.open('Parametros Incorretos!','Fechar',{duration: 5 * 1000});     

      }
  } 
  

  createDistrict(infrastructure:Infrastructure):void{
   
    console.log('popu')
    console.log(infrastructure)
    this.infrastructureRepository.createData(infrastructure)
      .then((value:Infrastructure) => {
        console.log(value)
        this.initializeForm(value);
        this.enableAssociation = true;
        this.snakeBar.open(`Infraestrutura Cadastrada! ID { ${value.id} }`,'Entendido',{duration: 8 * 1000});
      })
        
  }

  createPublicPlace(equi:Infrastructure):void{
    console.log('popu')
    console.log(equi)

    this.infrastructureRepository.postData(equi).subscribe({
      next: (districts : Infrastructure) => {
        console.log(districts);
        this.initializeForm(districts);    
        this.snakeBar.open(`Equipamento Cadastrado! ID { ${districts.id} }`,'Entendido',{duration: 8 * 1000});
        //this.countyRepositoryService.populateServiceViewMap(beers)
      },
      error: (err:HttpErrorResponse) => {
        console.log('TRATAR');
        console.log(err);
        this.openSnackBar(err.statusText);
      
      },
    
    })

  }

  alterData(equipament:Infrastructure):void{
    console.log('popu')
    console.log(equipament)

    this.infrastructureRepository.editData(equipament).subscribe({
      next: (districts : Infrastructure) => {
        console.log(districts);
        this.initializeForm(districts);    
        this.snakeBar.open(`Infrastructure Edit! ID { ${districts.id} }`,'Entendido',{duration: 8 * 1000});
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

