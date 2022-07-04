import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagerSession } from 'src/app/models/managerSession.model';
import { UnitFederativeRepositoryService } from 'src/app/repositorys/unit-federative-repository.service';
import { ManagerVisualizationService } from 'src/app/services/shared/visualization/manager-visualization.service';

@Component({
  selector: 'app-expansion-unit',
  templateUrl: './expansion-unit.component.html',
  styleUrls: ['./expansion-unit.component.css']
})
export class ExpansionUnitComponent implements OnInit {
  
  public searchStateForm!: FormGroup;
  public managerSession!: ManagerSession;
  
  constructor(public unitFederativeRepositoryService : UnitFederativeRepositoryService,
    public managerVisualization : ManagerVisualizationService,
    public route: ActivatedRoute , public router: Router) { 

      managerVisualization.getSessionVisualization().subscribe(sessionVizu => {
        console.log('----------------');
        console.log(sessionVizu);
        this.managerSession = sessionVizu;
      })
    }

  ngOnInit(): void {
    this.searchStateForm = new FormGroup({
      idState: new FormControl(),
    });
  }

  getFeatureState(){
    let idSearch = this.searchStateForm.get('idState')?.value;
    //this.getState.emit(idSearch);
    this.unitFederativeRepositoryService.findFetchData(idSearch); 
  }

  onClickSelectState(){

    this.managerSession = {
      session_visualization : false,
      session_county: false,
      session_country: false,
      session_ditrict : false,
      session_streat: false,
      session_public_place : false,
      session_state: true,
      session_infrastructure: false,
      session_estructure : false,   
    }
    this.managerVisualization.setSessionVisualization(this.managerSession); 
    this.router.navigate(['manager-state'],{relativeTo:this.route});
  }

  addLayerVetorState(){
    this.unitFederativeRepositoryService.findFetchData(); 
  }


  onClickState(){   
    //this.router.navigateByUrl('/geo-view/manager-city');
    console.log('chamou')
    this.router.navigate(['manager-file-state'],{relativeTo:this.route});
  }

}
