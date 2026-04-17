import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepasseHsComponent } from './repasse-hs.component';

describe('RepasseHsComponent', () => {
  let component: RepasseHsComponent;
  let fixture: ComponentFixture<RepasseHsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepasseHsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RepasseHsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
