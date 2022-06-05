import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../shared/account.service';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  imgLogo = '/assets/images/logotipo SIGUI.png';
  loginForm!: FormGroup;
  Login = {
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
    this.loginForm = new FormGroup({
      emailLogin : new FormControl(),
      password : new FormControl(),

    });
  }

  async onSubmit(){
    try{
      const result = await this.accountService.login(this.Login);
      console.log(`Login efetuado: ${result}`);
      this.router.navigate(['']);
    }
    catch(error){
      console.log(error);
    }
  }

}
