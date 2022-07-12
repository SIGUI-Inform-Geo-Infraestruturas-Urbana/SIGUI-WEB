import { AfterViewInit, Component, ElementRef, OnInit, Input, Output, EventEmitter,Renderer2, ViewChild } from '@angular/core';
import { Feature  } from 'ol';
import { ManagerSession } from '../../../../../models/managerSession.model'
import { StateMapService } from '../../../../../services/shared/state-map.service'
import { ManagerVisualizationService } from '../../../../../services/shared/visualization/manager-visualization.service'

import {  Observable } from "rxjs";
//import { CountyService } from 'src/app/services/count/county.service';
import { County } from 'src/app/models/county.model';
import { Geometry, LineString, MultiPolygon, Point, Polygon } from 'ol/geom';
import { UnitFederal } from 'src/app/models/unit-federal.model';
import { District } from 'src/app/models/district.model';
import { Infrastructure } from 'src/app/models/infrastructure.model';
import { AssociationInfrastructuresComponent } from '../../../association-infrastructures/association-infrastructures.component';
import { InfrastructureNetwork } from 'src/app/models/Infrastructure-network.model';
import { DataAssociationService } from 'src/app/services/count/data-association.service';
import { Coordinate } from 'ol/coordinate';
import { EquipmentUrban } from 'src/app/models/equipament-urban.model';
import { Street } from 'src/app/models/street.model';
import { PublicPlace } from 'src/app/models/public-place.model';
@Component({
  selector: 'app-popup-options-manager',
  templateUrl: './popup-options-manager.component.html',
  styleUrls: ['./popup-options-manager.component.css']
})
export class PopupOptionsManagerComponent implements OnInit {

  @Output() associarInfra: EventEmitter<Feature> = new EventEmitter<Feature>();
  @Output() associarCity: EventEmitter<Feature> = new EventEmitter<Feature>();
  @Input() featureSelect!: Feature; 
  public hiddenState : boolean = true;
  public hiddenCounty : boolean = true;
  public hiddenDistrict : boolean = true;
  public hiddenStreet : boolean = true;
  public hiddenPublicPlace : boolean = true;
  public hiddenInfrastructure : boolean = true;
  public hiddenEstructure : boolean = true;  

  constructor(private stateMap :StateMapService, private dataAssociationService : DataAssociationService,
    public managerService : ManagerVisualizationService) {

    managerService.getSessionVisualization().subscribe(sessionVizu => {
      console.log('----------------');
      console.log(sessionVizu);
      this.hiddenPublicPlace = sessionVizu.session_public_place;
      this.hiddenInfrastructure = sessionVizu.session_infrastructure;
      this.hiddenEstructure = sessionVizu.session_estructure;
      this.hiddenStreet = sessionVizu.session_streat;
      this.hiddenDistrict = sessionVizu.session_ditrict;
      this.hiddenCounty = sessionVizu.session_county;
      this.hiddenState = sessionVizu.session_state;
    })
  }

  ngOnInit(): void {
  }

  
}
