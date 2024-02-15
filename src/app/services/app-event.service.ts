// app-event.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppEventService {
  private articleChangeSubject = new Subject<void>();

  articleChanged = this.articleChangeSubject.asObservable();

  triggerArticleChange() {
    this.articleChangeSubject.next();
  }
}
