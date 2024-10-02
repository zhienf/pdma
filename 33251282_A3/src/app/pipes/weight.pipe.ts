import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weight',
  standalone: true
})
export class WeightPipe implements PipeTransform {

  transform(value: number): String {
    if (isNaN(value)) {
      return '';
    };
  
    return (value * 1000) + 'g';
  }

}
