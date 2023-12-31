import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateScopeComponent } from './create-scope.component';

describe('CreateScopeComponent', () => {
  let component: CreateScopeComponent;
  let fixture: ComponentFixture<CreateScopeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateScopeComponent]
    });
    fixture = TestBed.createComponent(CreateScopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
