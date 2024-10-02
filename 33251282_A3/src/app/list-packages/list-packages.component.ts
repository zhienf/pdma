import { Component } from '@angular/core';
import { Package } from '../models/package';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import { WeightPipe } from '../pipes/weight.pipe';
import { DeletePackageComponent } from '../delete-package/delete-package.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list-packages',
  standalone: true,
  imports: [WeightPipe, DatePipe, DeletePackageComponent],
  templateUrl: './list-packages.component.html',
  styleUrl: './list-packages.component.css'
})
export class ListPackagesComponent {

  packages: Package[] = [];

  constructor(private db: DatabaseService, private router: Router) {}

  ngOnInit() {
    this.getPackages();
  }

  getPackages() {
    this.db.getPackages().subscribe((data: any) => {
      this.packages = data;
    });
  }
}
