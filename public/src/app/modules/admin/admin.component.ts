import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  public showMenus: boolean = false;

  constructor(private router: Router) {
    // Subscribe to the router events to update the currentPath whenever the route changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.router.url == '/admin/login') {
          this.showMenus = false;
        } else {
          this.showMenus = true;
        }
      }
    });
  }
}
