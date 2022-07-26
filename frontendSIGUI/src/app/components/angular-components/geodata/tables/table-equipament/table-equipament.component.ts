import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EquipmentUrban } from 'src/app/models/equipament-urban.model';
import { EquipamentUrbanManipulationService } from 'src/app/services/equipamentUrban/equipamentUrban-manager/equipamentUrban-manipulation.service';

@Component({
  selector: 'app-table-equipament',
  templateUrl: './table-equipament.component.html',
  styleUrls: ['./table-equipament.component.css']
})
export class TableEquipamentComponent implements OnInit {

  imgLogo = '/assets/images/brasao.png';
  @Input() data!:EquipmentUrban;
  public county: EquipmentUrban;
  private vizualizationService : Subscription;
  constructor(private countyVizualization :EquipamentUrbanManipulationService ){
    this.county = new EquipmentUrban();
    this.vizualizationService = countyVizualization.getEquipamentUrbanVisualization().subscribe(countySelect => {
      console.log(countySelect)    
      this.updateTable(countySelect);       
    }) 
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.vizualizationService.unsubscribe();
  }

  updateTable(countySelect: EquipmentUrban):void{
    this.county = countySelect;
  }

}
