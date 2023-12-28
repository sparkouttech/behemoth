import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-view-role',
  templateUrl: './view-role.component.html',
  styleUrls: ['./view-role.component.css']
})
export class ViewRoleComponent implements OnInit, OnChanges {
  
  @Input() role: any;
  
  constructor(private api: ApiService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.role) {
      this.role.scopes.forEach((scope: any) => {
        console.log(scope, 'inside oninit loop');
        
        this.api.GET(`scopes/${scope.scope}`).subscribe({
          next: (response: any) => {
            console.log({response: response.data.name});
            scope.name = response.data.name;
          }, 
          error: (error: any) => {
            return 'null';
          }
        });
      });
    }
  }


  ngOnInit(): void {
    
  }
  
}
