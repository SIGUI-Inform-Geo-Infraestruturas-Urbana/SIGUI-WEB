import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { District } from 'src/app/models/district.model';
import { DistrictManipulationService } from 'src/app/services/district/district-manager/district-manipulation.service';

@Component({
  selector: 'app-container-district',
  templateUrl: './container-district.component.html',
  styleUrls: ['./container-district.component.scss']
})
export class ContainerDistrictComponent implements OnInit , OnDestroy{
  public viewData : boolean= false;
  public data: District;
  private vizualizationService : Subscription;
  constructor(private countyVizualization :DistrictManipulationService) {
    this.data = new District();
    this.vizualizationService = countyVizualization.getDistrictVisualization().subscribe(countySelect => {
      console.log(countySelect)    
      this.updateTable(countySelect);       
    }) 
  }

  updateTable(countySelect: District):void{
    this.data = countySelect;
    this.viewData = true;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.vizualizationService.unsubscribe();
  }
}
