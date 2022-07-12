import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Map } from 'ol';
import { ManagerVisualizationService } from 'src/app/services/shared/visualization/manager-visualization.service';

@Component({
  selector: 'app-select-unit-poligono',
  templateUrl: './select-unit-poligono.component.html',
  styleUrls: ['./select-unit-poligono.component.css']
})
export class SelectPoligonoComponent implements OnInit {

  @Input() map!: Map;
  @Output() DrawMap: EventEmitter<string> = new EventEmitter();
  @Output() UndoMap: EventEmitter<string> = new EventEmitter();
  controlMapForm!: FormGroup;
  public value:string= "Clear me";

  optionsDraws = [
    {id: 1, name:'Polygon'},
    {id: 2, name:'None'},
    {id: 3, name:'Limpar Camada'}
  ];

  constructor(private elementRef: ElementRef, private renderer : Renderer2) {}

  ngOnInit(): void {
    this.controlMapForm = new FormGroup({
        selectDraw: new FormControl(),//this.optionsDraws[0].id
    });
   this.controlMapForm.get("selectDraw")?.valueChanges.subscribe(f => {this.onDrawChanged(f)})     
  }
  onDrawPoligony():void{
    let itemSelected:string = this.optionsDraws[1 - 1].name
    console.log(itemSelected)
    this.DrawMap.emit(itemSelected);
  }
  onDrawNone():void{
    let itemSelected:string = this.optionsDraws[2 - 1].name
    console.log(itemSelected)
    this.DrawMap.emit(itemSelected);
  }
  onDrawClear():void{
    let itemSelected:string = this.optionsDraws[3 - 1].name
    console.log(itemSelected)
    this.clearSource()
  }

  
 
  onDrawChanged(value:number):void{
    console.log('dsadsad')
    if ((value == 1)||(value == 2))
    {
      let itemSelected:string = this.optionsDraws[value - 1].name
      console.log(itemSelected)
      this.DrawMap.emit(itemSelected);
    }
    else if ((value == 3))
    {
      let itemSelected:string = this.optionsDraws[value - 1].name
      console.log(itemSelected)
      this.clearSource()
    }
    
  }  
  getVectorLayers():void{
    console.log('testeLayer')    
    this.map.getLayers().forEach(layer => {
       if (layer.get('name')== 'layer_vectorTerrain'){
        console.log("|L")
        layer.get('name').setVisible(false)
        //layer.setVisible(false)
      }      
    })
  }
  clearSource(){
    this.UndoMap.emit();
  }

}
