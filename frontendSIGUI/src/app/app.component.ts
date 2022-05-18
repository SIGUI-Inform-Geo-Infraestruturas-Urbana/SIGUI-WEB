import { Component , ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('drawer',{static:false}) drawer!: ElementRef<HTMLElement>;
  isShowing: boolean = false;
  showFiller = false;
  title = 'SIGUI';
  imgCorLogo = '/assets/images/logotipo SIGUI.png';

  activeSideNav():void{
    console.log('dsadsad')
    this.isShowing= !this.isShowing;
   // this.drawer.nativeElement.toggle()
  }
}
