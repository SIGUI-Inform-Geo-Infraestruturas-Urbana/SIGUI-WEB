import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { District } from 'src/app/models/district.model';
import { DistrictManipulationService } from 'src/app/services/district/district-manager/district-manipulation.service';

@Component({
  selector: 'app-table-district',
  templateUrl: './table-district.component.html',
  styleUrls: ['./table-district.component.css']
})
export class TableDistrictComponent implements OnInit {

  imgLogo = '/assets/images/brasao.png';
  @Input() data!:District;

  public county: District;
  private vizualizationService : Subscription;
  constructor(private countyVizualization :DistrictManipulationService) {
    this.county = new District();
    this.vizualizationService = countyVizualization.getDistrictVisualization().subscribe(countySelect => {
      console.log(countySelect)    
      this.updateTable(countySelect);       
    }) 
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.vizualizationService.unsubscribe();
  }

  updateTable(countySelect: District):void{
    this.county = countySelect;
  }

}
