import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { District } from '../../../models/district.model';
import { Feature } from 'ol';
import {RestApiService} from '../../../services/rest-api.service';
import {Polygon, MultiPolygon} from 'ol/geom';
import GeoJSON from 'ol/format/GeoJSON';
import {StateMapService} from '../../../services/shared/state-map.service'
import { City } from 'src/app/models/city.model';

@Component({
  selector: 'app-maneger-district',
  templateUrl: './maneger-district.component.html',
  styleUrls: ['./maneger-district.component.css']
})
export class ManegerDistrictComponent implements OnInit {

  public citys : City[] = [];
  public districtEntity! : District;
  public districtForm!: FormGroup;

  constructor(public restApi: RestApiService, private stateMap :StateMapService){ 
    this.districtEntity = new District(0);
    stateMap.getFeatureSelect().subscribe(feature => {
      console.log(feature)    
      this.populateGeometry(feature);      
    })  
  }

  ngOnInit(): void {
    this.createForm(new District(0));
    this.getState();
    this.districtForm.get("selectDraw")?.valueChanges.subscribe(f => {this.onSelectDistrict(f)})
  }

  createForm(district : District):void{
    this.districtForm = new FormGroup({
      nomeDistrict : new FormControl(district.nome_district),
      idDistrict : new FormControl(district.id_district),
      areaDistrict : new FormControl(district.area_district),
      geometry: new FormControl(district.geometry),
      selectDraw: new FormControl(district.id_County),//geometry//geometry
    });
  }

  populateGeometry(feature:Feature){
    let MultiPolygonList = [];
    let geometria:Polygon = <Polygon>feature.getGeometry();
    if(geometria != undefined){
      MultiPolygonList.push(geometria)
      let geometryMultPoly: MultiPolygon = new MultiPolygon(MultiPolygonList);

      var geojson_parser = new GeoJSON();
      var geometryJson = geojson_parser.writeGeometry(geometryMultPoly);

      this.districtEntity.geometry = geometryJson;
      console.log(this.districtEntity);
    }
  }

  getState():void{
    let a = {};
    this.restApi.getMunicipios().subscribe((data:string) => {
      console.log('populateState+++++++')
      console.log(data)
      let statesList = new GeoJSON({featureProjection: 'EPSG:3857' })
            .readFeatures(JSON.stringify(data))
      //console.log('populateState')
      //console.log(this.states[0].getProperties())
      for (let stateObject of statesList) {
        //let stateNew = new City(stateObject.getId()).deserialize(stateObject.getProperties())
        let stateNew = new City(stateObject.getId()).deserialize(stateObject)
        this.citys.push(stateNew);
      }
      //console.log(stateNew)
    })
   
  }

  onSubmit(){
   
    const citySubmit: District = new District(this.districtForm.get('idDistrict')?.value,).deserialize({
      nome_district : this.districtForm.get('nomeDistrict')?.value,   
      area_district : this.districtForm.get('areaDistrict')?.value,
      geometry : this.districtEntity.geometry,
      id_County : this.districtEntity.id_County,
    })
    console.log(citySubmit);
    this.createState(citySubmit);
  }

  createState(district:District):void{
    console.log('popu')
    console.log(district)
    this.restApi.setDistrict(district).subscribe((data : {}) => {
      console.log('populate')
      console.log(data)
    })
  }

  onSelectDistrict(value:number):void{
    console.log(value)
    for (let city of this.citys) {
      if(city.id_County == value){
        this.districtEntity.id_County = city;
        console.log(this.districtEntity.id_County);
        break;
      }
    }
  }  
}
