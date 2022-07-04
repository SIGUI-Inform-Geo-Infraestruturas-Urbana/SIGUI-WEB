import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagerSession } from 'src/app/models/managerSession.model';
import { ManagerVisualizationService } from 'src/app/services/shared/visualization/manager-visualization.service';

@Component({
  selector: 'app-user-zone',
  templateUrl: './user-zone.component.html',
  styleUrls: ['./user-zone.component.css']
})
export class UserZoneComponent implements OnInit {

  imgCorLogo = '/assets/images/logotipo SIGUI.png';
  imgLogo = '/assets/images/logoSIGUi.png';

  public managerSession!: ManagerSession;

  constructor(public managerVisualization : ManagerVisualizationService, 
    public router: Router, public route: ActivatedRoute ) { }

  ngOnInit(): void {
  }

  managerCounty(): void {
    this.managerSession = {
      session_visualization : false,
      session_county: true,
      session_country: false,
      session_ditrict : false,
      session_streat: false,
      session_public_place : false,
      session_state: false,
      session_infrastructure: false,
      session_estructure : false,     
    }
    this.managerVisualization.setSessionVisualization(this.managerSession);
    //this.router.navigateByUrl('/geo-view/manager-city');
    this.router.navigate(['geo-view'],{relativeTo:this.route});
  }
  managerUnit(): void{
    this.managerSession = {
      session_visualization : false,
      session_county: false,
      session_country: false,
      session_ditrict : false,
      session_streat: false,
      session_public_place : false,
      session_state: false,
      session_infrastructure: false,
      session_estructure : false,     
    }
    this.managerVisualization.setSessionVisualization(this.managerSession);
    //this.router.navigateByUrl('/geo-view/manager-city');
    this.router.navigate(['geo-data'],{relativeTo:this.route});
  }

}
