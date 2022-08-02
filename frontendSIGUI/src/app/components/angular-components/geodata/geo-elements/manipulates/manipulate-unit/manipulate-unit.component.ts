import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { District } from 'src/app/models/district.model';
import { ManagerSession } from 'src/app/models/managerSession.model';
import { UnitFederal } from 'src/app/models/unit-federal.model';
import { DistrictRepositoryService } from 'src/app/repositorys/district-repository.service';
import { UnitFederativeRepositoryService } from 'src/app/repositorys/unit-federative-repository.service';
import { ManagerVisualizationService } from 'src/app/services/shared/visualization/manager-visualization.service';
import { ModalFilesCountyComponent } from '../../../modals/modal-files-county/modal-files-county.component';
import { ModalFilesUnitComponent } from '../../../modals/modal-files-unit/modal-files-unit.component';


@Component({
  selector: 'app-manipulate-unit',
  templateUrl: './manipulate-unit.component.html',
  styleUrls: ['./manipulate-unit.component.scss']
})
export class ManipulateUnitComponent implements OnInit {

  public searchForm!: FormGroup;
  public managerSession : ManagerSession;

  constructor(public managerVisualization : ManagerVisualizationService, 
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
    this.unitFederativeRepositoryService.findFetch() //.pipe(catchError(()=> { return throwError (() => new Error ("Teste de Tratamento")); }))    
    .subscribe({
      next: (beers : UnitFederal[]) => {
        console.log(beers);
        this.unitFederativeRepositoryService.populateServiceViewMap(beers)
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
    let unitS: UnitFederal[] = [];
    console.log('getFeatureCounty')
    let idSearch = this.searchForm.get('idMunicipio')?.value;
    
    this.unitFederativeRepositoryService.findFetch(idSearch) //.pipe(catchError(()=> { return throwError (() => new Error ("Teste de Tratamento")); }))    
   // .pipe(take(1))
    .subscribe({
      next: (unitSearch : UnitFederal[]) => {
        console.log('consulta estado')
        console.log(unitSearch)
        unitS = unitSearch;       
      },
      error: (err:HttpErrorResponse) => {
        console.log('TRATAR');
        console.log(err);
        this.openSnackBar(err.statusText);
        //this._counties.error(err);
      },
      complete : () => {
        if (unitS.length != 0)
        {
          console.log('consulta aaa')
          this.unitFederativeRepositoryService.populateServiceViewMap(unitS)
          //this.openSnackBar('O {ID} foi encontrado!');
        }
        else{
          console.log('err estado')
          this.openSnackBar('O {ID} não foi encontrado!');
        } 
      }
    });
   }
  

  onClickSelectCounty(){

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
      session_network : false  
    }
    this.managerVisualization.setSessionVisualization(this.managerSession);
  }

  onClickShapeFile(){
    const dialogRef = this.dialog.open(ModalFilesUnitComponent, {
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
