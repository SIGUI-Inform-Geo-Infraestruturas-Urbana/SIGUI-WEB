import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { District } from 'src/app/models/district.model';
import { DistrictManipulationService } from 'src/app/services/district/district-manager/district-manipulation.service';

@Component({
  selector: 'app-table-district',
  templateUrl: './table-district.component.html',
  styleUrls: ['./table-district.component.css']
})
export class TableDistrictComponent implements  OnInit, OnChanges {
  imgLogo = '/assets/images/brasao.png';
  @Input() data!:District;

  public county: District;
  constructor() {
    this.county = new District();
   }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateTable(this.data)
  }

  updateTable(countySelect: District):void{
    this.county = countySelect;
  }
}
