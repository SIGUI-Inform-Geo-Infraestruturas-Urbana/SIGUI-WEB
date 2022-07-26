import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UnitFederal } from 'src/app/models/unit-federal.model';
import { UnitManipulation } from 'src/app/services/unit-federal/unit-federal-manager/unit-federal-manipulation.service';

@Component({
  selector: 'app-table-unit',
  templateUrl: './table-unit.component.html',
  styleUrls: ['./table-unit.component.css']
})
export class TableUnitComponent implements OnInit {
  @Input() data!:UnitFederal;
  imgLogo = '/assets/images/brasao.png';

  public county: UnitFederal;
  private vizualizationService : Subscription;
  constructor(private countyVizualization :UnitManipulation) {
    this.county = new UnitFederal();
    this.vizualizationService = countyVizualization.getUnitVisualization().subscribe(countySelect => {
      console.log(countySelect)    
      this.updateTable(countySelect);       
    }) 
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.vizualizationService.unsubscribe();
  }

  updateTable(countySelect: UnitFederal):void{
    this.county = countySelect;
  }

}
