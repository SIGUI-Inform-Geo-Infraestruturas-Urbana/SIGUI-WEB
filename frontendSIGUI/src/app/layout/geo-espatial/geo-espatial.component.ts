import { AfterViewInit, Component, OnInit , ViewChild} from '@angular/core';
import { OpenLayerComponent} from '../../components//maps-components/open-layer/open-layer.component'
import { Feature } from 'ol';

@Component({
  selector: 'app-geo-espatial',
  templateUrl: './geo-espatial.component.html',
  styleUrls: ['./geo-espatial.component.css']
})
export class GeoEspatialComponent implements OnInit, AfterViewInit {

  @ViewChild(OpenLayerComponent, {static:false})
  mapOpenLayer !: OpenLayerComponent;

  featureSelect!:Feature;
    //
    panelOpenState!:boolean
    panelOpenAdFileMunicios!:boolean
    panelOpenAdMunicios!:boolean
    //



  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    
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
