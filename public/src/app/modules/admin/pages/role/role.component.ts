import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  public scopes: any;
  public roles: any;
  public showCreatedMessage: Boolean = false;
  public showError: Boolean = false;
  public activeRole: any;
  public alertMessage: any;
  public errorMessage: string = 'Exception occurs';

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getScopesApi();
    this.getRolesApi();
  }

  getScopesApi() {
    this.api.GET('scopes?all=true').subscribe({
      next: (response: any) => {
        console.log(response.data);
        this.scopes = response.data;
      }, 
      error: (error: any) => {
        this.showError = true;
        this.errorMessage = 'Unable to fetch scopes, try again';
      }
    })
  }

  getRolesApi() {
    this.api.GET('roles?all=true').subscribe({
      next: (response: any) => {
        console.log('roles', response.data);
        this.roles = response.data;
      }, 
      error: (error: any) => {
        this.showError = true;
        this.errorMessage = 'Unable to fetch roles, try again';
      }
    })
  }

  setActiveRole(role: any) {
    this.activeRole = role;
  }

  deleteRoleApi() {
    this.api.DELETE(`roles/${this.activeRole._id}`).subscribe({
      next: (response: any) => {
        this.alertMessage = 'Role deleted successfully';
        this.showCreatedMessage = true;
        this.getRolesApi();
        this.reload();
      }, 
      error: (error: any) => {
        this.showError = true;
        this.errorMessage = 'Unable to delete roles, try again';
      }
    })
  }

  eventFromAddRole(event: any) {
    this.getRolesApi();
    this.alertMessage = 'New Role created successfully';
    this.showCreatedMessage = true;
    this.reload();
  }

  reload() { 
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
}

