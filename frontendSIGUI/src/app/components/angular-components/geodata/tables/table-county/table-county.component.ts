import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { County } from 'src/app/models/county.model';
import { CountyManipulationService } from 'src/app/services/count/county-manager/county-manipulation.service';

@Component({
  selector: 'app-table-county',
  templateUrl: './table-county.component.html',
  styleUrls: ['./table-county.component.css']
})
export class TableCountyComponent implements OnInit, OnChanges {
  imgLogo = '/assets/images/brasao.png';
  @Input() data!:County;

  public county: County;
  constructor() {
    this.county = new County();
   }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateTable(this.data)
  }

  updateTable(countySelect: County):void{
    this.county = countySelect;
  }
}
