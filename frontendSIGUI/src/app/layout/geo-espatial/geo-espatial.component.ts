import { AfterViewInit, Component, OnInit , ViewChild} from '@angular/core';
import { OpenLayerComponent} from '../../components//maps-components/open-layer/open-layer.component'
import { Feature } from 'ol';

@Component({
  selector: 'app-geo-espatial',
  templateUrl: './geo-espatial.component.html',
  styleUrls: ['./geo-espatial.component.css']
})
export class GeoEspatialComponent implements OnInit {

  @ViewChild(OpenLayerComponent, {static:false})
  mapOpenLayer !: OpenLayerComponent;

  // featureSelect!:Feature;

  constructor() { }

  ngOnInit(): void {
  }

  getByIdState(id:number){
    this.mapOpenLayer.addGetByIdCounty(id);
  }
  getByIdCounty(id:number){
    this.mapOpenLayer.addGetByIdCounty(id);
  }
  getByIdDistrict(id:number){
    this.mapOpenLayer.addGetByIdCounty(id);
  }

}
