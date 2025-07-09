import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchTermSubject = new BehaviorSubject<string>(''); // Almacena el término actual
  searchTerm$ = this.searchTermSubject.asObservable(); // Observable para suscribirse

  updateSearchTerm(term: string) {
    this.searchTermSubject.next(term); // Emite el nuevo término
  }

  setSearchTerm(term: string) {
    this.searchTermSubject.next(term);
  }
}
