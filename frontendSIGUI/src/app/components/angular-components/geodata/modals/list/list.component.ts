import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FileData } from 'src/app/models/file-data.model';
import { SectionFiles } from 'src/app/models/section.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit , OnChanges{

  folders :FileData[]//SectionFiles[];
  @Input() foldersFiles!:FileData[];
  //folders : SectionFiles[];

  constructor() {
    this.folders = [];
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {

    console.log('alteradosssss')
    console.log(this.foldersFiles)
    for (const propName in changes ){
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'foldersFiles': {
           
            this.updateList(changes['foldersFiles'].currentValue)
          }
        }
      }
    }

  }

  updateList(value : FileData[]){
    this.folders = value;
  }

  getFiles(section:FileData){
    console.log(section);
  }

}
