import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.css']
})
export class TopHeaderComponent implements OnInit {

  title = 'SIGUI';
  imgLogo = '/assets/images/logotipo_SIGUI_header.png';

  constructor() { }

  ngOnInit(): void {
  }

}
