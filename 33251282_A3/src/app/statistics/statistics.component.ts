import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Statistics } from '../models/statistics';
import { Driver } from '../models/driver';
import { Package } from '../models/package';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent {
  
  stats: Statistics = new Statistics();
  drivers: Driver[] = [];
  packages: Package[] = [];

  constructor(private db: DatabaseService) {}

  ngOnInit() {
    this.getStats();
    this.getDrivers();
    this.getPackages();
  }

  getStats() {
    this.db.getStats().subscribe((data: any) => {
      this.stats = data;
    });
  }

  getDrivers() {
    this.db.getDrivers().subscribe((data: any) => {
      this.drivers = data;
    });
  }

  getPackages() {
    this.db.getPackages().subscribe((data: any) => {
      this.packages = data;
    });
  }
}
