import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagesIndex } from '../pages-index';
import { Page } from '../page';

@Injectable({
  providedIn: 'root'
})
export class GetPageService {
  
  public allPagesIndex: PagesIndex[]=[];

  constructor(
    private http: HttpClient
  ) { }  
  
  
  public loadPagesIndex(): Observable<PagesIndex[]> {
    return this.http.get<PagesIndex[]>('/assets/data/allPages.json');
  }
  
  public getPageContent( pageIndex: string ): Observable<any> {
    return this.http.get( pageIndex , { responseType: 'text' });
  } 
  
  getPageIndex( _id:string ) {
    
  }
  
}
