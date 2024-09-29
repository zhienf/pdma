import { Component } from '@angular/core';
import { Driver } from '../models/driver';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-driver',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-driver.component.html',
  styleUrl: './add-driver.component.css'
})
export class AddDriverComponent {
  
  driver: Driver = new Driver();
  departments = ['Food', 'Electronic', 'Furniture'];

  constructor(private db: DatabaseService, private router: Router) {}

  addDriver() {
    if (!this.driver.name || !this.driver.licence || !this.driver.department || this.driver.isActive === undefined) {
      alert('Please fill in all the fields.');
      return;
    }

    const driverData = {
      driver_name: this.driver.name,
      driver_department: this.driver.department,
      driver_licence: this.driver.licence,
      driver_isActive: this.driver.isActive
    };

    this.db.createDriver(driverData).subscribe({
      next: (value: any) => {
        console.log(value);
        this.router.navigate(['list-drivers']);
      },
      error: (err: any) => {
        console.error(err);
        this.router.navigate(['invalid-data']);
      }
    });
  }
}
