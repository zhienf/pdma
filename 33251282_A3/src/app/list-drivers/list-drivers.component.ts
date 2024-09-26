import { Component } from '@angular/core';
import { Driver } from '../models/driver';
import { DatabaseService } from '../database.service';
import { Router } from 'express';

@Component({
  selector: 'app-list-drivers',
  standalone: true,
  imports: [],
  templateUrl: './list-drivers.component.html',
  styleUrl: './list-drivers.component.css'
})
export class ListDriversComponent {

  drivers: Driver[] = [];

  constructor(private db: DatabaseService, private router: Router) {}

  ngOnInit() {
    this.db.getDrivers().subscribe((data: any) => {
      this.drivers = data;
    });
  }

  deleteDriver(id: string) {
    this.db.deleteDriver(id).subscribe((data: any) => {
      console.log(data);
    });
  }
}
