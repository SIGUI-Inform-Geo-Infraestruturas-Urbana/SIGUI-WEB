import { Component, OnInit, Input, Renderer2 ,ElementRef, Output , EventEmitter} from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { View } from 'ol';
import {Coordinate, format, createStringXY} from 'ol/coordinate';
import Map from 'ol/Map';
import ControlMousePosition from 'ol/control/MousePosition';
import { FormatterCoordinatesService } from '../../../services/formatter-coordinates.service';

@Component({
  selector: 'app-mouse-position-component',
  templateUrl: './mouse-position-component.component.html',
  styleUrls: ['./mouse-position-component.component.css']
})
export class MousePositionComponentComponent implements OnInit {

  @Input() map!: Map;
  @Input() positionTamplate!: string;
  control!: ControlMousePosition;

  constructor(private renderer : Renderer2, private elementRef: ElementRef,
    private coordinateFormatter: FormatterCoordinatesService) { }

    ngOnInit() {
      this.control = new ControlMousePosition({
       // coordinateFormat: createStringXY(2),
        target: this.renderer.selectRootElement(this.elementRef.nativeElement),
        undefinedHTML: undefined,
      });
      this.map.addControl(this.control);
    }

  /*ngOnInit(): void {
    this.control = new ControlMousePosition({
      className: 'mouseposition-control',
      coordinateFormat: function(coordinate:Coordinate) {
        return (format(coordinate, '{x}, {y}', 4))},
      /*  return this.coordinateFormatter.numberCoordinates(coordinates, 4, this.positionTamplate)
      },
    });
    this.map.addControl(this.control);*/

    /*(coordinate) => this.coordinateFormatter
        .numberCoordinates(coordinate, 4, this.positionTamplate),
        target: this.renderer.selectRootElement(this.elementRef.nativeElement), */
  //}
/* coordinateFormat: function(coordinate:number[]|) {
        return (format(coordinate, '{x}, {y}', 4))},
      /*  return this.coordinateFormatter.numberCoordinates(coordinates, 4, this.positionTamplate)
      },*/
      // coordinateFormat: this.coordinateFormatter
      //   .numberCoordinates(coordinates, 4, this.positionTamplate), */
}
