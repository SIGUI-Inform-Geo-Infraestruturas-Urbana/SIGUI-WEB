import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { InfrastructureNetwork } from 'src/app/models/Infrastructure-network.model';
import { Network } from 'src/app/models/network.model';
import { InfrastructureManipulation } from 'src/app/services/infrastructure/infrastructure-manager/Infrastruture-manipulation.service';
import { InfrastructureNetworkManipulation } from 'src/app/services/InfrastructureNetwork/InfrastructureNetwork-manager/InfrastructureNetwork-manipulation.service';

@Component({
  selector: 'app-table-network',
  templateUrl: './table-network.component.html',
  styleUrls: ['./table-network.component.css']
})
export class TableNetworkComponent implements OnInit {

  imgLogo = '/assets/images/brasao.png';
  @Input() data!:InfrastructureNetwork;

  public county: InfrastructureNetwork;
  private vizualizationService : Subscription;
  constructor(private countyVizualization :InfrastructureNetworkManipulation ){
    this.county = new InfrastructureNetwork();
    this.vizualizationService = countyVizualization.getInfrastructureNetworkVisualization().subscribe(countySelect => {
      console.log(countySelect)    
      this.updateTable(countySelect);       
    }) 
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.vizualizationService.unsubscribe();
  }

  updateTable(countySelect: InfrastructureNetwork):void{
    this.county = countySelect;
  }

}
