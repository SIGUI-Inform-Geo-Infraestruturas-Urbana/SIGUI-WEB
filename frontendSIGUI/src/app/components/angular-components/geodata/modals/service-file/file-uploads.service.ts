import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SectionFiles } from 'src/app/models/section.model';

@Injectable({
  providedIn: 'root'
})
export class FileUploadsService {

  dataChange = new BehaviorSubject<SectionFiles[]>([]);

  get data(): SectionFiles[] {
    return this.dataChange.value;
  }
  constructor() { }

  insertItem(parent: SectionFiles[]) {
      this.dataChange.next(parent);
    
  }

  updateItem(node: SectionFiles[]) {   
    this.dataChange.next(node);
  }

}
