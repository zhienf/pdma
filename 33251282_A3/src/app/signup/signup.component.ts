import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { User } from '../models/user';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  user: User = new User();

  constructor(private db: DatabaseService) {}

  signupUser() {
    this.db.signupUser(this.user).subscribe((data: any) => {
      console.log(data);
    })
  }
}
