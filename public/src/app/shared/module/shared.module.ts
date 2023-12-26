import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from  '@angular/common/http';
import { StorageService } from '../services/storage.service';


const modules: any[] = [
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...modules
  ], 
  providers: [
    StorageService
  ],
  exports: [
    ...modules
  ]
})
export class SharedModule { }
