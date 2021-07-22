import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertTimeDuration'
})
export class ConvertTimeDurationPipe implements PipeTransform {

  transform(value: number): string {
    const days = Math.floor(value / 1440);
    const hours = Math.floor(value % 1440 / 60);
    const minutes = value - days * 1440 - hours * 60;
    return days > 0 ?
      `${days}d ${hours}h ${minutes}m` :
      hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  }

}
