import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Package } from '../models/package';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-package',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-package.component.html',
  styleUrl: './update-package.component.css'
})
export class UpdatePackageComponent {

  package: Package = new Package();

  constructor(private db: DatabaseService, private router: Router) {}

  updatePackage() {
    if (!this.package._id || !this.package.destination) {
      alert('Please fill in all the fields.');
      return;
    }
    
    const packageData = {
      package_id: this.package._id,
      package_destination: this.package.destination
    };

    this.db.updatePackage(packageData).subscribe({
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
