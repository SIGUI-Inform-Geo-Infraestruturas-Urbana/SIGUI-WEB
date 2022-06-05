import { Observable } from "rxjs";

export interface Repository {
    getEntity : (id : number) => Observable<any>;
    // postEntity : () => any;    

}
