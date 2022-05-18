import { Component, OnInit, Input, Renderer2 ,ElementRef, Output , EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import {RestApiService} from '../../../services/rest-api.service'
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { PointLayer } from '../../../services/pointLayer';
import { Geometry, Point } from 'ol/geom';
import { Feature } from 'ol';
import { Coordinate } from 'ol/coordinate';
import GeoJSON from 'ol/format/GeoJSON';
import { Equipament } from '../../../services/equipament';
import { Infraestructura } from '../../../services/infraestructure';



class teste{

}

@Component({
  selector: 'app-forms-map',
  templateUrl: './forms-map.component.html',
  styleUrls: ['./forms-map.component.css']
})
export class FormsMapComponent implements OnInit , OnChanges{

  //controlMapForm!: FormGroup;
  @Input() featureSelect!:Feature;
  @Output() marcatorMap: EventEmitter<string> = new EventEmitter();
  newInfraestructure!:Infraestructura
  coordinates!:string;
  pointLayer:PointLayer |undefined
 // controlForm!: FormGroup;
  equipaments: Equipament[] = [
    {id : 5,value: 'test', viewValue :'teste'},
  ];

  constructor(public restApi: RestApiService) { }

  ngOnInit(): void {
    console.log('22222')
    if (this.featureSelect != undefined){
      console.log('1111')
    const marcator:Feature<Point> = <Feature<Point>>this.featureSelect;
    let coordinatePoint = marcator.getGeometry()!.getCoordinates;
    }
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('alterado')
    let featureGet = changes['featureSelect'].currentValue;
    // const inf:Equipament = {id: 25 ,value:'aaaa',viewValue : 'aaaa'}

    // featureGet.setProperties(inf);
    let geometria:Point = <Point>featureGet.getGeometry();//this.featureSelect.getGeometry()
    this.coordinates = geometria.getCoordinates().toString();
    // let x = <Point>v
    //this.coordinates = x.getCoordinates().toString();
    console.log(this.coordinates );

  }

  onSubmit():void{
    console.log('Teste register');

    let equipament:Equipament = {id: 3, value : 'aaaa', viewValue : 'bbbbb'}
    this.createEquipament(equipament);
    //console.log(this.controlMapForm.value)
  }
  onSubmitInfra():void{
    console.log('Teste register');
    let geometria:Point = <Point>this.featureSelect.getGeometry();
    var geojson_parser = new GeoJSON();
    var geometryJson = geojson_parser.writeGeometry(geometria);

    //let infraestructura:Infraestructura = {id: 20, idDetentor: 20, nomeInfraestructure : 'InfraestruturaTeste'}
    let infraestructura:Infraestructura = {
      id: 20,
      idDetentor: 20, 
      nomeInfraestructure : 'InfraestruturaTeste',
      position : geometryJson,
    }
    console.log(infraestructura);
    this.createInfraestructure(infraestructura);
   // this.featureSelect.setProperties(infraestructura);
  



    //this.createEquipament(equipament);
    //console.log(this.controlMapForm.value)
  }
  searchPointMap():void{
    this.restApi.getPoit(1).subscribe((data: PointLayer)=> this.pointLayer = {
      id : data.id,
      name : data.name,
      coordenada : data.coordenada
    })
    /*
        this.restApi.getPoit(1).subscribe((data: PointLayer)=> this.pointLayer = {
      id : (data as any).id,
      name : (data as any).name,
      coordenada : (data as any).coordenada
    })*/
    console.log(this.pointLayer)

  }
  createEquipament(equipament:Equipament):void{
    console.log('popu')
    console.log(equipament)
    this.restApi.setEquipament(equipament).subscribe((data : {}) => {
      console.log('populate')
      console.log(data)
    })
  }
  createInfraestructure(infraestructura:Infraestructura):void{
    console.log('popu')
    console.log(infraestructura)
    this.restApi.setPoint(infraestructura).subscribe((data : {}) => {
      console.log('populate')
      console.log(data)
    })
  }

}
