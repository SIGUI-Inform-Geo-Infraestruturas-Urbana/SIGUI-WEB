import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PublicPlace } from 'src/app/models/public-place.model';
import { PublicPlaceManipulation } from 'src/app/services/public-place/public-place-manager/public-place-manipulation.service';

@Component({
  selector: 'app-container-public-place',
  templateUrl: './container-public-place.component.html',
  styleUrls: ['./container-public-place.component.css']
})
export class ContainerPublicPlaceComponent implements OnInit , OnDestroy{
  public viewData : boolean= false;
  public data: PublicPlace;
  private vizualizationService : Subscription;
  constructor(private countyVizualization :PublicPlaceManipulation) {
    this.data = new PublicPlace();
    this.vizualizationService = countyVizualization.getPublicPlaceVisualization().subscribe(countySelect => {
      console.log(countySelect)    
      this.updateTable(countySelect);       
    }) 
  }

  updateTable(countySelect: PublicPlace):void{
    this.data = countySelect;
    this.viewData = true;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.vizualizationService.unsubscribe();
  }

}
