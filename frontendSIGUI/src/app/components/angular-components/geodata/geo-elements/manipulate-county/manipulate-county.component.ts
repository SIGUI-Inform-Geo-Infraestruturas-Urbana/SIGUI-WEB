import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { County } from 'src/app/models/county.model';
import { ManagerSession } from 'src/app/models/managerSession.model';
import { CountyRepositoryService } from 'src/app/repositorys/county-repository.service';
import { UnitFederativeRepositoryService } from 'src/app/repositorys/unit-federative-repository.service';
import { ManagerVisualizationService } from 'src/app/services/shared/visualization/manager-visualization.service';
import { SnackAlertComponent } from 'src/app/snack-alert/snack-alert.component';
import { ModalFilesCountyComponent } from '../../modals/modal-files-county/modal-files-county.component';
import { ModalFilesUnitComponent } from '../../modals/modal-files-unit/modal-files-unit.component';

@Component({
  selector: 'app-manipulate-county',
  templateUrl: './manipulate-county.component.html',
  styleUrls: ['./manipulate-county.component.scss']
})
export class ManipulateCountyComponent implements OnInit {

  public searchCountyForm!: FormGroup;
  public managerSession : ManagerSession;

  constructor(public managerVisualization : ManagerVisualizationService, 
    public countyRepositoryService : CountyRepositoryService,
    public unitFederativeRepositoryService : UnitFederativeRepositoryService,   
    public route: ActivatedRoute , public router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) {

    this.managerSession = new ManagerSession();
    this.countyRepositoryService.getCounties()
    //.pipe(catchError(()=> { return throwError (() => new Error ("Teste de Tratamento")); }))    
    .subscribe({
      next: (beers : County[]) => {
        console.log(beers);
      },
      error: (err:HttpErrorResponse) => {
        console.log('TRATAR');
        console.log(err);
        this.openSnackBar(err.statusText);
        //this._counties.error(err);
      },
    });
   }

  ngOnInit(): void {  
    this.searchCountyForm = new FormGroup({
      idMunicipio: new FormControl(),
      idState: new FormControl()
    });    
  }

  // openSnackBar() {
  //   this._snackBar.openFromComponent(SnackAlertComponent, {
  //     duration: 5 * 1000,
  //   });
  // }

  openSnackBar(mensagem : string) {
    this._snackBar.open(mensagem, 'Entendido!', {
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  addLayerVetorMunicipios(){
    this.countyRepositoryService.findFetchData(); 
  }

  getFeatureCounty(){
    let idSearch = this.searchCountyForm.get('idMunicipio')?.value;
    // this.getCounty.emit(idSearch);
    this.countyRepositoryService.findFetchData(idSearch); 
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
    //this.router.navigate(['manager-city'],{relativeTo:this.route});
  }

  onClickShapeFile(){
    const dialogRef = this.dialog.open(ModalFilesCountyComponent, {
      width: '800px',
      height: '400px',
      //data: {name: this.name, animal: this.animal},
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }

}
