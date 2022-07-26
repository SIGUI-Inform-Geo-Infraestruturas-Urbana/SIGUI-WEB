import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { County } from 'src/app/models/county.model';
import { CountyManipulationService } from 'src/app/services/count/county-manager/county-manipulation.service';

@Component({
  selector: 'app-table-county',
  templateUrl: './table-county.component.html',
  styleUrls: ['./table-county.component.css']
})
export class TableCountyComponent implements OnInit, OnDestroy {
  imgLogo = '/assets/images/brasao.png';

  public county: County;
  private vizualizationService : Subscription;
  constructor(private countyVizualization :CountyManipulationService) {
    this.county = new County();
    this.vizualizationService = countyVizualization.getCountyVisualization().subscribe(countySelect => {
      console.log(countySelect)    
      this.updateTable(countySelect);       
    }) 
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.vizualizationService.unsubscribe();
  }

  updateTable(countySelect: County):void{
    this.county = countySelect;
  }
}
