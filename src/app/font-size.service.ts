import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FontSizeService {
  
  private dataSource = new Subject<any>();
  fontSize$ = this.dataSource.asObservable();
  sendData(data: any) {
    this.dataSource.next(data);
  }
  
}
