import { Observable } from "rxjs";

export interface IRepository<T,U> {
    postData (dataSpatial:T):Observable<T>
    createData : (dataSpatial : T) => Promise<T>
    //findFetchDataObjets: (idParam : number) => Observable<T[]>; 
    findFetchData: (idParam : number) => boolean;
    findFetch: () => Observable<T[]>;
    changeData: (dataSpatial : U) => boolean;
    deleteData: (idParam : number ) => boolean;

}
