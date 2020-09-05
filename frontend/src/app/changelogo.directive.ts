import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appChangelogo]'
})
export class ChangelogoDirective {

  constructor(private Element: ElementRef) { 
    Element.nativeElement.src = "/assets/images.png";
    Element.nativeElement.width = "100";
    Element.nativeElement.alt = "Site Logo will goes here";
    Element.nativeElement.title = "Logo";
  }

}
