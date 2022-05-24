import { Component, OnInit, Input, Renderer2 ,ElementRef, Output , EventEmitter} from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import {City} from '../../../models/city'

@Component({
  selector: 'app-manage-city',
  templateUrl: './manage-city.component.html',
  styleUrls: ['./manage-city.component.css']
})
export class ManageCityComponent implements OnInit {

  @Output() DrawMap: EventEmitter<string> = new EventEmitter();
  cityForm!: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.createForm(new City());
  }
  createForm(city : City):void{
    this.cityForm = new FormGroup({
      nameCity : new FormControl(city.nameCity),
      identity : new FormControl(city.identity),
      siglaUF : new FormControl(city.siglaUF),
      codigoIBGE : new FormControl(city.codigoIBGE),
      codigoAmbiental: new FormControl(city.codigoAmbiental),
      nomeUGRHI: new FormControl(city.nameUGRHI),
      numeroUGRHI: new FormControl(city.numberUGRHI),
      coordenada: new FormControl(city.coordinate),
      areaLimite: new FormControl(city.areaLimite),
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

}
