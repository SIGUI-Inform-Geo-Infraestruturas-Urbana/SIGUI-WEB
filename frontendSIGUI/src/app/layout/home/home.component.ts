import { Component , ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  @ViewChild('drawer',{static:false}) drawer!: ElementRef<HTMLElement>;
  isShowing: boolean = false;
  showFiller : boolean= false;
  title : string = 'SIGUI';
  imgCorLogo : string = '/assets/images/logotipo SIGUI.png';

  activeSideNav():void{
    console.log('dsadsad')
    this.isShowing= !this.isShowing;
   // this.drawer.nativeElement.toggle()
  }

}
