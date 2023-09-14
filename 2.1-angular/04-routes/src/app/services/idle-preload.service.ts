import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IdlePreloadService implements PreloadingStrategy {
  preload(route: Route, fn: () => Observable<any>): Observable<any> {
    return new Observable((observer) => {
      const handle = requestAnimationFrame(() => {
        fn()
          .pipe(catchError(() => of(null)))
          .subscribe(observer);
      });
      return () => cancelIdleCallback(handle);
    }).pipe(catchError(() => of(null)));
  }
}
