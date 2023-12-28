import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-scope',
  templateUrl: './scope.component.html',
  styleUrls: ['./scope.component.css'],
  providers: [DatePipe]
})
export class ScopeComponent implements OnInit {

  public scopes: any;

  constructor(private api: ApiService, private cdr: ChangeDetectorRef, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getScopesApi();
  }

  getScopesApi(url: string = `scopes?all=true`) {
    this.api.GET(url).subscribe({
      next: (response: any) => {
        console.log(response.data);
        this.scopes = response.data;
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.log(error);

      }
    })
  }

  onSearch(event: KeyboardEvent): void {
    const inputValue = (event.target as HTMLInputElement).value;
    if (inputValue) {
      this.getScopesApi(`scopes?all=true&search=${inputValue}`);
    } else {
      this.getScopesApi();
    }
  }
}
