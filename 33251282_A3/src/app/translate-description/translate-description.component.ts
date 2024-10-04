import { Component } from '@angular/core';
import io from 'socket.io-client';
import { Package } from '../models/package';
import { DatabaseService } from '../database.service';
import { WeightPipe } from '../pipes/weight.pipe';
import { FormsModule } from '@angular/forms';
import { Translation } from '../models/translation';

@Component({
  selector: 'app-translate-description',
  standalone: true,
  imports: [WeightPipe, FormsModule],
  templateUrl: './translate-description.component.html',
  styleUrl: './translate-description.component.css'
})
export class TranslateDescriptionComponent {

  socket: any;
  packages: Package[] = [];
  languages: string[] = ["fr", "ru", "ja"];
  translations: Translation[] = [];
  targetDescription: Translation = new Translation();

  constructor(private db: DatabaseService) {
    this.socket = io("ws://localhost:8080");
  }

  ngOnInit() { 
    this.getPackages();
    this.socket.on('receiveTranslation', (translation: Translation) => {
      this.translations.push(translation);
    });
  }

  getPackages() {
    this.db.getPackages().subscribe((data: any) => {
      this.packages = data;
    });
  }

  getTranslation(description: string) {
    if (this.targetDescription.targetLanguage === "") {
      alert("Please select a target language");
      return;
    }
    this.targetDescription.originalText = description;
    this.socket.emit('getTranslation', this.targetDescription);
  }
}
