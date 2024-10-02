import { Component, Input } from '@angular/core';
import { Package } from '../models/package';
import { YesNoPipe } from '../pipes/yes-no.pipe';

@Component({
  selector: 'app-packages-details',
  standalone: true,
  imports: [YesNoPipe],
  templateUrl: './packages-details.component.html',
  styleUrl: './packages-details.component.css'
})
export class PackagesDetailsComponent {

  @Input() packages: Package[] = [];

  constructor() {}
}
