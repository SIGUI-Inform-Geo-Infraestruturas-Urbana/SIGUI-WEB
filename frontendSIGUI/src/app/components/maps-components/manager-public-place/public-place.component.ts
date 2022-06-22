import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

@Component({
  selector: 'app-public-place',
  templateUrl: './public-place.component.html',
  styleUrls: ['./public-place.component.css']
})
export class PublicPlaceComponent implements OnInit {

  public districts : District[] = [];
  public streets : Street[] = [];
  public publicPlace : PublicPlace;
  public ppForm!: FormGroup;

  constructor(public publicplaceRepository: PublicPlaceRepositoryService,public districtRepository : DistrictRepositoryService, 
    public streetRepositoryService : StreetRepositoryService, private stateMap :StateMapService, 
    private snackBar : MatSnackBar) {
      this.publicPlace = new PublicPlace();
      stateMap.getFeatureSelect().subscribe(feature => {
        console.log("+++6+iniciou")    
        console.log(feature)    
        this.populateGeometry(feature);      
      })
  }

  ngOnInit(): void {
    this.createForm(new PublicPlace());
    this.getDistrict();
    this.getStreet();
    // this.ppForm.get("selectDistrictE")?.valueChanges.subscribe(f => {this.onSelectDistrictE(f)})
    // this.ppForm.get("selectDistrictD")?.valueChanges.subscribe(f => {this.onSelectDistrictD(f)})
    this.ppForm.get("pp_district")?.valueChanges.subscribe(f => {this.onSelectDistrict(f)})
    this.ppForm.get("pp_streat")?.valueChanges.subscribe(f => {this.onSelectStreet(f)})
  } 

  createForm(pp_cod_face : PublicPlace):void{

    
    this.ppForm = new FormGroup({
      pp_public_place : new FormControl(this.publicPlace.id_public_place),
      pp_cod_sector : new FormControl(this.publicPlace.cod_sector),
      pp_cod_block : new FormControl(this.publicPlace.cod_block),
      pp_cod_face : new FormControl(this.publicPlace.cod_face),      
      pp_total_residences: new FormControl(this.publicPlace.total_residences),
      pp_total_general: new FormControl(pp_cod_face.total_general),
      pp_district: new FormControl(pp_cod_face.district),
      pp_streat: new FormControl(pp_cod_face.streat),
      geometry: new FormControl(pp_cod_face.geometry),
     });
  }

  onSubmit(){

    /*    this.ppForm = new FormGroup({
      pp_cod_sector : new FormControl(this.publicPlace.cod_sector),
      pp_cod_block : new FormControl(this.publicPlace.cod_block),
      pp_cod_face : new FormControl(this.publicPlace.cod_face),      
      pp_total_residences: new FormControl(this.publicPlace.total_residences),
      pp_total_general: new FormControl(pp_cod_face.total_general),
      pp_district: new FormControl(pp_cod_face.district),
      pp_streat: new FormControl(pp_cod_face.streat),
     }); */
   
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
    this.createPublicPlace(streetSubmit);
  }

  createPublicPlace(street:PublicPlace):void{
    console.log('popu')
    console.log(street)
    this.publicplaceRepository.createData(street)
    .then((value:PublicPlace) => {
      console.log(value)
      this.snackBar.open(`Logradouro Cadastrada! ID { ${value.id} }`,'Entendido',{duration: 8 * 1000});
    })
  }

  getDistrict(){
    this.districtRepository.findFetch().subscribe((data : District[])=>{
      console.log('DISTRICT')
      console.log(data[0])
      this.districts = data;
    })
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
    this.publicPlace.district = <District> this.districts.find( a => a.id == value)
    //this.district.county =this.cities[value-1];
    console.log(this.publicPlace.district)
  }
  onSelectStreet(value:number){
    console.log('select')
    console.log(value)
    this.publicPlace.streat = <Street> this.streets.find( a => a.id == value)
    //this.district.county =this.cities[value-1];
    console.log(this.publicPlace.district)
  }
}
