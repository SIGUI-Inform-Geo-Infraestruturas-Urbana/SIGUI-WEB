import { Component, OnInit, Input, Renderer2 ,ElementRef, Output , EventEmitter} from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import {City} from '../../../models/city.model';
import { Feature } from 'ol';
import {RestApiService} from '../../../services/rest-api.service';
import { Geometry, Point, Polygon, MultiPolygon} from 'ol/geom';
import GeoJSON from 'ol/format/GeoJSON';

@Component({
  selector: 'app-manage-city',
  templateUrl: './manage-city.component.html',
  styleUrls: ['./manage-city.component.css']
})
export class ManageCityComponent implements OnInit {
  @Input() featureSelect!:Feature;
  @Output() DrawMap: EventEmitter<string> = new EventEmitter();
  cityForm!: FormGroup;
  constructor(public restApi: RestApiService){ }

  ngOnInit(): void {
    this.createForm(new City());
  }
  createForm(city : City):void{
    this.cityForm = new FormGroup({
      nameCity : new FormControl(city.nome_municipio),
      identity : new FormControl(city.id_espatial),
      siglaUF : new FormControl(city.sigla_uf),
      codigoIBGE : new FormControl(city.cod_ibge),
      codigoAmbiental: new FormControl(city.cod_ambiental),
      nomeUGRHI: new FormControl(city.nome_ugrhi),
      numeroUGRHI: new FormControl(city.numero_ugrhi),
      coordenada: new FormControl(city.geometry),
      areaLimite: new FormControl(city.area_municipio),
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
    console.log(this.cityForm.value)
    let MultiPolygonList = [];
    console.log('Teste register');
    let geometria:Polygon = <Polygon>this.featureSelect.getGeometry();
    MultiPolygonList.push(geometria)
    let geometryMultPoly: MultiPolygon = new MultiPolygon(MultiPolygonList);

    var geojson_parser = new GeoJSON();
    var geometryJson = geojson_parser.writeGeometry(geometryMultPoly);

    console.log(geometryJson);
   
    let city:City = {
      id_espatial : this.cityForm.get('identity')?.value,
      nome_municipio : this.cityForm.get('nameCity')?.value,
      sigla_uf : this.cityForm.get('siglaUF')?.value,
      cod_ibge : this.cityForm.get('codigoIBGE')?.value,
      cod_ambiental : this.cityForm.get('codigoAmbiental')?.value,
      nome_ugrhi : this.cityForm.get('nomeUGRHI')?.value,
      numero_ugrhi : this.cityForm.get('numeroUGRHI')?.value,
      area_municipio : this.cityForm.get('areaLimite')?.value,
      geometry : geometryJson//this.cityForm.get('coordenada')?.value,
    }
    console.log(city);
    this.createCity(city);
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

  createCity(city:City):void{
    console.log('popu')
    console.log(city)
    this.restApi.setMunicipios(city).subscribe((data : {}) => {
      console.log('populate')
      console.log(data)
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
