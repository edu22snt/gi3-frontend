import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepasseHsFormComponent } from './repasse-hs-form.component';

describe('RepasseHsFormComponent', () => {
  let component: RepasseHsFormComponent;
  let fixture: ComponentFixture<RepasseHsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepasseHsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RepasseHsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
