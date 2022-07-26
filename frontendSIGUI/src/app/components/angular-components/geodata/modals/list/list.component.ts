import { Component, Input, OnInit } from '@angular/core';
import { SectionFiles } from 'src/app/models/section.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() folders!:SectionFiles[];
  //folders : SectionFiles[];

  constructor() { }

  ngOnInit(): void {
  }

  getFiles(section:SectionFiles){
    console.log(section);
  }

}
