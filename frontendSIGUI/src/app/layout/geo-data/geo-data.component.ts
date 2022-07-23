import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Feature, View } from 'ol';
import OlMap from 'ol/Map';
import { Geometry } from 'ol/geom';
import { ManagerFilePopupComponent } from 'src/app/components/dialogs-components/manager-file-popup/manager-file-popup.component';
import { OpenLayerComponent } from 'src/app/components/maps-components/open-layer/open-layer.component';
import { County } from 'src/app/models/county.model';
import { DataSpatial } from 'src/app/models/data-spatial';
import { ManagerSession } from 'src/app/models/managerSession.model';
import { CountyManipulationService } from 'src/app/services/count/county-manager/county-manipulation.service';
import { StateMapService } from 'src/app/services/shared/state-map.service';
import { ManagerMenu } from 'src/app/models/managerMenu.model';
import { UnitManipulation } from 'src/app/services/unit-federal/unit-federal-manager/unit-federal-manipulation.service';
import { DistrictManipulationService } from 'src/app/services/district/district-manager/district-manipulation.service';
import { StreetManipulation } from 'src/app/services/street/street-manipulation/street-manipulation.service';
import { PublicPlaceManipulation } from 'src/app/services/public-place/public-place-manager/public-place-manipulation.service';
import { InfrastructureManipulation } from 'src/app/services/infrastructure/infrastructure-manager/Infrastruture-manipulation.service';
import { EquipamentUrbanManipulationService } from 'src/app/services/equipamentUrban/equipamentUrban-manager/equipamentUrban-manipulation.service';
import { UnitFederal } from 'src/app/models/unit-federal.model';
import { District } from 'src/app/models/district.model';
import { PublicPlace } from 'src/app/models/public-place.model';
import { Street } from 'src/app/models/street.model';
import { Infrastructure } from 'src/app/models/infrastructure.model';
import { EquipmentUrban } from 'src/app/models/equipament-urban.model';

@Component({
  selector: 'app-geo-data',
  templateUrl: './geo-data.component.html',
  styleUrls: ['./geo-data.component.scss']
})
export class GeoDataComponent implements OnInit {

  //@ViewChild('mapOpenLayer',{static:false}) mapOpenLayer !: OpenLayerComponent;
  @Input() managerManu!:ManagerMenu;
  public mapLayers!: OlMap;
  public managerVizualizaton :ManagerSession;
  public managerManipulation :ManagerSession;

  public isShowing: boolean = true;
  public isShowingNavRight: boolean = false;
  public isShowingButtonNavRight: boolean = false;
  public isExpanded: boolean = true;
  public sizeSidenav: number = 100;

  constructor(public dialog: MatDialog, private stateMap :StateMapService,
    private countyVizualization :CountyManipulationService,
    private unitManipulation :UnitManipulation,
    private districtManipulation :DistrictManipulationService,
    private streetManipulation :StreetManipulation,
    private publicPlaceManipulation :PublicPlaceManipulation,
    private infrastructureManipulation :InfrastructureManipulation,
    private equipamentUrbanManipulation :EquipamentUrbanManipulationService,
    ) { 
    this.managerVizualizaton = new ManagerSession();
    this.managerManipulation = new ManagerSession();
    //this.mapLayers = this.mapOpenLayer.map;   
    this.initializeOpenLayers();

    stateMap.getFeatureSelect().subscribe(feature => {
      console.log('valor SELECIONADO-----------------s')
      console.log(feature)    
      this.validatedDataSelect(feature);   

    });
  }  

  ngOnInit(): void {
    console.log('sadsadsadsadsadsad')
    console.log(this.managerVizualizaton.session_county) 
  }

  initializeOpenLayers(){
    
  this.mapLayers = new OlMap({ 
      target: 'ol-map',
      view: new View({
        center: [ -5480159.755742349, -2930312.646903647 ],
        zoom: 12,
        multiWorld: true,
      }),
    })
  }

  enableModalManipuledData(){
    this.isShowingNavRight = true; 
    this.isShowingButtonNavRight = true;
  }

  validatedDataSelect(element:DataSpatial):void{
    
    if ((element.id != undefined )&&(element.id != 0)){
      console.log('VALIDOU222222222')
      switch (element.typeRepresentation) {
          case 'unit':
            this.managerVizualizaton = new ManagerSession();
            this.unitManipulation.setUnitVisualization(<UnitFederal>element);
            this.managerVizualizaton.session_state = true;
          break;
          case 'county':
            this.managerVizualizaton = new ManagerSession();
            this.countyVizualization.setCountyVisualization(<County>element);
            this.managerVizualizaton.session_county = true;
          break;
          case 'district':
            this.managerVizualizaton = new ManagerSession();
            this.districtManipulation.setDistrictVisualization(<District>element);
            this.managerVizualizaton.session_ditrict = true;
            break;
          case 'publicplace':
            this.managerVizualizaton = new ManagerSession();
            this.publicPlaceManipulation.setPublicPlaceVisualization(<PublicPlace>element);
            this.managerVizualizaton.session_public_place = true;
            break;            
          case 'street':
            this.managerVizualizaton = new ManagerSession();
            this.streetManipulation.setStreetVisualization(<Street>element);
            this.managerVizualizaton.session_streat = true;
            break;
          case 'infrastructure':
            this.managerVizualizaton = new ManagerSession();
            this.infrastructureManipulation.setInfrastructureVisualization(<Infrastructure>element);
            this.managerVizualizaton.session_infrastructure = true;
            break;   
          case 'infraNet':
            this.managerVizualizaton = new ManagerSession();
            this.countyVizualization.setCountyVisualization(<County>element);
            this.managerVizualizaton.session_county = true;
          break;       
          case 'estructure':
            this.managerVizualizaton = new ManagerSession();
            this.equipamentUrbanManipulation.setEquipamentUrbanVisualization(<EquipmentUrban>element);
            this.managerVizualizaton.session_estructure = true;
            break;  
          default:
            break;
        }  
      console.log('valor preechido')
    }
    else if ((element.geometry != '0')){ 
      console.log('valor nao preechido88888888888888888888888')
      console.log(element.typeRepresentation)
      switch (element.typeRepresentation) {
        case 'unit':
          this.enableModalManipuledData();
          this.managerManipulation = new ManagerSession();
          this.unitManipulation.setUnitManipulation(<UnitFederal>element);
          this.managerManipulation.session_state = true;
        break;
        case 'county':
          console.log('valor county')
          this.enableModalManipuledData();
          this.managerManipulation = new ManagerSession();
          this.countyVizualization.setCountyManipulation(<County>element);
          this.managerManipulation.session_county = true;
          console.log(this.managerManipulation)
        break;
        case 'district':
          this.enableModalManipuledData();
          this.managerManipulation = new ManagerSession();
          this.districtManipulation.setDistrictManipulation(<District>element);
          this.managerManipulation.session_ditrict = true;
          break;
        case 'publicplace':
          this.enableModalManipuledData();
          this.managerManipulation = new ManagerSession();
          this.publicPlaceManipulation.setPublicPlaceManipulation(<PublicPlace>element);
          this.managerManipulation.session_public_place = true;
          break;            
        case 'street':
          console.log('valor street')
          this.enableModalManipuledData();
          this.managerManipulation = new ManagerSession();
          this.streetManipulation.setStreetManipulation(<Street>element);
          this.managerManipulation.session_streat = true;
          break;
        case 'infrastructure':
          this.enableModalManipuledData();
          this.managerManipulation = new ManagerSession();
          this.infrastructureManipulation.setInfrastructureManipulation(<Infrastructure>element);
          this.managerManipulation.session_infrastructure = true;
          break;   
        case 'infraNet':
          this.enableModalManipuledData();
          this.managerManipulation = new ManagerSession();
          this.countyVizualization.setCountyVisualization(<County>element);
          this.managerManipulation.session_county = true;
        break;       
        case 'estructure':
          this.enableModalManipuledData();
          this.managerManipulation = new ManagerSession();
          this.equipamentUrbanManipulation.setEquipamentUrbanManipulation(<EquipmentUrban>element);
          this.managerManipulation.session_estructure = true;
          break;  
        default:
          break;
      }  
      console.log('valor nao 87666666666')
    }


    // let city:County = <County>feature;   
    // if ((city.id_county != undefined)&&(city.id_county != 0)){
    //   console.log(city.id_county)
    //   console.log('Valor já existe')
    //   console.log(city)
    //   this.updateForm(city);
    //   this.city = city;    
    // }
    // else
    // {
    //   console.log('Definir nova variavel')
    //   this.populateGeometry(city); 
    //   this.updateForm(city);       
    // }
  
  }



}
