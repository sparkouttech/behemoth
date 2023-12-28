import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent implements OnInit {

  @Input() scopes: any;
  @ViewChild('closeCreateModelButton') closeButton!: ElementRef;

  public roleName: any;
  public nameRequiredError: boolean = false;
  public scopeParam: any = [];
  @Output() notifyRolePage: EventEmitter<void> = new EventEmitter<void>();

  callParentFunction(): void {
    this.notifyRolePage.emit();
  }

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.scopes.forEach((scope: any) => {
      this.scopeParam.push({scope: scope._id})
    });
  }

  onCheckboxClick(event: Event, scopeId: string, scopeType: string): void {
    this.scopeParam.forEach((param:any, index: any) => {
      if (param.scope == scopeId) {
        param[scopeType] = (event.target as HTMLInputElement).checked
      }
    });
  }

  onSubmit() {
    if (!this.roleName) {
      this.nameRequiredError = true;
    } else {
      // form validation success
      const requestBody: any = {
        name: this.roleName,
        scopes: this.scopeParam
      }

      this.api.POST('roles', requestBody).subscribe({
        next: (response: any) => {
          this.closeButton.nativeElement.click();
          this.notifyRolePage.emit();
        }, 
        error: (error: any) => {

        }
      })
    }
  }
}
