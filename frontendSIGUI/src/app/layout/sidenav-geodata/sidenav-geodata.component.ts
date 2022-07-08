import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav-geodata',
  templateUrl: './sidenav-geodata.component.html',
  styleUrls: ['./sidenav-geodata.component.scss']
})
export class SidenavGeodataComponent implements OnInit {

  isShowing: boolean = true;
  isExpanded: boolean = true
  ;
  constructor() { }

  ngOnInit(): void {
  }

}
