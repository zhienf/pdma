import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { User } from '../models/user';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  user: User = new User();

  constructor(private db: DatabaseService, private router: Router) {}

  signupUser() {
    if (this.user.username && this.user.password && this.user.confirmPassword) {
      this.db.signupUser(this.user).subscribe({
        next: (value: any) => {
          console.log(value);
          this.router.navigate(['login']);
        },
        error: (err: any) => {
          console.error(err);
          this.router.navigate(['invalid-data']);
        }
      });
    } else {
      this.router.navigate(['invalid-data']);
    }
  }
}
