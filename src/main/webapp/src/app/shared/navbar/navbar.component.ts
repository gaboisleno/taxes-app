import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @Output() burgerClicked = new EventEmitter<any>();

  public onBurgerClicked() {
    this.burgerClicked.emit({});
  }
}
