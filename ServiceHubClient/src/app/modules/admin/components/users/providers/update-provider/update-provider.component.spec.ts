import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProviderComponent } from './update-provider.component';

describe('UpdateProviderComponent', () => {
  let component: UpdateProviderComponent;
  let fixture: ComponentFixture<UpdateProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateProviderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
