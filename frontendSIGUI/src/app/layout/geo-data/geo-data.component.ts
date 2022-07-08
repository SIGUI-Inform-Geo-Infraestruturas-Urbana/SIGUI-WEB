import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-geo-data',
  templateUrl: './geo-data.component.html',
  styleUrls: ['./geo-data.component.scss']
})
export class GeoDataComponent implements OnInit {

  constructor() { }

  isShowing: boolean = true;
  isShowingNavRight: boolean = true;
  isExpanded: boolean = true;
  sizeSidenav: number = 100;

  ngOnInit(): void {
  }

}
