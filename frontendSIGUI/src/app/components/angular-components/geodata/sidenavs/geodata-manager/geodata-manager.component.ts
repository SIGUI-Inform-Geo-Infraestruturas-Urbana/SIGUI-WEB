import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ManagerSession } from 'src/app/models/managerSession.model';

@Component({
  selector: 'app-geodata-manager',
  templateUrl: './geodata-manager.component.html',
  styleUrls: ['./geodata-manager.component.scss']
})
export class GeodataManagerComponent implements OnInit, OnChanges {

  @Input() managerVizualizaton!:ManagerSession;
  public isShowing: boolean = true;
  public isShowingNavRight: boolean = false;
  public isShowingButtonNavRight: boolean = false;
  public isExpanded: boolean = true;
  public sizeSidenav: number = 100;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // let a = changes['managerVizualizaton'].currentValue();
    // this.managerVizualizaton = a;
  }

  openDialog(){
  //  this.dialog.open(ManagerFilePopupComponent)
  }
}
