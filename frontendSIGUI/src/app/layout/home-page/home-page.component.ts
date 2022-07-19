import { Component, Input, OnInit } from '@angular/core';
import { ManagerMenu } from 'src/app/models/managerMenu.model';
import { ManagerSession } from 'src/app/models/managerSession.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public managerManu!:ManagerMenu;
  isShowing: boolean = false;
  isExpanded: boolean = false;

  constructor() { 
    this.managerManu = new ManagerMenu();
  }
  
  

  ngOnInit(): void {
  }

  activeSideNav():void{
    console.log('dsadsad')
    this.isShowing= !this.isShowing;   
  }

  onClickGeoData(){
    this.managerManu = new ManagerMenu();
    this.managerManu.session_geodata =true;
  }

  onClickGeoLayers(){
    this.managerManu = new ManagerMenu();
    this.managerManu.session_layers =true;
  }



}
