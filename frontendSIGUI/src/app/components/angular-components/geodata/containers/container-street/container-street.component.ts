import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PublicPlace } from 'src/app/models/public-place.model';
import { Street } from 'src/app/models/street.model';
import { StreetManipulation } from 'src/app/services/street/street-manipulation/street-manipulation.service';

@Component({
  selector: 'app-container-street',
  templateUrl: './container-street.component.html',
  styleUrls: ['./container-street.component.css']
})
export class ContainerStreetComponent implements OnInit , OnDestroy{
  public viewData : boolean= false;
  public data: Street;
  private vizualizationService : Subscription;
  constructor(private countyVizualization :StreetManipulation) {
    this.data = new Street();
    this.vizualizationService = countyVizualization.getStreetVisualization().subscribe(countySelect => {
      console.log(countySelect)    
      this.updateTable(countySelect);       
    }) 
  }

  updateTable(countySelect: Street):void{
    this.data = countySelect;
    this.viewData = true;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.vizualizationService.unsubscribe();
  }

}
