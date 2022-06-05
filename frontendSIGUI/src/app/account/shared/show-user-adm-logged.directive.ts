import { Directive, ElementRef, Renderer2 ,Input, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';

import { LoggedService } from './logged.service'

@Directive({
  selector: '[appShowUserAdmLogged]'
})
export class ShowUserAdmLoggedDirective implements OnInit, OnDestroy {

  @Input() reverserLogic = false;
  subscription!: Subscription;

  constructor(private el : ElementRef, private renderer: Renderer2, 
    private loggedService: LoggedService) { }

    ngOnInit(): void {
      const display = this.el.nativeElement.style.display;

      this.subscription = this.loggedService
          .getStatus()
          .subscribe(sub => { 
            console.log('tedfdsfdsfdsfdsfdssssssssssssssdsfdsfs')
            if(this.reverserLogic){
              sub = !sub;
              console.log('aaaaaaaaaaaaaaaaaaa')
            }
            console.log('bbbbbbbbbbbbbbbbbbbbbb')
            console.log(this.el.nativeElement)
            this.renderer.setStyle(this.el.nativeElement,'display',
                          sub ? display : 'none');
          })
    }
    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }
}
