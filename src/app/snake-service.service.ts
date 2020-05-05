import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnakeServiceService {

  constructor() { }

  private snakePositionSubject = new Subject<any>();
  private snakePosition$: Observable<any> = this.snakePositionSubject.asObservable();
  private emitChangeSubject = new Subject<boolean>();
  private emitChange$: Observable<any> = this.emitChangeSubject.asObservable();
  getCurrentPosition(): Observable<any> {
    return this.snakePosition$;
}

emitCurrentPosition(value) {
    this.snakePositionSubject.next(value);
}

getChange(): Observable<any> {
  return this.emitChange$;
}
emitChange(value){
this.emitChangeSubject.next(value)
}
}
