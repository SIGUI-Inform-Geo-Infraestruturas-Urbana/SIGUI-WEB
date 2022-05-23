import { Component, OnInit, ChangeDetectionStrategy, Input, Renderer2, ElementRef , ViewChild, AfterViewInit} from '@angular/core';
import Map from 'ol/Map';
import Control from 'ol/control/Control';
@Component({
  selector: 'app-layer-switcher',
  templateUrl: './layer-switcher.component.html',
  styleUrls: ['./layer-switcher.component.css']
})
export class LayerSwitcherComponent implements OnInit , AfterViewInit{
  @ViewChild('controlLayers',{static:false}) divControlLayers!: ElementRef<HTMLElement>;
  @Input() map!: Map;
  public layers!:string[];
  constructor(private elementRef: ElementRef, private renderer : Renderer2) {}

  ngOnInit() {
    // const container:HTMLElement = this.divControlLayers.nativeElement;
    // let ControlElementsLayers = new Control({
    //   element : container
    // })
    this.getVectorLayers()
    console.log('tesdddddte')
    //this.map.addControl(ControlElementsLayers)
  }
  ngAfterViewInit(): void {
    const container:HTMLElement = this.divControlLayers.nativeElement;
    let ControlElementsLayers = new Control({
      element : container
    })
    this.map.addControl(ControlElementsLayers)
  }
  getVectorLayers():void{
    console.log('teste')
    this.layers = [];
    this.map.getLayers().forEach(layer => {
      this.layers.push(layer.get('name'))
      // if (layer.get('name')== 'layer_vectorTerrain'){
      //   console.log("|L")
      //   console.log(layer)
      //   layers.push()
      //   //layer.setVisible(false)
      // }  
    })
    console.log(this.layers)
  }
}
