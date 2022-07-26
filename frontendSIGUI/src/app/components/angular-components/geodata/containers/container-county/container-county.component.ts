import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { County } from 'src/app/models/county.model';
import { CountyManipulationService } from 'src/app/services/count/county-manager/county-manipulation.service';

@Component({
  selector: 'app-container-county',
  templateUrl: './container-county.component.html',
  styleUrls: ['./container-county.component.scss']
})
export class ContainerCountyComponent implements OnInit , OnDestroy{
  public viewData : boolean= false;
  public data: County;
  private vizualizationService : Subscription;
  constructor(private countyVizualization :CountyManipulationService) {
    this.data = new County();
    this.vizualizationService = countyVizualization.getCountyVisualization().subscribe(countySelect => {
      console.log(countySelect)    
      this.updateTable(countySelect);       
    }) 
  }

  updateTable(countySelect: County):void{
    this.data = countySelect;
    this.viewData = true;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.vizualizationService.unsubscribe();
  }

}
