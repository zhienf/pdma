import { Component, Input } from '@angular/core';
import { Driver } from '../models/driver';
import { YesNoPipe } from '../pipes/yes-no.pipe';

@Component({
  selector: 'app-driver-details',
  standalone: true,
  imports: [YesNoPipe],
  templateUrl: './driver-details.component.html',
  styleUrl: './driver-details.component.css'
})
export class DriverDetailsComponent {

  @Input() driver: Driver = new Driver();

  constructor() {}
}
