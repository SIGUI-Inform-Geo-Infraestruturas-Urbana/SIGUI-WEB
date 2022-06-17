import { Component, OnInit,  Output , EventEmitter} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {County} from '../../../models/county.model';
import { Feature } from 'ol';
import {RestApiService} from '../../../services/rest-api.service';
import {Polygon, MultiPolygon, Geometry} from 'ol/geom';
import GeoJSON from 'ol/format/GeoJSON';
import {StateMapService} from '../../../services/shared/state-map.service'
import { UnitFederal } from 'src/app/models/unit-federal.model';
import { DataSpatial } from 'src/app/models/data-spatial';
import { CountyRepositoryService } from 'src/app/repositorys/county-repository.service';
import { UnitFederativeRepositoryService } from 'src/app/repositorys/unit-federative-repository.service';

@Component({
  selector: 'app-manage-city',
  templateUrl: './manage-city.component.html',
  styleUrls: ['./manage-city.component.css']
})
export class ManageCityComponent implements OnInit {
  @Output() DrawMap: EventEmitter<string> = new EventEmitter();
  // public states : Feature<Geometry>[] = [];
  public states : UnitFederal[] = [];
  public city : County;
  public cityForm!: FormGroup;

  constructor(public countyRepository: CountyRepositoryService, public unitFederativeRepository : UnitFederativeRepositoryService,
     private stateMap :StateMapService){ 
    this.city = new County();

    stateMap.getFeatureSelect().subscribe(feature => {
      console.log("+++6+iniciou")    
      console.log(feature)    
      this.populateGeometry(feature);      
    })    

  }

  populateGeometry(feature:DataSpatial){ 
    console.log('+++++++++++++++++');
    console.log(feature);     
    console.log('Teste register');
    let city:County = <County>feature;   
   
    if(city.co_geometry != '0'){
      console.log('Teste register');      
      this.city.geometry = city.co_geometry;
      console.log(this.city);
    }
  }

  ngOnInit(): void {
    this.createForm(new County());
    this.getState();
    this.cityForm.get("selectDraw")?.valueChanges.subscribe(f => {this.onSelectState(f)})
  }
  createForm(city : County):void{
    this.cityForm = new FormGroup({
      nameCity : new FormControl(city.name),
      identity : new FormControl(city.id_county),
      siglaUF : new FormControl(city.initials_uf),
      codigoIBGE : new FormControl(city.id_county),
      codigoAmbiental: new FormControl(city.cod_environmental),
      nomeUGRHI: new FormControl(city.name_ugrhi),
      numeroUGRHI: new FormControl(city.number_ugrhi),
      coordenada: new FormControl(city.geometry),
      areaLimite: new FormControl(city.area_county),
      selectDraw: new FormControl(city.id_county),
    });
  }



  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log('alterado')
  //   let featureGet = changes['featureSelect'].currentValue;
  //   let geometria:Point = <Point>featureGet.getGeometry();//this.featureSelect.getGeometry()
  //   this.coordinates = geometria.getCoordinates().toString();
  //   // let x = <Point>v
  //   //this.coordinates = x.getCoordinates().toString();
  //   console.log(this.coordinates );
  // }

  onSubmit(){
    console.log("fdfdfdsfdsf")
    console.log(this.city.geometry)
    console.log("fdfdfdsfdsf")

    const citySubmit: County = new County(this.city.id_county);
    citySubmit.name = this.cityForm.get('nameCity')?.value;
    citySubmit.initials_uf = this.cityForm.get('siglaUF')?.value;
    //cod_ibge : this.cityForm.get('codigoIBGE')?.value,
    citySubmit.cod_environmental = this.cityForm.get('codigoAmbiental')?.value;
    citySubmit.name_ugrhi = this.cityForm.get('nomeUGRHI')?.value;
    citySubmit.number_ugrhi = this.cityForm.get('numeroUGRHI')?.value;
    citySubmit.area_county = this.cityForm.get('areaLimite')?.value,
    citySubmit.co_geometry = <Geometry>this.city.geometry;
    citySubmit.unit_federal = this.city.unit_federal;
        
    // const citySubmit: City = new City(this.cityForm.get('identity')?.value).deserialize({
    //   name_county : this.cityForm.get('nameCity')?.value,
    //   initials_uf : this.cityForm.get('siglaUF')?.value,
    //   cod_ibge : this.cityForm.get('codigoIBGE')?.value,
    //   cod_environmental : this.cityForm.get('codigoAmbiental')?.value,
    //   name_ugrhi : this.cityForm.get('nomeUGRHI')?.value,
    //   number_ugrhi : this.cityForm.get('numeroUGRHI')?.value,
    //   area_county : this.cityForm.get('areaLimite')?.value,
    //   id_state :  this.city.id_state,
    //   geometry : this.city.geometry
    // })
    console.log(citySubmit);
    this.createDistrict(citySubmit);
  }
  
  onSelectState(value:number):void{
    console.log('dsadsad')
    this.city.unit_federal =this.states[value-1];
  }  

  onDrawChanged():void{
    console.log('dsadsad')
    let itemSelected:string = 'Polygon'
    console.log(itemSelected)
    this.DrawMap.emit(itemSelected);
  } 
  onDrawReset():void{
    console.log('dsadsad')
    let itemSelected:string = 'None'
    console.log(itemSelected)
    this.DrawMap.emit(itemSelected);
  } 

  createDistrict(city:County):void{
    console.log('popu')
    console.log(city)
    let a = this.countyRepository.createData(city);

    // this.countyRepository.(city).subscribe((data : {}) => {
    //   console.log('populate')
    //   console.log(data)
    // })
  }

  getState():void{
    let a = {};
    this.unitFederativeRepository.findFetch().subscribe((data : UnitFederal[])=>{
      console.log('45645456454564654654654')
      console.log(data[0])
      this.states = data;
    })
    // this.restApi.getState().subscribe((data:string) => {
    //   console.log('populateState+++++++')
    //   console.log(data)
    //   let statesList = new GeoJSON({featureProjection: 'EPSG:3857' })
    //         .readFeatures(JSON.stringify(data))
    //   //console.log('populateState')
    //   //console.log(this.states[0].getProperties())
    //   for (let stateObject of statesList) {
    //     let stateNew = new UnitFederal(stateObject.getId()).deserialize(stateObject.getProperties())
    //     this.states.push(stateNew);
    //   }
    //   //console.log(stateNew)
    // })
   
  }


  // getGeoJsonMunicipios():void{
  //   let a = {};
  //   this.countyRepository.getMunicipios().subscribe((data : {}) => {
  //     console.log('populate')
  //     a = data  
  //   })
  //   console.log(a)
  // }

}
