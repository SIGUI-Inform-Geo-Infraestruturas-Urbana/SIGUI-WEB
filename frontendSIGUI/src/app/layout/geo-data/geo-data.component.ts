import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ManagerFilePopupComponent } from 'src/app/components/dialogs-components/manager-file-popup/manager-file-popup.component';

@Component({
  selector: 'app-geo-data',
  templateUrl: './geo-data.component.html',
  styleUrls: ['./geo-data.component.scss']
})
export class GeoDataComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  isShowing: boolean = true;
  isShowingNavRight: boolean = true;
  isExpanded: boolean = true;
  sizeSidenav: number = 100;

  ngOnInit(): void {
  }

  openDialog(){
    this.dialog.open(ManagerFilePopupComponent)
  }

}
