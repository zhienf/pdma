import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DatabaseService } from '../database.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  user: User = new User();

  constructor(private db: DatabaseService, private router: Router) {}

  loginUser() {
    if (this.user.username && this.user.password) {
      const userData = {
        username: this.user.username,
        password: this.user.password
      };
    
      this.db.loginUser(userData).subscribe({
        next: (value: any) => {
          console.log(value);
          this.router.navigate(['home']);
        },
        error: (err: any) => {
          console.error(err);
          this.router.navigate(['invalid-data']);
        }
      })
    } else {
      this.router.navigate(['invalid-data']);
    }
  }
}
