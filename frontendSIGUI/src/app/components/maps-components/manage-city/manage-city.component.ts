import { Component, OnInit,  Output , EventEmitter} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {City} from '../../../models/city.model';
import { Feature } from 'ol';
import {RestApiService} from '../../../services/rest-api.service';
import {Polygon, MultiPolygon} from 'ol/geom';
import GeoJSON from 'ol/format/GeoJSON';
import {StateMapService} from '../../../services/shared/state-map.service'
import { StateEntity } from 'src/app/models/state.model';

@Component({
  selector: 'app-manage-city',
  templateUrl: './manage-city.component.html',
  styleUrls: ['./manage-city.component.css']
})
export class ManageCityComponent implements OnInit {
  @Output() DrawMap: EventEmitter<string> = new EventEmitter();
  // public states : Feature<Geometry>[] = [];
  public states : StateEntity[] = [];
  public city : City;
  public cityForm!: FormGroup;

  constructor(public restApi: RestApiService, private stateMap :StateMapService){ 
    this.city = new City();

    stateMap.getFeatureSelect().subscribe(feature => {
      console.log(feature)    
      this.populateGeometry(feature);      
    })    

  }

  populateGeometry(feature:Feature){
    let MultiPolygonList = [];
    console.log('+++++++++++++++++');
    console.log(feature);     
    console.log('Teste register');
    let geometria:Polygon = <Polygon>feature.getGeometry();
    if(geometria != undefined){
      MultiPolygonList.push(geometria)
      let geometryMultPoly: MultiPolygon = new MultiPolygon(MultiPolygonList);

      var geojson_parser = new GeoJSON();
      var geometryJson = geojson_parser.writeGeometry(geometryMultPoly, {
        dataProjection: 'EPSG:4326',//'EPSG:3857'
        featureProjection: 'EPSG:3857'
      });

      this.city.geometry = geometryJson;
      console.log(this.city);
    }
  }


  ngOnInit(): void {
    this.createForm(new City());
    this.getState();
    this.cityForm.get("selectDraw")?.valueChanges.subscribe(f => {this.onSelectState(f)})
  }
  createForm(city : City):void{
    this.cityForm = new FormGroup({
      nameCity : new FormControl(city.name_county),
      identity : new FormControl(city.id_County),
      siglaUF : new FormControl(city.initials_uf),
      codigoIBGE : new FormControl(city.cod_ibge),
      codigoAmbiental: new FormControl(city.cod_environmental),
      nomeUGRHI: new FormControl(city.name_ugrhi),
      numeroUGRHI: new FormControl(city.number_ugrhi),
      coordenada: new FormControl(city.geometry),
      areaLimite: new FormControl(city.area_county),
      selectDraw: new FormControl(city.id_County),
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
    const citySubmit: City = new City({
        name_county : this.cityForm.get('nameCity')?.value,
        initials_uf : this.cityForm.get('siglaUF')?.value,
        cod_ibge : this.cityForm.get('codigoIBGE')?.value,
        cod_environmental : this.cityForm.get('codigoAmbiental')?.value,
        name_ugrhi : this.cityForm.get('nomeUGRHI')?.value,
        number_ugrhi : this.cityForm.get('numeroUGRHI')?.value,
        area_county : this.cityForm.get('areaLimite')?.value,
        id_state :  this.city.id_state,
        geometry : this.city.geometry
    })
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
    this.city.id_state =this.states[value-1];
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

  createDistrict(city:City):void{
    console.log('popu')
    console.log(city)
    this.restApi.setMunicipios(city).subscribe((data : {}) => {
      console.log('populate')
      console.log(data)
    })
  }

  getState():void{
    let a = {};
    this.restApi.getState().subscribe((data:string) => {
      console.log('populateState+++++++')
      console.log(data)
      let statesList = new GeoJSON({featureProjection: 'EPSG:3857' })
            .readFeatures(JSON.stringify(data))
      //console.log('populateState')
      //console.log(this.states[0].getProperties())
      for (let stateObject of statesList) {
        let stateNew = new StateEntity(stateObject.getId()).deserialize(stateObject.getProperties())
        this.states.push(stateNew);
      }
      //console.log(stateNew)
    })
   
  }


  getGeoJsonMunicipios():void{
    let a = {};
    this.restApi.getMunicipios().subscribe((data : {}) => {
      console.log('populate')
      a = data  
    })
    console.log(a)
  }

}
