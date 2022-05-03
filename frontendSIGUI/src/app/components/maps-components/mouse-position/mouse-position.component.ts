
import { Component, OnInit, Input, Renderer2 ,ElementRef,ChangeDetectionStrategy, Output , EventEmitter} from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { View } from 'ol';
import {Coordinate, format, createStringXY} from 'ol/coordinate';
import Map from 'ol/Map';
import ControlMousePosition from 'ol/control/MousePosition';
import { FormatterCoordinatesService } from '../../../services/formatter-coordinates.service';


@Component({
  selector: 'app-mouse-position',
  template: ``,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MousePositionComponent implements OnInit {

  @Input() map!: Map;
  @Input() positionTemplate!: string;
  control!: ControlMousePosition;

  constructor(private renderer : Renderer2, private elementRef: ElementRef,
    private coordinateFormatter: FormatterCoordinatesService) { }

  ngOnInit() {
    this.control = new ControlMousePosition({
      className: 'mouseposition-control',
      coordinateFormat: createStringXY(4),
      target: this.elementRef.nativeElement,
      undefinedHTML: undefined,
    });
    this.map.addControl(this.control);
  }
}
