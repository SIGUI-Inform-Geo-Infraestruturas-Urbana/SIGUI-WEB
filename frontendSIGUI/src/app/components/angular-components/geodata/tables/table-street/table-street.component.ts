import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Street } from 'src/app/models/street.model';
import { StreetManipulation } from 'src/app/services/street/street-manipulation/street-manipulation.service';

@Component({
  selector: 'app-table-street',
  templateUrl: './table-street.component.html',
  styleUrls: ['./table-street.component.css']
})
export class TableStreetComponent implements OnInit {

  @Input() data!:Street;
  imgLogo = '/assets/images/brasao.png';

  public county: Street;
  private vizualizationService : Subscription;
  constructor(private countyVizualization :StreetManipulation) {
    this.county = new Street();
    this.vizualizationService = countyVizualization.getStreetVisualization().subscribe(countySelect => {
      console.log(countySelect)    
      this.updateTable(countySelect);       
    }) 
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.vizualizationService.unsubscribe();
  }

  updateTable(countySelect: Street):void{
    this.county = countySelect;
  }

}
