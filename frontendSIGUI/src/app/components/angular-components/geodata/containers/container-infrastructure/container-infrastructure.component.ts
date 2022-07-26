import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Infrastructure } from 'src/app/models/infrastructure.model';
import { InfrastructureManipulation } from 'src/app/services/infrastructure/infrastructure-manager/Infrastruture-manipulation.service';

@Component({
  selector: 'app-container-infrastructure',
  templateUrl: './container-infrastructure.component.html',
  styleUrls: ['./container-infrastructure.component.css']
})
export class ContainerInfrastructureComponent implements OnInit , OnDestroy{
  public viewData : boolean= false;
  public data: Infrastructure;
  private vizualizationService : Subscription;
  constructor(private countyVizualization :InfrastructureManipulation) {
    this.data = new Infrastructure();
    this.vizualizationService = countyVizualization.getInfrastructureVisualization().subscribe(countySelect => {
      console.log(countySelect)    
      this.updateTable(countySelect);       
    }) 
  }

  updateTable(countySelect: Infrastructure):void{
    this.data = countySelect;
    this.viewData = true;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.vizualizationService.unsubscribe();
  }
}
