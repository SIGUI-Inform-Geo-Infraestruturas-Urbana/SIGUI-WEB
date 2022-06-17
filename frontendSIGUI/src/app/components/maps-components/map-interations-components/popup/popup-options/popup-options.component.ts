import { AfterViewInit, Component, ElementRef, OnInit, Input, Output, EventEmitter,Renderer2, ViewChild } from '@angular/core';
import { MapBrowserEvent, Feature, Overlay } from 'ol';
import { Coordinate, toStringHDMS } from 'ol/coordinate';
import { fromLonLat , toLonLat, transform} from 'ol/proj';
import Map from 'ol/Map';
import Point  from 'ol/geom/Point';
//import { CountyService } from 'src/app/services/count/county.service';
import { County } from 'src/app/models/county.model';
import { Geometry, MultiPolygon } from 'ol/geom';
import { DataSpatialService } from 'src/app/services/count/data-spatials.service';
import { DataSpatial } from 'src/app/models/data-spatial';

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

  constructor(public dataSpatialService : DataSpatialService) {         

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
    this.dataSpatialService.getDataSpatial().subscribe((cities: DataSpatial[]) => {
      let feature = this.dataSpatialService.converterFromFeatures(cities);
      if (feature.length > 0){
        console.log('88888888888888888888888888')
        let geometry = <Geometry>feature[0].getGeometry();
        if (geometry.getType() == 'MultiPolygon'){
          console.log(geometry.getType())
          this.featureSelect = <Feature>feature[0]; 
        }
        else{
          let vertice = <Point>geometry;
          let coordinatePoint:Coordinate= vertice.getCoordinates();
          this.overlay.setPosition(coordinatePoint); 
          this.coordenadaPoint = toStringHDMS(toLonLat(coordinatePoint));
          this.featureSelect = <Feature>feature[0]; 
        }

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
      console.log('55555555555555555')
      let coordinate:Coordinate = evt.coordinate;
      this.overlay.setPosition(coordinate); 
     // var clickedCoordinate = transform(coordinate, 'EPSG:3857', 'EPSG:4326')//this.map.getCoordinateFromPixel(evt.pixel);
      this.coordenadaPoint = toStringHDMS(toLonLat(coordinate));
    }
    else{
      console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
      console.log(marcator.getGeometry()?.getType())
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
