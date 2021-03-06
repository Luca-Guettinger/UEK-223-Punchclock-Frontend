import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Entry} from '../_model/Entry';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  constructor(private httpClient: HttpClient) {
  }

  public loadEntries(): Observable<Entry[]> {
    return this.httpClient.get<Entry[]>('http://localhost:8081/entries');
  }

  public saveEntry(entry: Entry): Observable<Entry> {
    return this.httpClient.post<Entry>('http://localhost:8081/entries', entry);
  }

  public editEntry(entry: Entry): Observable<Entry> {
    return this.httpClient.put<Entry>('http://localhost:8081/entries', {
      category: entry.category,
      checkOut: entry.checkOut,
      checkIn: entry.checkIn,
      id: entry.id
    });
  }

  public deleteEntry(id: number): Observable<any> {
    return this.httpClient.delete('http://localhost:8081/entries/' + id);
  }
}
