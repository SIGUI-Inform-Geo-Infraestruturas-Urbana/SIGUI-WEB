import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { UnitFederal } from 'src/app/models/unit-federal.model';
import { UnitManipulation } from 'src/app/services/unit-federal/unit-federal-manager/unit-federal-manipulation.service';

@Component({
  selector: 'app-table-unit',
  templateUrl: './table-unit.component.html',
  styleUrls: ['./table-unit.component.css']
})
export class TableUnitComponent implements  OnInit, OnChanges {
  imgLogo = '/assets/images/brasao.png';
  @Input() data!:UnitFederal;

  public county: UnitFederal;
  constructor() {
    this.county = new UnitFederal();
   }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateTable(this.data)
  }

  updateTable(countySelect: UnitFederal):void{
    this.county = countySelect;
  }
}
