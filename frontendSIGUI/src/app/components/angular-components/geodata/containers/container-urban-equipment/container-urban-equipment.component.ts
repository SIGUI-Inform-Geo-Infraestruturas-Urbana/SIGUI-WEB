import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EquipmentUrban } from 'src/app/models/equipament-urban.model';
import { PublicPlace } from 'src/app/models/public-place.model';
import { EquipamentUrbanManipulationService } from 'src/app/services/equipamentUrban/equipamentUrban-manager/equipamentUrban-manipulation.service';
import { PublicPlaceManipulation } from 'src/app/services/public-place/public-place-manager/public-place-manipulation.service';

@Component({
  selector: 'app-container-urban-equipment',
  templateUrl: './container-urban-equipment.component.html',
  styleUrls: ['./container-urban-equipment.component.css']
})
export class ContainerUrbanEquipmentComponent implements OnInit , OnDestroy{
  public viewData : boolean= false;
  public data: EquipmentUrban;
  private vizualizationService : Subscription;
  constructor(private countyVizualization :EquipamentUrbanManipulationService) {
    this.data = new EquipmentUrban();
    this.vizualizationService = countyVizualization.getEquipamentUrbanVisualization().subscribe(countySelect => {
      console.log(countySelect)    
      this.updateTable(countySelect);       
    }) 
  }

  updateTable(countySelect: EquipmentUrban):void{
    this.data = countySelect;
    this.viewData = true;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.vizualizationService.unsubscribe();
  }

}
