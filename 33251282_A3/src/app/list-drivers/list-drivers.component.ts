import { Component } from '@angular/core';
import { Driver } from '../models/driver';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { DeleteDriverComponent } from '../delete-driver/delete-driver.component';
import { Package } from '../models/package';
import { PackagesDetailsComponent } from '../packages-details/packages-details.component';
import { YesNoPipe } from '../pipes/yes-no.pipe';


@Component({
  selector: 'app-list-drivers',
  standalone: true,
  imports: [UpperCasePipe, DatePipe, YesNoPipe, DeleteDriverComponent, PackagesDetailsComponent],
  templateUrl: './list-drivers.component.html',
  styleUrl: './list-drivers.component.css'
})
export class ListDriversComponent {
  
  drivers: Driver[] = [];
  selectedPackages: Package[] | undefined;
  selectedDriverId: string | undefined;

  constructor(private db: DatabaseService, private router: Router) {}

  ngOnInit() {
    this.getDrivers();
  }

  getDrivers() {
    this.db.getDrivers().subscribe((data: any) => {
      this.drivers = data;
    });
  }

  showPackagesDetails(assignedPackages: Package[], driverId: string) {
    if (this.selectedDriverId === driverId) {
      // hide the driver details when clicked again
      this.selectedDriverId = undefined;
      this.selectedPackages = undefined;
    } else {
      this.selectedDriverId = driverId;
      this.selectedPackages = assignedPackages;
    }
  }
}
