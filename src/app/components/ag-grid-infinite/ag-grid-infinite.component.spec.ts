import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridInfiniteComponent } from './ag-grid-infinite.component';

describe('AgGridInfiniteComponent', () => {
  let component: AgGridInfiniteComponent;
  let fixture: ComponentFixture<AgGridInfiniteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgGridInfiniteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgGridInfiniteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
