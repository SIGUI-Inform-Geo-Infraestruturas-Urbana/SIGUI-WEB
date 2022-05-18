import { Component, OnInit, ChangeDetectionStrategy, Input, Renderer2, ElementRef } from '@angular/core';
import Map from 'ol/Map';
import ControlScaleLine from 'ol/control/ScaleLine';

@Component({
  selector: 'app-scaleline',
  template: ``,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScalelineComponent implements OnInit {
  @Input() map!: Map;
  control!: ControlScaleLine;

  constructor(private elementRef: ElementRef, private renderer : Renderer2) {}

  ngOnInit() {
    //const re = this.renderer.selectRootElement(this.elementRef.nativeElement)
    this.control = new ControlScaleLine({
      target: this.renderer.selectRootElement(this.elementRef.nativeElement)//this.elementRef.nativeElement,
    });
    this.map.addControl(this.control);
  }
}
