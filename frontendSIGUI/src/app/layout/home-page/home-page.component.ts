import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor() { }
  isShowing: boolean = false;
  isExpanded: boolean = false;
  

  ngOnInit(): void {
  }

  activeSideNav():void{
    console.log('dsadsad')
    this.isShowing= !this.isShowing;   
  }

}
