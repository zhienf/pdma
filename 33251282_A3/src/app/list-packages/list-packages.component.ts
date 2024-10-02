import { Component } from '@angular/core';
import { Package } from '../models/package';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import { WeightPipe } from '../pipes/weight.pipe';
import { DeletePackageComponent } from '../delete-package/delete-package.component';
import { DatePipe } from '@angular/common';
import { Driver } from '../models/driver';
import { DriverDetailsComponent } from '../driver-details/driver-details.component';

@Component({
  selector: 'app-list-packages',
  standalone: true,
  imports: [WeightPipe, DatePipe, DeletePackageComponent, DriverDetailsComponent],
  templateUrl: './list-packages.component.html',
  styleUrl: './list-packages.component.css'
})
export class ListPackagesComponent {

  packages: Package[] = [];
  selectedDriver: Driver | undefined;
  selectedPackageId: string | undefined;

  constructor(private db: DatabaseService, private router: Router) {}

  ngOnInit() {
    this.getPackages();
  }

  getPackages() {
    this.db.getPackages().subscribe((data: any) => {
      this.packages = data;
    });
  }

  showDriverDetails(driver: Driver, packageId: string) {
    if (this.selectedPackageId === packageId) {
      // hide the driver details when clicked again
      this.selectedPackageId = undefined;
      this.selectedDriver = undefined;
    } else {
      this.selectedDriver = driver;
      this.selectedPackageId = packageId;
    }
  }
}
