import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePackageComponent } from './update-package.component';

describe('UpdatePackageComponent', () => {
  let component: UpdatePackageComponent;
  let fixture: ComponentFixture<UpdatePackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePackageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
