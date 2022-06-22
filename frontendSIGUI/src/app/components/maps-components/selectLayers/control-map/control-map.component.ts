import { Component, OnInit, Input, Renderer2 ,ElementRef, Output , EventEmitter} from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { View } from 'ol';
import Map from 'ol/Map';
import { ManagerVisualizationService } from 'src/app/services/shared/visualization/manager-visualization.service';
import { ManagerSession } from 'src/app/models/managerSession.model';
import VectorLayer from 'ol/layer/Vector';
import { Geometry } from 'ol/geom';
import VectorSource from 'ol/source/Vector';

export interface User {
  name: string;
}

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
  public value:string= "Clear me";
  public managerSession! : ManagerSession;

  public hiddenPoint: boolean = false;
  public hiddenPoligono : boolean = false;
  public hiddenLineString : boolean = false;
   

  options: User[] = [{name: 'Mary'}, {name: 'Shelley'}, {name: 'Igor'}];
  filteredOptions!: Observable<User[]>;


  optionsDraws = [
    {id: 1, name:'layer_vectorIteration'},
    {id: 2, name:'layer_vector_unit'},
    {id: 3, name:'layer_vector_county'},
    {id: 4, name:'layer_vector_district'},
    {id: 5, name:'layer_vector_street'},
    {id: 6, name:'layer_vector_rede'},
    {id: 7, name:'layer_vector_infrastructure'},
    {id: 8, name:'layer_vector_equipament'},  //layer_vectorIteration
  ];

  constructor(private elementRef: ElementRef, private renderer : Renderer2,
   public managerService : ManagerVisualizationService ) {
    managerService.getSessionVisualization().subscribe(sessionVizu => {
      console.log('----------------');
      console.log(sessionVizu);
      this.managerSession = sessionVizu;
      if ((this.managerSession.session_streat == true)||(this.managerSession.session_public_place))
      {     
        console.log('Line')   
        this.hiddenPoint = false;
        this.hiddenPoligono = false;
        this.hiddenLineString = true;
      }
      else if ((this.managerSession.session_state == true)||(this.managerSession.session_county)||(this.managerSession.session_ditrict))
      {
        console.log('poli')
        this.hiddenPoint = false;
        this.hiddenPoligono = true;
        this.hiddenLineString = false;
      } 
      else if ((this.managerSession.session_infrastructure == true)||(this.managerSession.session_estructure))
      {
        console.log('Point')
        this.hiddenPoint = true;
        this.hiddenPoligono = false;
        this.hiddenLineString = false;
      } 
    })
   }

  ngOnInit(): void {
    this.controlMapForm = new FormGroup({
       selectDraw: new FormControl(),
    });
   this.controlMapForm.get("selectDraw")?.valueChanges.subscribe(f => {this.getVectorLayers(f)})
      
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
  onDrawChanged(itemSelected:string):void{
    // console.log('dsadsad')
    // let itemSelected:string = this.optionsDraws[value - 1].name
    console.log(itemSelected)
    this.DrawMap.emit(itemSelected);
  }  

  onSubmit():void{
    console.log(this.controlMapForm.value)
  }
  onUndo():void{ 
    this.UndoMap.emit();
  }

  getVectorLayers(value : number):void{
    console.log('teste')
    let layers = [];
    let select = this.optionsDraws.find( a => a.id == value)?.name
    this.map.getLayers().forEach((layer) => {
      let layerSource = <VectorLayer<VectorSource>> layer
      if (layerSource.get('name') == select){
        layerSource.getSource()?.clear();
        console.log('limpou');
      }
     // layers.push(layer.get('name'))
      // if (layer.get('name')== 'layer_vectorTerrain'){
      //   console.log("|L")
      //   console.log(layer)
      //   layers.push()
      //   //layer.setVisible(false)
      // }  
    })
   // console.log(this.layers)
  }

}
