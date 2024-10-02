import { Component } from '@angular/core';
import { Driver } from '../models/driver';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { DeleteDriverComponent } from '../delete-driver/delete-driver.component';


@Component({
  selector: 'app-list-drivers',
  standalone: true,
  imports: [UpperCasePipe, DatePipe, DeleteDriverComponent],
  templateUrl: './list-drivers.component.html',
  styleUrl: './list-drivers.component.css'
})
export class ListDriversComponent {
  
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
}
