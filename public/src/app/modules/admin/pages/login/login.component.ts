import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public isShowError: boolean = false;
  public isLoading: boolean = false;
  public errorMessage: string = 'Exception occurs, Try again';
  public loginForm = new FormGroup({
    email:new FormControl('',[Validators.email,Validators.required]),
    password: new FormControl('',[Validators.required, Validators.minLength(8)])
  });

  constructor(private http: HttpClient, private storage: StorageService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm.valueChanges.subscribe((val) => {
      this.isShowError = false;
    });    
  }

  /**
   * login api call on user submits the form 
   */
  onSubmit() {
    this.isLoading = true;
    this.http.post(`${environment.API_BASE_URL}admin/login`, this.loginForm.value).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        this.storage.setItem('user', JSON.stringify(response.data));
        this.storage.setItem('admin', JSON.stringify(response.data));
        this.storage.setItem('is_admin', JSON.stringify(response.data));
        this.storage.setItem('token', response.data.authentication_token);
        this.router.navigate(['/admin/dashboard']);
      },
      error: (error: any) => {
        this.isLoading = false;
        this.isShowError = true;
        this.errorMessage = error?.error?.message || 'Exception occurs, try again';
      }
    })
  }
}



