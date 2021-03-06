import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PublicPlace } from 'src/app/models/public-place.model';
import { UnitFederal } from 'src/app/models/unit-federal.model';
import { UnitManipulation } from 'src/app/services/unit-federal/unit-federal-manager/unit-federal-manipulation.service';

@Component({
  selector: 'app-container-unit',
  templateUrl: './container-unit.component.html',
  styleUrls: ['./container-unit.component.css']
})
export class ContainerUnitComponent implements OnInit , OnDestroy{
  public viewData : boolean= false;
  public data: UnitFederal;
  private vizualizationService : Subscription;
  constructor(private countyVizualization :UnitManipulation) {
    this.data = new UnitFederal();
    this.vizualizationService = countyVizualization.getUnitVisualization().subscribe(countySelect => {
      console.log(countySelect)    
      this.updateTable(countySelect);       
    }) 
  }

  updateTable(countySelect: UnitFederal):void{
    this.data = countySelect;
    this.viewData = true;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.vizualizationService.unsubscribe();
  }

}
