import { Component, OnInit, Input, Renderer2 ,ElementRef, Output , EventEmitter} from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import {RestApiService} from '../../../services/rest-api.service'
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { PointLayer } from '../../../services/pointLayer';


@Component({
  selector: 'app-forms-map',
  templateUrl: './forms-map.component.html',
  styleUrls: ['./forms-map.component.css']
})
export class FormsMapComponent implements OnInit {

  //controlMapForm!: FormGroup;
  @Output() marcatorMap: EventEmitter<string> = new EventEmitter();
  pointLayer:PointLayer |undefined

  constructor(public restApi: RestApiService) { }

  ngOnInit(): void {
  }

  onSubmit():void{
    //console.log(this.controlMapForm.value)
  }
  pointMap():void{
    this.marcatorMap.emit(' ');
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

}
