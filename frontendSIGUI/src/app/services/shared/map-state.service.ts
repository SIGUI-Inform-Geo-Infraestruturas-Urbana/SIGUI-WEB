import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

export interface Vertice {
  id: any;
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class MapStateService {
  private _vertice = new BehaviorSubject<Vertice[]>([]);
  readonly vertices$ = this._vertice.asObservable();

  private vertices:Vertice[] = [];
  private nextId = 0;
  constructor() { }

  create(item: Vertice){
    item.id = ++this.nextId;
    this.vertices.push(item);
    this._vertice.next(Object.assign([],this.vertices))
  }
  remove(id: number){//envia para os assinantes
    this.vertices.forEach((t,i) => {
      if(t.id === id){
        this.vertices.splice(i,1);
      }
      this._vertice.next(Object.assign([],this.vertices))
    })
  }
}
