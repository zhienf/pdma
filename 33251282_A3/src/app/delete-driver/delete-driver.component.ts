import { Component } from '@angular/core';
import { Driver } from '../models/driver';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-driver',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './delete-driver.component.html',
  styleUrl: './delete-driver.component.css'
})
export class DeleteDriverComponent {

  id: string = '';

  constructor(private db: DatabaseService, private router: Router) {}

  deleteDriver() {
    this.db.deleteDriver(this.id).subscribe({
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
