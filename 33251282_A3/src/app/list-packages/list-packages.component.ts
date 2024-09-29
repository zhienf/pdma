import { Component } from '@angular/core';
import { Package } from '../models/package';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-packages',
  standalone: true,
  imports: [],
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

  deletePackage(id: string) {
    this.db.deletePackage(id).subscribe({
      next: (value: any) => {
        console.log(value);
        this.getPackages();
      },
      error: (err: any) => {
        console.error(err);
        this.router.navigate(['invalid-data']);
      }
    });
  }
}
