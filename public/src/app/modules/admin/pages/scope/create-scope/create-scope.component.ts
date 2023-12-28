import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-create-scope',
  templateUrl: './create-scope.component.html',
  styleUrls: ['./create-scope.component.css']
})
export class CreateScopeComponent {

  public isShowError: boolean = false;
  public isLoading: boolean = false;
  public errorMessage: string = 'Exception occurs, Try again';
  public createScopeForm = new FormGroup({
    name:new FormControl('',[Validators.required]),
    path: new FormControl('',[Validators.required])
  });
  
  constructor(private http: HttpClient) { }
  
  /**
   * login api call on user submits the form 
   */
  onSubmit() {
    this.isLoading = true;
    this.http.post(`${environment.API_BASE_URL}scopes`, this.createScopeForm.value).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        console.log(response);
        window.location.reload();
      },
      error: (error: any) => {
        this.isLoading = false;
        this.isShowError = true;
        this.errorMessage = error?.error?.message;
      }
    })
  }
}
