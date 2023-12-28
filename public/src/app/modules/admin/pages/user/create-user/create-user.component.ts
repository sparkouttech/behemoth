import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  public isShowError: boolean = false;
  public isLoading: boolean = false;
  public errorMessage: string = 'Exception occurs, Try again';
  public roles:any;
  public teams:any;
  public createUserForm = new FormGroup({
    name:new FormControl('',[Validators.required]),
    employee_id:new FormControl('',[Validators.required]),
    role_id:new FormControl('',[Validators.required]),
    team_id:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.email,Validators.required]),
    password: new FormControl('',[Validators.required, Validators.minLength(8)]),
    is_lead:new FormControl('',[]),
  });

  constructor(private api: ApiService, private storage: StorageService, private router: Router) { }

  ngOnInit(): void {
    this.createUserForm.valueChanges.subscribe((val) => {
      this.isShowError = false;
    });
    this.getRolesApi();
    this.getTeamsApi();
  }

  onSubmit() {
    this.isLoading = true;
    this.api.POST(`users`, this.createUserForm.value).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        this.storage.setItem('user', JSON.stringify(response.data));
        this.storage.setItem('admin', JSON.stringify(response.data));
        this.storage.setItem('is_admin', JSON.stringify(response.data));
        this.storage.setItem('token', response.data.authentication_token);
        this.router.navigate(['/admin/user']);
      },
      error: (error: any) => {
        this.isLoading = false;
        this.isShowError = true;
        this.errorMessage = error?.error?.message || 'Exception occurs, try again';
      }
    })
  }

  getRolesApi() {
    this.api.GET(`roles?all=true`).subscribe({
      next: (response: any) => {
        this.roles = response.data;
        console.log(this.roles);
        
      }, 
      error: (error: any) => {

      }
    })
  }

  getTeamsApi() {
    this.api.GET(`teams?all=true`).subscribe({
      next: (response: any) => {
        this.teams = response.data;
        console.log(this.teams);
        
      }, 
      error: (error: any) => {

      }
    })
  }
}
