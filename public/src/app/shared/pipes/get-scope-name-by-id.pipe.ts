import { Pipe, PipeTransform } from '@angular/core';
import { ApiService } from '../services/api.service';

@Pipe({
  name: 'getScopeNameById'
})
export class GetScopeNameByIdPipe implements PipeTransform {

  constructor(private api: ApiService) { }

  name!: string;

  transform(value: unknown, ...args: unknown[]) {

    console.log(value, 'value on pipe');

    this.api.GET(`scopes/${value}`).subscribe({
      next: (response: any) => {
        console.log({response: response.data.name});
        this.name = response.data.name
        return response.data.name;

      }, 
      error: (error: any) => {
        return 'null';
      }
    });

    return this.name;
  }

}
