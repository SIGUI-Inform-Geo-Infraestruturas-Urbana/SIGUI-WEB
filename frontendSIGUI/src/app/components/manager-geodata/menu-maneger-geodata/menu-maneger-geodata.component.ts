import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ManagerVisualizationService } from '../../../services/shared/visualization/manager-visualization.service'
import { ManagerSession} from '../../../models/managerSession.model'
import { ActivatedRoute ,Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { CountyRepositoryService } from 'src/app/repositorys/county-repository.service';
import { UnitFederativeRepositoryService } from 'src/app/repositorys/unit-federative-repository.service';
import { DistrictRepositoryService } from 'src/app/repositorys/district-repository.service';
import { InfrastructureRepositoryService } from 'src/app/repositorys/infrastructure-repository.service';

@Component({
  selector: 'app-menu-maneger-geodata',
  templateUrl: './menu-maneger-geodata.component.html',
  styleUrls: ['./menu-maneger-geodata.component.css']
})
export class MenuManegerGeodataComponent implements OnInit {

  @Output() getState= new EventEmitter();
  @Output() getCounty = new EventEmitter();
  @Output() getDistrict = new EventEmitter();

  public managerSession : ManagerSession;
  public searchStateForm!: FormGroup;
  public searchCountyForm!: FormGroup;
  public searchDistrictForm!: FormGroup;
  //
  panelOpenState!:boolean
  panelOpenAdFileMunicios!:boolean
  panelOpenAdMunicios!:boolean //(click)="panelOpenAdMunicios=!panelOpenAdMunicios"
  //

  constructor(public managerVisualization : ManagerVisualizationService, 
    public countyRepositoryService : CountyRepositoryService,
    public unitFederativeRepositoryService : UnitFederativeRepositoryService,
    public districtRepositoryService : DistrictRepositoryService,
    public InfrastructureRepository : InfrastructureRepositoryService,
    public route: ActivatedRoute , public router: Router) {
    this.managerSession = new ManagerSession();
   }

  ngOnInit(): void {
    this.searchStateForm = new FormGroup({
      idState: new FormControl(),
    });
    this.searchCountyForm = new FormGroup({
      idMunicipio: new FormControl(),
    });
    this.searchDistrictForm = new FormGroup({
      idDistrict: new FormControl(),
    });
  }

  addLayerVetorMunicipios(){

  }
  
  addLayerVetorState(){

  }

  addLayerVetorCounties(){

  }

  addLayerVetorFerativeUnit(){
    
  }

  getFeatureState(){
    let idSearch = this.searchStateForm.get('idState')?.value;
    //this.getState.emit(idSearch);
    this.unitFederativeRepositoryService.findFetchData(idSearch); 
  }
  getFeatureCounty(){
    let idSearch = this.searchCountyForm.get('idMunicipio')?.value;
    // this.getCounty.emit(idSearch);
    this.countyRepositoryService.findFetchData(idSearch); 
  }
  getFeatureDistrict(){
    let idSearch = this.searchDistrictForm.get('idDistrict')?.value;
    this.getDistrict.emit(idSearch);
    this.districtRepositoryService.findFetchData(idSearch); 
  }
  getFeatureInfrastructure(){
    this.InfrastructureRepository.findFetchData(); 
  }

  onClickSelectCounty(){

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
    this.router.navigate(['manager-city'],{relativeTo:this.route});
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

  onClickSelectDistrict(){

    this.managerSession = {
      session_visualization : false,
      session_county: false,
      session_country: false,
      session_ditrict : true,
      session_streat: false,
      session_public_place : false,
      session_state: false,
      session_infrastructure: false,
      session_estructure : false,  
     
    }
    this.managerVisualization.setSessionVisualization(this.managerSession); 
    this.router.navigate(['manager-district'],{relativeTo:this.route});
  }

  onClickSelectStreet(){
    this.managerSession = {
      session_visualization : false,
      session_county: false,
      session_country: false,
      session_ditrict : false,
      session_streat: true,
      session_public_place : false,
      session_state: false,
      session_infrastructure: false,
      session_estructure : false,  
    }
    this.managerVisualization.setSessionVisualization(this.managerSession); 
    this.router.navigate(['manager-street'],{relativeTo:this.route});
  }

  onClickSelectPublicPlace(){
    this.managerSession = {
      session_visualization : false,
      session_county: false,
      session_country: false,
      session_ditrict : false,
      session_streat: false,
      session_public_place : true,
      session_state: false,
      session_infrastructure: false,
      session_estructure : false,  
    }
    this.managerVisualization.setSessionVisualization(this.managerSession); 
    this.router.navigate(['manager-public-place'],{relativeTo:this.route});
  }

  onClickSelectInfrastructure(){

    this.managerSession = {
      session_visualization : false,
      session_county: false,
      session_country: false,
      session_ditrict : false,
      session_streat: false,
      session_public_place : false,
      session_state: false,
      session_infrastructure: true,
      session_estructure : false,  
     
    }
    console.log('odfdsfdsfdsfdsfdsf')
    this.managerVisualization.setSessionVisualization(this.managerSession);
    //this.router.navigateByUrl('/geo-view/manager-city');
    this.router.navigate(['infrastructure'],{relativeTo:this.route});
  }
  
  onClickEquipamentFile(){  
    
    this,this.managerSession = {
      session_visualization : false,
      session_county: false,
      session_country: false,
      session_ditrict : false,
      session_streat: false,
      session_public_place : false,
      session_state: false,
      session_infrastructure: false,
      session_estructure : true,  
    }
    //this.router.navigateByUrl('/geo-view/manager-city');
    this.managerVisualization.setSessionVisualization(this.managerSession); 
    this.router.navigate(['manager-equipament'],{relativeTo:this.route});
  }





  //manager-file

  onClickCountyFile(){   
    //this.router.navigateByUrl('/geo-view/manager-city');
    this.router.navigate(['manager-file'],{relativeTo:this.route});
  }
}
