import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontapp';
}
