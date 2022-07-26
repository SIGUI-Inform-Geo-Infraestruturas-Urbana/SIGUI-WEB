import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ManagerSession } from 'src/app/models/managerSession.model';

@Component({
  selector: 'app-geodata-manager',
  templateUrl: './geodata-manager.component.html',
  styleUrls: ['./geodata-manager.component.scss']
})
export class GeodataManagerComponent implements OnInit, OnChanges {

  @Input() Vizualizaton!:ManagerSession;
  managerVizualizaton :ManagerSession;

  public isShowing: boolean = true;
  public isShowingNavRight: boolean = false;
  public isShowingButtonNavRight: boolean = false;
  public isExpanded: boolean = true;
  public sizeSidenav: number = 100;

  constructor() { 
    this.managerVizualizaton = new ManagerSession();
    this.managerVizualizaton.session_county = true;
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // let a = changes['managerVizualizaton'].currentValue();
    // this.managerVizualizaton = a;
  }

  openDialog(){
  //  this.dialog.open(ManagerFilePopupComponent)
  }

  openUnit(){
    this.managerVizualizaton = new ManagerSession();
    this.managerVizualizaton.session_state = true;
    console.log('clicoy')
    console.log(this.managerVizualizaton)
  }
  openCounty(){
    this.managerVizualizaton = new ManagerSession();   
    this.managerVizualizaton.session_county = true;
  }
  openDistrict(){
    this.managerVizualizaton = new ManagerSession();   
    this.managerVizualizaton.session_ditrict = true;
  }
  openStreet(){
    this.managerVizualizaton = new ManagerSession();   
    this.managerVizualizaton.session_streat = true;
  }
  openPublicPlace(){
    this.managerVizualizaton = new ManagerSession();   
    this.managerVizualizaton.session_public_place = true;
  }
  openInfrastructure(){
    this.managerVizualizaton = new ManagerSession();   
    this.managerVizualizaton.session_infrastructure = true;
  }
  openEquipamentUrban(){
    this.managerVizualizaton = new ManagerSession();   
    this.managerVizualizaton.session_estructure = true;
  }
  openNetwork(){
    this.managerVizualizaton = new ManagerSession();   
    this.managerVizualizaton.session_network = true;
  }
  
}
