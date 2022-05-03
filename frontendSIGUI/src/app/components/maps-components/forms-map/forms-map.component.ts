import { Component, OnInit, Input, Renderer2 ,ElementRef, Output , EventEmitter} from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-forms-map',
  templateUrl: './forms-map.component.html',
  styleUrls: ['./forms-map.component.css']
})
export class FormsMapComponent implements OnInit {

  //controlMapForm!: FormGroup;
  @Output() marcatorMap: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit():void{
    //console.log(this.controlMapForm.value)
  }
  pointMap():void{
    this.marcatorMap.emit(' ');
  }
}
