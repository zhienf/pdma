import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Package } from '../models/package';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import { Driver } from '../models/driver';

@Component({
  selector: 'app-add-package',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-package.component.html',
  styleUrl: './add-package.component.css'
})
export class AddPackageComponent {

  package: Package = new Package();
  drivers: Driver[] = [];

  constructor(private db: DatabaseService, private router: Router) {}

  ngOnInit() {
    this.getDrivers();
  }

  getDrivers() {
    this.db.getDrivers().subscribe((data: any) => {
      this.drivers = data;
    });
  }

  addPackage() {
    if (!this.package.title || !this.package.weight || !this.package.destination || this.package.isAllocated === undefined || !this.package.driverId) {
      alert('Please fill in all the required fields.');
      return;
    }

    const packageData = {
      package_title: this.package.title,
      package_weight: this.package.weight,
      package_destination: this.package.destination,
      package_description: this.package.description,
      isAllocated: this.package.isAllocated,
      driver_id: this.package.driverId
    };

    this.db.createPackage(packageData).subscribe({
      next: (value: any) => {
        console.log(value);
        this.router.navigate(['list-packages']);
      },
      error: (err: any) => {
        console.error(err);
        this.router.navigate(['invalid-data']);
      }
    });
  }
}
