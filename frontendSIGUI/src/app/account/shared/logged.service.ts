import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoggedService {
  private loginUserState= new BehaviorSubject<boolean>(true);
  constructor() { }

  getStatus(){
    return this.loginUserState.asObservable();
  }

  definedToken(token : string){
     this.loginUserState.next(true);    
  }

  logout(){
    this.loginUserState.next(false);    
  }

}
