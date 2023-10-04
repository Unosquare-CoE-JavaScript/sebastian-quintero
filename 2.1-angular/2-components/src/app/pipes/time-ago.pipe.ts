import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
})
export class TimeAgoPipe implements PipeTransform {
  relativeTimeFormatter = new Intl.RelativeTimeFormat('en', { style: 'short' });

  getSecondsDiff(date: Date) {
    return (Date.now() - date.getTime()) / 1000;
  }

  getTruncatedUnit(seconds: number) {
    let truncated;
    let unit: Intl.RelativeTimeFormatUnit;

    if (seconds < 60) {
      truncated = Math.floor(seconds);
      unit = 'second';
    } else if (seconds < 3600) {
      truncated = Math.floor(seconds / 60);
      unit = 'minute';
    } else if (seconds < 86400) {
      truncated = Math.floor(seconds / 3600);
      unit = 'hour';
    } else if (seconds < 604800) {
      truncated = Math.floor(seconds / 86400);
      unit = 'day';
    } else if (seconds < 2629800) {
      truncated = Math.floor(seconds / 604800);
      unit = 'week';
    } else if (seconds < 31556952) {
      truncated = Math.floor(seconds / 2629800);
      unit = 'month';
    } else {
      truncated = Math.floor(seconds / 31556952);
      unit = 'year';
    }

    return { truncated, unit };
  }

  transform(value: Date): string {
    const seconds = this.getSecondsDiff(value);
    const { truncated, unit } = this.getTruncatedUnit(seconds);
    return this.relativeTimeFormatter.format(truncated, unit);
  }
}
