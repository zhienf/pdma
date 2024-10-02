import { Component, Input } from '@angular/core';
import { Driver } from '../models/driver';

@Component({
  selector: 'app-driver-details',
  standalone: true,
  imports: [],
  templateUrl: './driver-details.component.html',
  styleUrl: './driver-details.component.css'
})
export class DriverDetailsComponent {

  @Input() driver: Driver = new Driver();

  constructor() {}
}
