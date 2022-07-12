import { Component, OnInit,  Output , EventEmitter} from '@angular/core';
import { FormGroup, FormControl ,Validators} from '@angular/forms';
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
import { getArea } from 'ol/sphere';
import { MatSnackBar} from '@angular/material/snack-bar'
import { CountyManipulationService } from 'src/app/services/count/county-manager/county-manipulation.service';

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
    private countyVizualization :CountyManipulationService, private snackBar : MatSnackBar){ 
    this.city = new County();
    //private countyVizualization :CountyManipulationService
    //private stateMap :StateMapService
    this.createForm(new County(0));
    countyVizualization.getCountyManipulation().subscribe(feature => {
      console.log(feature)    
      this.initializeForm(feature);       
    }) 
  }

  initializeForm(feature:County ){
    let city:County = <County>feature;   
    if ((city.id_county != undefined)&&(city.id_county != 0)){
      console.log(city.id_county)
      console.log('Valor já existe')
      console.log(city)
      this.updateForm(city);
      this.city = city;    
    }
    else
    {
      console.log('Definir nova variavel')
      this.populateGeometry(city); 
      this.updateForm(city);       
    }
  }

  updateForm(city : County){
    this.cityForm.patchValue({
      nameCity : city.name,
      identity :city.id_county,
      siglaUF : city.initials_uf,
      codigoIBGE : city.ibge,
      codigoAmbiental: city.cod_environmental,
      nomeUGRHI: city.name_ugrhi,
      numeroUGRHI: city.number_ugrhi,
      // coordenada: city.geometry,
      areaLimite:  this.generateArea(city),
     // selectDraw: city.id_county,

    })
  }

  generateArea(city:County):number{  
    if(city.geometry != '0'){  
      const area = getArea(<Polygon>city.geometry);
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
    //this.createForm(new County());
    this.getState();
    this.cityForm.get("selectDraw")?.valueChanges.subscribe(f => {this.onSelectState(f)})
  }
  createForm(city : County):void{
    this.cityForm = new FormGroup({
      nameCity : new FormControl(city.name,[Validators.required]),
      identity : new FormControl(city.id_county),
      siglaUF : new FormControl(city.initials_uf,[Validators.required]),
      codigoIBGE : new FormControl(city.ibge,[Validators.required]),
      codigoAmbiental: new FormControl(city.cod_environmental,[Validators.required]),
      nomeUGRHI: new FormControl(city.name_ugrhi,[Validators.required]),
      numeroUGRHI: new FormControl(city.number_ugrhi,[Validators.required]),
      // coordenada: new FormControl(city.geometry),
      areaLimite: new FormControl(city.area_county),
      selectDraw: new FormControl(0,[Validators.required]),
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

    if (this.cityForm.valid)
    {
      if((this.city.geometry != '0')&&(this.city.geometry != undefined)){  
     
      console.log("fdfdfdsfdsf")
      console.log(this.city.geometry)
      console.log("fdfdfdsfdsf")

      const citySubmit: County = new County(this.city.id_county);
      citySubmit.name = this.cityForm.get('nameCity')?.value;
      citySubmit.initials_uf = this.cityForm.get('siglaUF')?.value;
      citySubmit.ibge = this.cityForm.get('codigoIBGE')?.value,
      citySubmit.cod_environmental = this.cityForm.get('codigoAmbiental')?.value;
      citySubmit.name_ugrhi = this.cityForm.get('nomeUGRHI')?.value;
      citySubmit.number_ugrhi = this.cityForm.get('numeroUGRHI')?.value;
      citySubmit.area_county = this.cityForm.get('areaLimite')?.value,
      citySubmit.co_geometry = <Geometry>this.city.geometry;
      citySubmit.unit_federal = this.city.unit_federal;        
      
      console.log('citySubmit');
      console.log(citySubmit);
      this.createDistrict(citySubmit);
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
  
  onSelectState(value:number):void{
    console.log('dsadsad')
    this.city.unit_federal =<number> this.states.find( a => a.id == value)?.id
    console.log(this.city.unit_federal)
    //this.city.unit_federal =this.states[value-1];
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
    let a = this.countyRepository.createData(city)
      .then((value:County) => {
        console.log(value)
        this.initializeForm(value);      
        this.snackBar.open(`Cidade Cadastrada! ID { ${value.id} }`,'Entendido',{duration: 8 * 1000});
      })
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
