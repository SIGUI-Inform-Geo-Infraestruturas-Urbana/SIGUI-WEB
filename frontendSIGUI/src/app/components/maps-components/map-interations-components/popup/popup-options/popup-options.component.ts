import { AfterViewInit, Component, ElementRef, OnInit, Input, Output, EventEmitter,Renderer2, ViewChild } from '@angular/core';
import { MapBrowserEvent, Feature, Overlay } from 'ol';
import { Coordinate, toStringHDMS } from 'ol/coordinate';
import { fromLonLat , toLonLat, transform} from 'ol/proj';
import Map from 'ol/Map';
import Point  from 'ol/geom/Point';
import { CountyService } from 'src/app/services/count/county.service';
import { City } from 'src/app/models/city.model';
import { MultiPolygon } from 'ol/geom';

@Component({
  selector: 'app-popup-options',
  templateUrl: './popup-options.component.html',
  styleUrls: ['./popup-options.component.css']
})
export class PopupOptionsComponent implements OnInit , AfterViewInit{

  @ViewChild('popup',{static:false}) divPopup!: ElementRef<HTMLElement>;
  @ViewChild('popupContent',{static:false}) popupContent!: ElementRef<HTMLElement>;
  @ViewChild('popupCloser',{static:false}) popupCloser!: ElementRef;
  @Output() associarInfra: EventEmitter<Feature> = new EventEmitter<Feature>();
  @Output() associarCity: EventEmitter<Feature> = new EventEmitter<Feature>();
  @Input() map!: Map;
  featureSelect!: Feature; 
  public overlay!: Overlay
  public coordenadaPoint!:string
  public edited:boolean = true;

  constructor(public countyService : CountyService ) {         

  }

  ngOnInit(): void {
    this.map.on('dblclick', (evt) => this.onClickMap(evt))    
  }

  ngAfterViewInit(){
    // this.renderer.setProperty(this.divPopup.nativeElement,'innerHTML','Hello Angular');
     const container:HTMLElement = this.divPopup.nativeElement;
     console.log(container)
     this.overlay = new Overlay({
       element : container,
       position: undefined,
         autoPan: {
           animation: {
             duration: 250,
           }
         }
     })
     this.map.addOverlay(this.overlay);
     this.setSelect();
     
  }  

  setSelect(){
    this.countyService.getCounties().subscribe((cities: City[]) => {
      let feature = this.countyService.converterFromFeatures(cities);
      if (feature.length > 0){
        console.log('88888888888888888888888888')
        let a = <MultiPolygon>feature[0].getGeometry();
        let b = a.getCoordinates();
        //console.log(b)
        ///
      }

    
    });
  }

  onClickMap(evt:MapBrowserEvent<any>): void{      
   
    console.log('onClick')
    let marcator = this.map.forEachFeatureAtPixel(evt.pixel,(feature) => {     
      return feature;
    });
   
    if (marcator === undefined)
    {
      let coordinate:Coordinate = evt.coordinate;
      this.overlay.setPosition(coordinate); 
     // var clickedCoordinate = transform(coordinate, 'EPSG:3857', 'EPSG:4326')//this.map.getCoordinateFromPixel(evt.pixel);
      this.coordenadaPoint = toStringHDMS(toLonLat(coordinate));
    }
    else{
      console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
      // this.featureSelect = <Feature>marcator;    
      if (marcator.getGeometry()?.getType() == 'Point')
      {
        let vertice:Point= <Point>marcator.getGeometry();
        let coordinatePoint:Coordinate= vertice.getCoordinates();
        console.log('Coord')
        console.log(coordinatePoint)     
        this.overlay.setPosition(coordinatePoint); 
        this.coordenadaPoint = toStringHDMS(toLonLat(coordinatePoint));
        this.featureSelect = <Feature>marcator; 
      }
      else{
        console.log(marcator.getGeometry()?.getType())
        let coordinate:Coordinate = evt.coordinate;
        this.overlay.setPosition(coordinate); 
        this.coordenadaPoint = toStringHDMS(toLonLat(coordinate));
        this.featureSelect = <Feature>marcator; 
      }

     
    }
   // console.log(marcator)
  }
 
  closerPopupClick(){
    this.overlay.setPosition(undefined);
   // this.popupCloser.nativeElement.blur();
   return false;
  }


}
