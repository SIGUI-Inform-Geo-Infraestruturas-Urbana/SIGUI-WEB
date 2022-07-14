import { Component , ViewChild, ElementRef, OnInit, HostListener} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public getScreenWidth: any;
  public getScreenHeight: any;

  constructor(){

  }

  ngOnInit(): void {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;

    console.log('************')
    console.log('width' + this.getScreenWidth);
    console.log('height' + this.getScreenHeight);
    console.log('************')
  }

  @HostListener('window:resize',['$event'])
  onWindowResize(){
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }
}
