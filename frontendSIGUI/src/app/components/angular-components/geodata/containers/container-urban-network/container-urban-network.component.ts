import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { InfrastructureNetwork } from 'src/app/models/Infrastructure-network.model';
import { EquipamentUrbanManipulationService } from 'src/app/services/equipamentUrban/equipamentUrban-manager/equipamentUrban-manipulation.service';
import { InfrastructureNetworkManipulation } from 'src/app/services/InfrastructureNetwork/InfrastructureNetwork-manager/InfrastructureNetwork-manipulation.service';

@Component({
  selector: 'app-container-urban-network',
  templateUrl: './container-urban-network.component.html',
  styleUrls: ['./container-urban-network.component.css']
})
export class ContainerUrbanNetworkComponent implements OnInit , OnDestroy{
  public viewData : boolean= false;
  public data: InfrastructureNetwork;
  private vizualizationService : Subscription;
  constructor(private countyVizualization :InfrastructureNetworkManipulation) {
    this.data = new InfrastructureNetwork();
    this.vizualizationService = countyVizualization.getInfrastructureNetworkVisualization().subscribe(countySelect => {
      console.log(countySelect)    
      this.updateTable(countySelect);       
    }) 
  }

  updateTable(countySelect: InfrastructureNetwork):void{
    this.data = countySelect;
    this.viewData = true;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.vizualizationService.unsubscribe();
  }
}
