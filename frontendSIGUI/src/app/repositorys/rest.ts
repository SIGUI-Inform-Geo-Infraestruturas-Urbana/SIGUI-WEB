import { HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";

export interface IRest<T,U> {
    postData : (url :string ,dataSpatial : T) => Observable<HttpResponse<string>>;
    getData: (url :string ,idParam : string) => Observable<HttpResponse<U>>;
    getDatas: (url :string) => Observable<HttpResponse<Array<U>>>;
    putData: (url :string,dataSpatial : T) => Observable<HttpResponse<string>>;
    deleteData: (url :string,idParam : string ) => Observable<HttpResponse<string>>;
}
