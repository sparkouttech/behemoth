import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from  '@angular/common/http';
import { StorageService } from '../services/storage.service';
import { ApiService } from '../services/api.service';
import { SuccessAlertComponent } from '../components/success-alert/success-alert.component';
import { GetScopeNameByIdPipe } from '../pipes/get-scope-name-by-id.pipe';


const modules: any[] = [
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
]

@NgModule({
  declarations: [
    SuccessAlertComponent,
    GetScopeNameByIdPipe
  ],
  imports: [
    CommonModule,
    ...modules
  ], 
  providers: [
    StorageService,
    ApiService
  ],
  exports: [
    ...modules,
    SuccessAlertComponent,
    GetScopeNameByIdPipe
  ]
}) 
export class SharedModule { }
