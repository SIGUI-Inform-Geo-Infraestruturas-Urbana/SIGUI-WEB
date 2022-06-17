import { Observable } from "rxjs";

export interface IRepository<T,U> {
    createData : (dataSpatial : T) => Promise<T>
    findFetchData: (idParam : number) => boolean;
    findFetch: () => Observable<T[]>;
    changeData: (dataSpatial : U) => boolean;
    deleteData: (idParam : number ) => boolean;

}
