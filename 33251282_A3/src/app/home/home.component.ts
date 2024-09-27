import { Component } from '@angular/core';
import { Driver } from '../models/driver';
import { DatabaseService } from '../database.service';
import { Package } from '../models/package';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  drivers: Driver[] = [];
  packages: Package[] = [];

  constructor(private db: DatabaseService) {}

  ngOnInit() {
    this.db.getDrivers().subscribe((data: any) => {
      this.drivers = data;
    });

    this.db.getPackages().subscribe((data: any) => {
      this.packages = data;
    })
  }
}
