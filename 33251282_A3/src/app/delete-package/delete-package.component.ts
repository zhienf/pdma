import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-package',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './delete-package.component.html',
  styleUrl: './delete-package.component.css'
})
export class DeletePackageComponent {

  id: string = '';

  constructor(private db: DatabaseService, private router: Router) {}

  deletePackage() {
    this.db.deletePackage(this.id).subscribe({
      next: (value: any) => {
        console.log(value);
        this.router.navigate(['list-packages']);
      },
      error: (err: any) => {
        console.error(err);
        this.router.navigate(['invalid-data']);
      }
    });
  }
}
