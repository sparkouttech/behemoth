import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public users: any;

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    //
    this.getUsersApi();
  }

  getUsersApi() {
    this.api.GET(`users?all=true`).subscribe({
      next: (response: any) => {
        this.users = response.data;
      }, 
      error: (error: any) => {

      }
    })
  }

  trackByFn(index: number, item: any): string {
    return item._id; // Use a unique identifier for tracking
  }
}
