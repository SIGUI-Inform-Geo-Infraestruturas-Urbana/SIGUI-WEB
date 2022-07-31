import { AfterViewInit, Component, ElementRef, OnInit, Input, Output, EventEmitter,Renderer2, ViewChild } from '@angular/core';
import { MapBrowserEvent, Feature, Overlay } from 'ol';
import { Coordinate, toStringHDMS } from 'ol/coordinate';
import { fromLonLat , toLonLat, transform} from 'ol/proj';
import Map from 'ol/Map';
import Point  from 'ol/geom/Point';
//import { CountyService } from 'src/app/services/count/county.service';
import { County } from 'src/app/models/county.model';
import { Geometry, LineString, MultiPolygon, Polygon } from 'ol/geom';
import { DataSpatialService } from 'src/app/services/count/data-spatials.service';
import { DataSpatial } from 'src/app/models/data-spatial';
import { ManagerVisualizationService } from 'src/app/services/shared/visualization/manager-visualization.service';
import { ManagerSession } from 'src/app/models/managerSession.model';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

@Component({
  selector: 'app-popup-options',
  templateUrl: './popup-options.component.html',
  styleUrls: ['./popup-options.component.css']
})
export class PopupOptionsComponent implements OnInit , AfterViewInit{

  public validEdit: boolean; 
  public validSave: boolean; 

  @ViewChild('popup',{static:false}) divPopup!: ElementRef<HTMLElement>;
  @ViewChild('popupContent',{static:false}) popupContent!: ElementRef<HTMLElement>;
  @ViewChild('popupCloser',{static:false}) popupCloser!: ElementRef;
  @Output() associarInfra: EventEmitter<Feature> = new EventEmitter<Feature>();
  @Output() associarCity: EventEmitter<Feature> = new EventEmitter<Feature>();
  @Input() map!: Map;
  featureSelect!: Feature; 
  managerSession!: ManagerSession;
  public overlay!: Overlay
  public coordenadaPoint!:string;
  public tipoItem!:string;
  public idItem!:number;
  public edited:boolean = true;

  public hiddenState : boolean = false;
  public hiddenCounty : boolean = false;
  public hiddenDistrict : boolean = false;
  public hiddenStreet : boolean = false;
  public hiddenPublicPlace : boolean = false;
  public hiddenInfrastructure : boolean = false;
  public hiddenEstructure : boolean = false;  
  public hiddenRede : boolean = false;  

  constructor(public dataSpatialService : DataSpatialService, public managerService : ManagerVisualizationService) {         
    
    this.validEdit = false;
    this.validSave = false;
    
    managerService.getSessionVisualization().subscribe(sessionVizu => {
      console.log('-----session-----------');
      console.log(sessionVizu);
      this.managerSession = sessionVizu;
      console.log(this.managerSession )
    })
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

  excludeFeature(numberID : number){
    this.map.getLayers().forEach((layer) => {
      let layerSource = <VectorLayer<VectorSource>> layer
      if (layerSource.get('name') == 'layer_vectorIteration'){
        let a = layerSource.getSource()?.getFeatureById(numberID)
        layerSource.getSource()?.removeFeature(<Feature>a)
        this.overlay.setPosition(undefined)       
      }
    })
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
  
  searchFeatureAtPixel(evt:MapBrowserEvent<any>):any{
    let sFeature = null;



    this.map.forEachFeatureAtPixel(evt.pixel,(feature) => {  
      if ((this.managerSession.session_streat == true)||((this.managerSession.session_public_place)))
      {
        if (feature.getGeometry()?.getType() == 'LineString')
        {
          console.log('Line')
          console.log(feature.getProperties()['properties'])          
          let properties = feature.getProperties()['properties'] 
          if (properties != undefined){      
          this.idItem = properties['id'];
          this.tipoItem = properties['typeRepresentation'];
          }
          sFeature = feature;  

          return;        
        }    
        console.log('nãoLine')   
      }
      else
      {
        console.log('Point')
        console.log(feature.getProperties()['properties'])
        let properties = feature.getProperties()['properties']   
        if (properties != undefined){    
        this.idItem = properties['id'];
        this.tipoItem = properties['typeRepresentation'];
        }
        sFeature = feature;
        return; 
      }       
    });  
    return sFeature;
  }
  selectPoint(featuretSelect :Feature):boolean{
   
    let vertice:Point= <Point>featuretSelect.getGeometry();
    let coordinatePoint:Coordinate= vertice.getCoordinates();
    console.log('Coord')
    console.log(coordinatePoint)     
    this.overlay.setPosition(coordinatePoint); 
    this.coordenadaPoint = toStringHDMS(toLonLat(coordinatePoint));
    this.featureSelect = featuretSelect; 
    return true
  }
  selectLineString(featuretSelect :Feature, evt:MapBrowserEvent<any>):boolean{
    // let featuretSelect = <Feature>marcator;
    console.log(featuretSelect.getGeometry()?.getType())
    let coordinate:Coordinate = evt.coordinate;
    this.overlay.setPosition(coordinate); 
    this.coordenadaPoint = toStringHDMS(toLonLat(coordinate));
    this.featureSelect = featuretSelect; 
    return true
  }
  selectPoligony(featuretSelect :Feature, evt:MapBrowserEvent<any>):boolean{
   
    console.log(featuretSelect.getGeometry()?.getType())
    let coordinate:Coordinate = evt.coordinate;
    this.overlay.setPosition(coordinate); 
    this.coordenadaPoint = toStringHDMS(toLonLat(coordinate));
    this.featureSelect = featuretSelect; 
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
    console.log(featuretSelect)
    return true
  }
  definedVizualization(){
    this.hiddenPublicPlace = false;
    this.hiddenInfrastructure = false;
    this.hiddenEstructure = false;
    this.hiddenStreet = false;
    this.hiddenDistrict = false;
    this.hiddenCounty =false;
    this.hiddenState = false;
  }

  onClickMap(evt:MapBrowserEvent<any>): void{      
   
    console.log('onClick')
    let marcator = this.searchFeatureAtPixel(evt);     
    
    if (marcator == null)
    {     
      let coordinate:Coordinate = evt.coordinate;
      this.overlay.setPosition(coordinate); 
      this.coordenadaPoint = toStringHDMS(toLonLat(coordinate));
      if(this.managerSession.session_state == true)
      {
        console.log('***SESSION STATE****')
        this.definedVizualization();
        this.hiddenState = true;      
      }  
      else if(this.managerSession.session_county == true)
      {
        console.log('***SESSION COUNTY****')
        this.definedVizualization();
        this.hiddenCounty = true;
      }
      else if(this.managerSession.session_ditrict == true)
      {
        console.log('***SESSION DISTRICT****')
        this.definedVizualization();
        this.hiddenDistrict = true;
      }
      else if(this.managerSession.session_streat == true)
      {
        console.log('***SESSION STREAT****')
        this.definedVizualization();
        this.hiddenStreet = true;
      }
      else if (this.managerSession.session_public_place == true)
      {
        console.log('***SESSION PUBLICPLACE****')
        this.definedVizualization();
        this.hiddenPublicPlace = true;
      }
      else if (this.managerSession.session_infrastructure == true)
      {
        console.log('***SESSION INFRASTRUCTURE****')
        this.definedVizualization();
        this.hiddenInfrastructure = true;
      }
      else if (this.managerSession.session_estructure == true)
      {
        console.log('***SESSION ESTRUCTURE****')
        this.definedVizualization();
        this.hiddenEstructure = true;
      }

      // var clickedCoordinate = transform(coordinate, 'EPSG:3857', 'EPSG:4326')//this.map.getCoordinateFromPixel(evt.pixel);
    }
    else{
      let properties = marcator.getProperties()['properties'];
      console.log('testepropertie')
      let validProps =  properties === undefined ? false : true;
      console.log(validProps)

      let geomSelect = marcator.getGeometry()?.getType()


     
      switch (geomSelect) {
        case 'Polygon'://Polygon
          //let properties = <Feature>marcator.getProperties()['properties'];
          if (validProps == false)
          {
            if(this.managerSession.session_state == true)
            {
              console.log('***SESSION STATE****')
              let featuretSelect = this.selectPoligony(<Feature>marcator,evt)
              this.definedVizualization();
              this.hiddenState = true; 
              this.validEdit = false;
              this.validSave = true;  
            }  
            else if(this.managerSession.session_county == true)
            {
              console.log('***SESSION COUNTY****')
              let featuretSelect = this.selectPoligony(<Feature>marcator,evt)
              this.definedVizualization();
              this.hiddenCounty = true;
              this.validEdit = false;
              this.validSave = true;
            }
            else if(this.managerSession.session_ditrict == true)
            {
              console.log('***SESSION DISTRICT****')
              let featuretSelect = this.selectPoligony(<Feature>marcator,evt)
              this.definedVizualization();
              this.hiddenDistrict = true;
              this.validEdit = false;
              this.validSave = true;
            }
          }
          else //para visualização
          {
            let type = properties['typeRepresentation'];

            switch (type) {
              case 'unit':
                this.validEdit = true;
                this.validSave = false;
                break;
              case 'county':
                this.validEdit = true;
                this.validSave = false;
                break;
              case 'district':  
                this.validEdit = true;
                this.validSave = false;
                break;
              default:
                break;
            }  
          }

          break;
        case 'LineString':
          
          //let properties = <Feature>marcator.getProperties()['properties'];
          if (validProps == false)
          {
            if(this.managerSession.session_streat == true)
            {
              console.log('***SESSION STREAT****')
              let featuretSelect = this.selectLineString(<Feature>marcator,evt)
              this.definedVizualization();
              this.hiddenStreet = true;
              this.validEdit = false;
              this.validSave = true;
            }
            else if (this.managerSession.session_public_place == true)
            {
              console.log('***SESSION PUBLICPLACE****')
              let featuretSelect = this.selectLineString(<Feature>marcator,evt)
              this.definedVizualization();
              this.hiddenPublicPlace = true;
              this.validEdit = false;
              this.validSave = true;
            }
            else if (this.managerSession.session_network == true)
            {
              console.log('***SESSION NETWORK****')
              let featuretSelect = this.selectLineString(<Feature>marcator,evt)
              this.definedVizualization();
              this.hiddenPublicPlace = true;
              this.validEdit = false;
              this.validSave = true;
            }
          }
          else //para visualização
          {
            let type = properties['typeRepresentation'];

            switch (type) {
              case 'publicplace':
                this.validEdit = true;
                this.validSave = false;
              break;                
              case 'street':
                this.validEdit = true;
                this.validSave = false;
                break;
              case 'infraNet':
                this.validEdit = true;
                this.validSave = false;
              break;                 
              default:
                break;
            }  
          }

          break;
        case 'Point':
          if (validProps == false)
          {
            if (this.managerSession.session_infrastructure == true)
            {
              console.log('***SESSION INFRASTRUCTURE****')
              let featuretSelect = this.selectPoint(<Feature>marcator)
              this.definedVizualization();
              this.hiddenInfrastructure = true;
              this.validEdit = false;
              this.validSave = true;
            }
            else if (this.managerSession.session_estructure == true)
            {
              console.log('***SESSION ESTRUCTURE****')
              let featuretSelect = this.selectPoint(<Feature>marcator)
              this.definedVizualization();
              this.hiddenEstructure = true;
              this.validEdit = false;
              this.validSave = true;
            }
          }
          else //para visualização
          {
            let type = properties['typeRepresentation'];

            switch (type) {                   
              case 'infrastructure':
                this.validEdit = true;
                this.validSave = false;
                break;   
   
              case 'estructure':
                this.validEdit = true;
                this.validSave = false;
                break;  
              default:
                break;
            }  
          }
          break;      
        default:
          break;
      }

      //if()

    }
      

    
  }



  // onClickMap(evt:MapBrowserEvent<any>): void{      
   
  //   console.log('onClick')
  //   let marcator = this.searchFeatureAtPixel(evt);     
    
  //   if (marcator == null)
  //   {     
  //     let coordinate:Coordinate = evt.coordinate;
  //     this.overlay.setPosition(coordinate); 
  //     this.coordenadaPoint = toStringHDMS(toLonLat(coordinate));
  //     if(this.managerSession.session_state == true)
  //     {
  //       console.log('***SESSION STATE****')
  //       this.definedVizualization();
  //       this.hiddenState = true;      
  //     }  
  //     else if(this.managerSession.session_county == true)
  //     {
  //       console.log('***SESSION COUNTY****')
  //       this.definedVizualization();
  //       this.hiddenCounty = true;
  //     }
  //     else if(this.managerSession.session_ditrict == true)
  //     {
  //       console.log('***SESSION DISTRICT****')
  //       this.definedVizualization();
  //       this.hiddenDistrict = true;
  //     }
  //     else if(this.managerSession.session_streat == true)
  //     {
  //       console.log('***SESSION STREAT****')
  //       this.definedVizualization();
  //       this.hiddenStreet = true;
  //     }
  //     else if (this.managerSession.session_public_place == true)
  //     {
  //       console.log('***SESSION PUBLICPLACE****')
  //       this.definedVizualization();
  //       this.hiddenPublicPlace = true;
  //     }
  //     else if (this.managerSession.session_infrastructure == true)
  //     {
  //       console.log('***SESSION INFRASTRUCTURE****')
  //       this.definedVizualization();
  //       this.hiddenInfrastructure = true;
  //     }
  //     else if (this.managerSession.session_estructure == true)
  //     {
  //       console.log('***SESSION ESTRUCTURE****')
  //       this.definedVizualization();
  //       this.hiddenEstructure = true;
  //     }

  //     // var clickedCoordinate = transform(coordinate, 'EPSG:3857', 'EPSG:4326')//this.map.getCoordinateFromPixel(evt.pixel);
  //   }
  //   else{
  //     let properties = <Feature>marcator.getProperties()['properties'];
  //     console.log('testepropertie')
  //     console.log(properties)

  //     let a = marcator.getGeometry()?.getType()

  //     //if()

  //     if(this.managerSession.session_state == true)
  //     {
  //       console.log('***SESSION STATE****')
  //       let featuretSelect = this.selectPoligony(<Feature>marcator,evt)
  //       this.definedVizualization();
  //       this.hiddenState = true;    
  //     }  
  //     else if(this.managerSession.session_county == true)
  //     {
  //       console.log('***SESSION COUNTY****')
  //       let featuretSelect = this.selectPoligony(<Feature>marcator,evt)
  //       this.definedVizualization();
  //       this.hiddenCounty = true;
  //     }
  //     else if(this.managerSession.session_ditrict == true)
  //     {
  //       console.log('***SESSION DISTRICT****')
  //       let featuretSelect = this.selectPoligony(<Feature>marcator,evt)
  //       this.definedVizualization();
  //       this.hiddenDistrict = true;
  //     }
  //     else if(this.managerSession.session_streat == true)
  //     {
  //       console.log('***SESSION STREAT****')
  //       let featuretSelect = this.selectLineString(<Feature>marcator,evt)
  //       this.definedVizualization();
  //       this.hiddenStreet = true;
  //     }
  //     else if (this.managerSession.session_public_place == true)
  //     {
  //       console.log('***SESSION PUBLICPLACE****')
  //       let featuretSelect = this.selectLineString(<Feature>marcator,evt)
  //       this.definedVizualization();
  //       this.hiddenPublicPlace = true;
  //     }
  //     else if (this.managerSession.session_infrastructure == true)
  //     {
  //       console.log('***SESSION INFRASTRUCTURE****')
  //       let featuretSelect = this.selectPoint(<Feature>marcator)
  //       this.definedVizualization();
  //       this.hiddenInfrastructure = true;
  //     }
  //     else if (this.managerSession.session_estructure == true)
  //     {
  //       console.log('***SESSION ESTRUCTURE****')
  //       let featuretSelect = this.selectPoint(<Feature>marcator)
  //       this.definedVizualization();
  //       this.hiddenEstructure = true;
  //     }
  //   }
  // }

 
  closerPopupClick(){
    this.overlay.setPosition(undefined);
   // this.popupCloser.nativeElement.blur();   
   return false;
  }

  onClose(){
    this.overlay.setPosition(undefined)
    this.tipoItem = ''
    this.idItem = 0
  }


}
