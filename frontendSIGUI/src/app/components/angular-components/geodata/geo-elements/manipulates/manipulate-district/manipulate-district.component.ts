import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { District } from 'src/app/models/district.model';
import { ManagerSession } from 'src/app/models/managerSession.model';
import { DistrictRepositoryService } from 'src/app/repositorys/district-repository.service';
import { UnitFederativeRepositoryService } from 'src/app/repositorys/unit-federative-repository.service';
import { ManagerVisualizationService } from 'src/app/services/shared/visualization/manager-visualization.service';
import { ModalFilesCountyComponent } from '../../../modals/modal-files-county/modal-files-county.component';
import { ModalFilesDistrictComponent } from '../../../modals/modal-files-district/modal-files-district.component';


@Component({
  selector: 'app-manipulate-district',
  templateUrl: './manipulate-district.component.html',
  styleUrls: ['./manipulate-district.component.scss']
})
export class ManipulateDistrictComponent implements OnInit {

  public searchForm!: FormGroup;
  public managerSession : ManagerSession;

  constructor(public managerVisualization : ManagerVisualizationService, 
    public districtRepositoryService : DistrictRepositoryService,
    public unitFederativeRepositoryService : UnitFederativeRepositoryService,   
    public route: ActivatedRoute , public router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) {

    this.managerSession = new ManagerSession();    
   }

  ngOnInit(): void {  
    this.searchForm = new FormGroup({
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

  addLayerVetores(){
    this.districtRepositoryService.findFetch() //.pipe(catchError(()=> { return throwError (() => new Error ("Teste de Tratamento")); }))    
    .subscribe({
      next: (beers : District[]) => {
        console.log(beers);
        this.districtRepositoryService.populateServiceViewMap(beers)
      },
      error: (err:HttpErrorResponse) => {
        console.log('TRATAR');
        console.log(err);
        this.openSnackBar(err.statusText);
        //this._counties.error(err);
      },
    });
  }

  getFeatureCounty(){
    let idSearch = this.searchForm.get('idMunicipio')?.value;
    
    this.districtRepositoryService.findFetch(idSearch) //.pipe(catchError(()=> { return throwError (() => new Error ("Teste de Tratamento")); }))    
    .subscribe({
      next: (districtSearch : District[]) => {
        if (districtSearch.length != 0)
        {
          this.districtRepositoryService.populateServiceViewMap(districtSearch)
        }
        else{
          this.openSnackBar('O {ID} não foi encontrado!');
        }   
      },
      error: (err:HttpErrorResponse) => {
        console.log('TRATAR');
        console.log(err);
        this.openSnackBar(err.statusText);
        //this._counties.error(err);
      },
    });
   }
  

  onClickSelectCounty(){

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
      session_network : false  
    }
    this.managerVisualization.setSessionVisualization(this.managerSession);
  }

  onClickShapeFile(){
    const dialogRef = this.dialog.open(ModalFilesDistrictComponent, {
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
