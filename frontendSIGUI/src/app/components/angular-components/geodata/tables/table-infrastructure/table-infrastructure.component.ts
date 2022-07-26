import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Infrastructure } from 'src/app/models/infrastructure.model';
import { InfrastructureManipulation } from 'src/app/services/infrastructure/infrastructure-manager/Infrastruture-manipulation.service';

@Component({
  selector: 'app-table-infrastructure',
  templateUrl: './table-infrastructure.component.html',
  styleUrls: ['./table-infrastructure.component.css']
})
export class TableInfrastructureComponent implements OnInit {

  imgLogo = '/assets/images/brasao.png';
  @Input() data!:Infrastructure;
  public county: Infrastructure;
  private vizualizationService : Subscription;
  constructor(private countyVizualization :InfrastructureManipulation ){
    this.county = new Infrastructure();
    this.vizualizationService = countyVizualization.getInfrastructureManipulation().subscribe(countySelect => {
      console.log(countySelect)    
      this.updateTable(countySelect);       
    }) 
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.vizualizationService.unsubscribe();
  }

  updateTable(countySelect: Infrastructure):void{
    this.county = countySelect;
  }
}
