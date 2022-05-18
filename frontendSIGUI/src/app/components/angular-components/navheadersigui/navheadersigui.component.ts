import { Component, OnInit ,EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-navheadersigui',
  templateUrl: './navheadersigui.component.html',
  styleUrls: ['./navheadersigui.component.css']
})
export class NavheadersiguiComponent implements OnInit {
  @Output() ActiveSideNav: EventEmitter<string> = new EventEmitter();
  title = 'SIGUI';
  imgLogo = '/assets/images/logotipo_SIGUI_header.png';

  constructor() { }

  ngOnInit(): void {
  }
  onClickNav():void{ 
    this.ActiveSideNav.emit();
  }

}
