import { Injectable } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import {Coordinate, format} from 'ol/coordinate';
@Injectable({
  providedIn: 'root'
})
export class FormatterCoordinatesService {

  constructor(private decimalPipe: DecimalPipe) { }

  numberCoordinatesDeprecated(coordinates: number[], fractionDigits: number,template?: string)
  {
    template = template || '{x} {y}';
    const x = coordinates[0];
    const y = coordinates[1];
    const digitsInfo = `1.${fractionDigits}-${fractionDigits}`;
    const sX:string = String(this.decimalPipe.transform(x,digitsInfo));
    const sY = String(this.decimalPipe.transform(y,digitsInfo));
    return template.replace('{x}', sX).replace('{y}', sY);
  }

  numberCoordinates(coordinates: number[]|undefined, fractionDigits: number,template?: string):string
  {
    template = template || '{x}, {y}';
    //    let zoom:number|undefined = Number(view.getZoom());

   // let x:number|undefined = coordinates?.length;
   // let x:number = Number(coordinates?.length);
      // let v:number|undefined = coordinates?.[0];
      let v:number = Number(coordinates?.[0]);
      let v2:number = Number(coordinates?.[1]);

     // let n:number = Number(coordinates);
      let x:Coordinate = [v,v2]
      console.log(x)
    //const y = coordinates[1];
    let zoom:Number[]|undefined = (coordinates);
    return format(x,template,fractionDigits);
  }
}
