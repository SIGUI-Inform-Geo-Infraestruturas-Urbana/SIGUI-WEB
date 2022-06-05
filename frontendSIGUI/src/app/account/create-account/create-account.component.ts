import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../shared/account.service';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  imgLogo = '/assets/images/logotipo SIGUI.png';
  createAccountForm!: FormGroup;
  account = {
    name: '',
    email: '',
    password: '',
  };

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm():void{
    this.createAccountForm = new FormGroup({
      name : new FormControl(),
      emailLogin : new FormControl(),
      password : new FormControl(),

    });
  }

  async onSubmit(){
    try{

    }
    catch(error){
      console.log(error);
    }
  }
}
