import { Component } from '@angular/core';
import { Driver } from '../models/driver';
import { DatabaseService } from '../database.service';
import io from 'socket.io-client';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-to-speech',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './text-to-speech.component.html',
  styleUrl: './text-to-speech.component.css'
})
export class TextToSpeechComponent {

  socket: any;
  drivers: Driver[] = [];
  targetText: string = "";
  textSpeech: string = "";

  constructor(private db: DatabaseService) {
    // this.socket = io("ws://localhost:8080");
    this.socket = io("/");
  }

  ngOnInit() { 
    this.getDrivers();
    this.socket.on('receiveSpeech', (speechFileName: string) => {
      const filePath = `/speech/${speechFileName}`;
      this.textSpeech = filePath;
    });
  }

  getDrivers() {
    this.db.getDrivers().subscribe((data: any) => {
      this.drivers = data;
    });
  }

  getTextToSpeech(text: string) {
    this.targetText = text;
    this.textSpeech = "";
    this.socket.emit('getSpeech', text);
  }
}
