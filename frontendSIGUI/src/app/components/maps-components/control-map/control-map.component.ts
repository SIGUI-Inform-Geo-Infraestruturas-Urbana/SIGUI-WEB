import { Component, OnInit, Input, Renderer2 ,ElementRef, Output , EventEmitter} from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { View } from 'ol';
import Map from 'ol/Map';

@Component({
  selector: 'app-control-map',
  templateUrl: './control-map.component.html',
  styleUrls: ['./control-map.component.css']
})
export class ControlMapComponent implements OnInit {

  @Input() map!: Map;
  @Output() DrawMap: EventEmitter<string> = new EventEmitter();
  @Output() UndoMap: EventEmitter<string> = new EventEmitter();
  controlMapForm!: FormGroup;

  optionsDraws = [
    {id: 1, name:'Point'},
    {id: 2, name:'LineString'},
    {id: 3, name:'Polygon'},
    {id: 4, name:'Circle'},
    {id: 5, name:'None'},
  ];

  constructor(private elementRef: ElementRef, private renderer : Renderer2) {}

  ngOnInit(): void {
    this.controlMapForm = new FormGroup({
      firstName: new FormControl(this.optionsDraws[1].name),
      selectDraw: new FormControl(),//this.optionsDraws[0].id
    });
    this.controlMapForm.get("selectDraw")?.valueChanges.subscribe(f => {this.onDrawChanged(f)})
  }

  ZoomMap():void{
    console.log('teste');
  //  var element = this.renderer.selectRootElement('.map-container')
  //  console.log(element)
    let view:View = this.map.getView();
    let zoom:number|undefined = Number(view.getZoom());
    console.log('zoom' + zoom);
    view.setZoom(zoom + 1);
  }

  DrawMapSelect():void{
    this.DrawMap.emit();
  }
  onDrawChanged(value:number):void{
    let itemSelected:string = this.optionsDraws[value].name
    console.log(itemSelected)
    this.DrawMap.emit(itemSelected);
  }  

  onSubmit():void{
    console.log(this.controlMapForm.value)
  }
  onUndo():void{ 
    this.UndoMap.emit();
  }

}
