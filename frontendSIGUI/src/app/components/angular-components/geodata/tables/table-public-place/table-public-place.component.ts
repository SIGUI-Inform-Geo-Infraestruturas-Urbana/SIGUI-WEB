import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PublicPlace } from 'src/app/models/public-place.model';
import { PublicPlaceManipulation } from 'src/app/services/public-place/public-place-manager/public-place-manipulation.service';

@Component({
  selector: 'app-table-public-place',
  templateUrl: './table-public-place.component.html',
  styleUrls: ['./table-public-place.component.css']
})
export class TablePublicPlaceComponent implements OnInit {

  @Input() data!:PublicPlace;
  public county: PublicPlace;
  private vizualizationService : Subscription;
  constructor(private countyVizualization :PublicPlaceManipulation) {
    this.county = new PublicPlace();
    this.vizualizationService = countyVizualization.getPublicPlaceManipulation().subscribe(countySelect => {
      console.log(countySelect)    
      this.updateTable(countySelect);       
    }) 
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.vizualizationService.unsubscribe();
  }

  updateTable(countySelect: PublicPlace):void{
    this.county = countySelect;
  }

}
