import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import { Driver } from '../models/driver';

@Component({
  selector: 'app-update-driver',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-driver.component.html',
  styleUrl: './update-driver.component.css'
})
export class UpdateDriverComponent {

  driver: Driver = new Driver();
  departments = ['Food', 'Electronic', 'Furniture'];

  constructor(private db: DatabaseService, private router: Router) {}

  updateDriver() {
    if (!this.driver._id || !this.driver.licence || !this.driver.department) {
      this.router.navigate(['invalid-data']);
      return;
    }
    
    const driverData = {
      id: this.driver._id,
      driver_licence: this.driver.licence,
      driver_department: this.driver.department
    };

    this.db.updateDriver(driverData).subscribe({
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
