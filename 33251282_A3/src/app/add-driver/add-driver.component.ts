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
    const driverData = {
      driver_name: this.driver.name,
      driver_department: this.driver.department,
      driver_licence: this.driver.licence,
      driver_isActive: this.driver.isActive
    };

    this.db.createDriver(driverData).subscribe((data: any) => {
      console.log(data);
      this.router.navigate(['list-drivers']);
    }) 
  }
}
