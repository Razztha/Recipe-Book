import { Directive,HostBinding,HostListener} from '@angular/core';

@Directive({
  selector: '[rbDropdown]'
})
export class DropdownDirective {

  @HostBinding('class.open') get opened()
  {
      return this.isOpen;
  }
private isOpen = false;

@HostListener('click') mouseClick()
{
  this.isOpen = true;
}
@HostListener('mouseleave') mouseLeave()
{
    this.isOpen = false;
}
  constructor() { }

}
