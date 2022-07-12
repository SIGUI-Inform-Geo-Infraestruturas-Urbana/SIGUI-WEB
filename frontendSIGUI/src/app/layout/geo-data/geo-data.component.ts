import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
import { ManagerFilePopupComponent } from 'src/app/components/dialogs-components/manager-file-popup/manager-file-popup.component';
import { OpenLayerComponent } from 'src/app/components/maps-components/open-layer/open-layer.component';
import { County } from 'src/app/models/county.model';
import { DataSpatial } from 'src/app/models/data-spatial';
import { ManagerSession } from 'src/app/models/managerSession.model';
import { CountyManipulationService } from 'src/app/services/count/county-manager/county-manipulation.service';
import { StateMapService } from 'src/app/services/shared/state-map.service';

@Component({
  selector: 'app-geo-data',
  templateUrl: './geo-data.component.html',
  styleUrls: ['./geo-data.component.scss']
})
export class GeoDataComponent implements OnInit {

  @ViewChild('mapOpenLayer',{static:false}) mapOpenLayer !: OpenLayerComponent;
  public managerVizualizaton :ManagerSession;
  public managerManipulation :ManagerSession;

  public isShowing: boolean = true;
  public isShowingNavRight: boolean = false;
  public isShowingButtonNavRight: boolean = false;
  public isExpanded: boolean = true;
  public sizeSidenav: number = 100;

  constructor(public dialog: MatDialog, private stateMap :StateMapService,
    private countyVizualization :CountyManipulationService) { 
    this.managerVizualizaton = new ManagerSession();
    this.managerManipulation = new ManagerSession();

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
            this.countyVizualization.setCountyVisualization(<County>element);
            this.managerVizualizaton.session_county = true;
          break;
          case 'county':
            this.managerVizualizaton = new ManagerSession();
            this.countyVizualization.setCountyVisualization(<County>element);
            this.managerVizualizaton.session_county = true;
          break;
          case 'district':
            this.managerVizualizaton = new ManagerSession();
            this.countyVizualization.setCountyVisualization(<County>element);
            this.managerVizualizaton.session_county = true;
            break;
          case 'publicplace':
            this.managerVizualizaton = new ManagerSession();
            this.countyVizualization.setCountyVisualization(<County>element);
            this.managerVizualizaton.session_county = true;
            break;            
          case 'street':
            this.managerVizualizaton = new ManagerSession();
            this.countyVizualization.setCountyVisualization(<County>element);
            this.managerVizualizaton.session_county = true;
            break;
          case 'infrastructure':
            this.managerVizualizaton = new ManagerSession();
            this.countyVizualization.setCountyVisualization(<County>element);
            this.managerVizualizaton.session_county = true;
            break;   
          case 'infraNet':
            this.managerVizualizaton = new ManagerSession();
            this.countyVizualization.setCountyVisualization(<County>element);
            this.managerVizualizaton.session_county = true;
          break;       
          case 'estructure':
            this.managerVizualizaton = new ManagerSession();
            this.countyVizualization.setCountyVisualization(<County>element);
            this.managerVizualizaton.session_county = true;
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
          this.managerManipulation = new ManagerSession();
          this.countyVizualization.setCountyManipulation(<County>element);
          this.managerManipulation.session_county = true;
        break;
        case 'county':
          console.log('valor county')
          this.enableModalManipuledData();
          this.managerManipulation = new ManagerSession();
          this.countyVizualization.setCountyManipulation(<County>element);
          this.managerManipulation.session_county = true;
        break;
        case 'district':
          this.managerVizualizaton = new ManagerSession();
          this.countyVizualization.setCountyVisualization(<County>element);
          this.managerVizualizaton.session_county = true;
          break;
        case 'publicplace':
          this.managerVizualizaton = new ManagerSession();
          this.countyVizualization.setCountyVisualization(<County>element);
          this.managerVizualizaton.session_county = true;
          break;            
        case 'street':
          this.managerVizualizaton = new ManagerSession();
          this.countyVizualization.setCountyVisualization(<County>element);
          this.managerVizualizaton.session_county = true;
          break;
        case 'infrastructure':
          this.managerVizualizaton = new ManagerSession();
          this.countyVizualization.setCountyVisualization(<County>element);
          this.managerVizualizaton.session_county = true;
          break;   
        case 'infraNet':
          this.managerVizualizaton = new ManagerSession();
          this.countyVizualization.setCountyVisualization(<County>element);
          this.managerVizualizaton.session_county = true;
        break;       
        case 'estructure':
          this.managerVizualizaton = new ManagerSession();
          this.countyVizualization.setCountyVisualization(<County>element);
          this.managerVizualizaton.session_county = true;
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

  openDialog(){
    this.dialog.open(ManagerFilePopupComponent)
  }

}
