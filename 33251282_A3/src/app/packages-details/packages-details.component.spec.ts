import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagesDetailsComponent } from './packages-details.component';

describe('PackagesDetailsComponent', () => {
  let component: PackagesDetailsComponent;
  let fixture: ComponentFixture<PackagesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackagesDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackagesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
