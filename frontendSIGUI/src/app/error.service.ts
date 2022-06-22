import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';

import {Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogPopUpComponent} from './dialog-pop-up/dialog-pop-up.component'

@Injectable({
  providedIn: 'root'
})
export class ErrorService implements ErrorHandler{

  constructor(public dialog : MatDialog) { }
  handleError(error: any): void {
    if (Error instanceof HttpErrorResponse)
    {
      console.log(error.status)
      this.openDialog();
    }
    else {
      console.error('error ocorrido')
      this.openDialog();
    }
  }

  openDialog(){
    this.dialog.open(DialogPopUpComponent,{
      data : {
        texto : 'Não foi possivel conclir o Processo!',
      }
    })
  }

}
