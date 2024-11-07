import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlTableComponent } from './url-table.component';

describe('UrlTableComponent', () => {
  let component: UrlTableComponent;
  let fixture: ComponentFixture<UrlTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UrlTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UrlTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
