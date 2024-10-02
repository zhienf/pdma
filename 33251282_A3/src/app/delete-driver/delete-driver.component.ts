import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Input() id: string = '';
  @Output() onDelete: EventEmitter<void> = new EventEmitter<void>();

  constructor(private db: DatabaseService, private router: Router) {}

  deleteDriver() {
    console.log('deleteDriver');
    console.log(this.id);
    this.db.deleteDriver(this.id).subscribe({
      next: (value: any) => {
        console.log(value);
        this.onDelete.emit();
      },
      error: (err: any) => {
        console.error(err);
        this.router.navigate(['invalid-data']);
      }
    });
  }
}
