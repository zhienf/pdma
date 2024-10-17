import { Component } from '@angular/core';
import { WeightPipe } from '../pipes/weight.pipe';
import { Package } from '../models/package';
import { DatabaseService } from '../database.service';
import io from 'socket.io-client';

@Component({
  selector: 'app-generative-ai',
  standalone: true,
  imports: [WeightPipe],
  templateUrl: './generative-ai.component.html',
  styleUrl: './generative-ai.component.css'
})
export class GenerativeAiComponent {

  socket: any;
  packages: Package[] = [];
  targetDestination: string = "";
  calculatedDistance: string = "";

  constructor(private db: DatabaseService) {
    // this.socket = io("ws://localhost:8080");
    this.socket = io("/");
  }

  ngOnInit() { 
    this.getPackages();
    this.socket.on('receiveDistance', (distance: string) => {
      this.calculatedDistance = distance;
    });
  }

  getPackages() {
    this.db.getPackages().subscribe((data: any) => {
      this.packages = data;
    });
  }

  getDistance(destination: string) {
    this.calculatedDistance = "";
    this.targetDestination = destination;
    this.socket.emit('getDistance', destination);
  }
}
