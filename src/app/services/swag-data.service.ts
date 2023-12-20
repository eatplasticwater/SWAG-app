import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { SwagChapter } from '../interfaces/swag-chapter';
import { SwagPage } from '../interfaces/swag-page';

@Injectable({
  providedIn: 'root'
})

export class SwagDataService {
  
  private allContentIndex:SwagChapter[] = [];
  private allPages:SwagPage[] = [];
  
  // this is for the content index data
  private contentDataHolder = new Subject<any>;
  contentData$ = this.contentDataHolder.asObservable();
  
  // this is for the individual pages data
  private pagesDataHolder = new Subject<any>;
  pagesData$ = this.pagesDataHolder.asObservable();

  constructor(
    private http: HttpClient
  ) { }
  
  // this sends data to subscribers https://medium.com/fuzzy-code/how-to-pass-data-from-a-child-to-parent-component-using-shared-service-in-angular-7459b990db50
  public findContentData() {
    // first check to see if the content has already been loaded
    if ( this.allContentIndex.length > 0 ) {
      // console.log("2 swag-data.service found loaded data" );
      return this.allContentIndex;
    // couldn't find any loaded data, so send an empty array
    } else {
      // console.log("0 swag-data.service was checked for loaded data, couldn't find any, and is returning an empty array");
      return this.allContentIndex;
    }
  }
  
  // this sends data to subscribers https://medium.com/fuzzy-code/how-to-pass-data-from-a-child-to-parent-component-using-shared-service-in-angular-7459b990db50
  public findPageData() {
    // first check to see if the content has already been loaded
    if ( this.allPages.length > 0 ) {
      console.log("2 swag-data.service found loaded pages data" );
      return this.allPages;
    // couldn't find any loaded data, so send an empty array
    } else {
      console.log("0 swag-data.service was checked for loaded pages data, couldn't find any, and is returning an empty array");
      return this.allPages;
    }
  }
  
  
  sendContentData(contentData:any) {
    // console.log("2 swag-data.service got loaded data");
    // iterate over our data and send to our local array
    // this seems redundant
    for (let d = 0; d < contentData.length; d++) {
      this.allContentIndex.push(contentData[d]);
    }
    // this is for our subscribers 
    this.contentDataHolder.next(contentData);
  }
  
  public loadContentIndex( swagIndexPath:string ): Observable<any> {
    return this.http.get(swagIndexPath);
  }
  
  public loadAllPages() {
    console.log("2 swagDataService.loadAllPages is loading all of the page content ");
    // iterating through the chapters
    for (let c = 0; c < this.allContentIndex.length; c++) {
      // iterating through the sections
      for (let p = 0; p < this.allContentIndex[c].sections.length; p++) {
        this.loadPage(this.allContentIndex[c].sections[p]['_id'],c,p);
      }
    }
  }
  
  private loadPage(pageID:string,chapIndex:number,pageIndex:number) {
    this.http.get("./assets/data/html/"+ pageID +".html" , { responseType: 'text' } ).subscribe({
        next: pageData => {
          var page:SwagPage = {
            _id : pageID,
            pageHtml : pageData,
          }
          this.allPages.push(page); 
          
          // this is kinda ghetto
          if ( (chapIndex+1) == this.allContentIndex.length && (pageIndex+1) == this.allContentIndex[chapIndex].sections.length) {
            // console.log("CONDITION MET (chapIndex+1) "+(chapIndex+1)+" == this.allContentIndex.length "+this.allContentIndex.length+" AND");
            // console.log("(pageIndex+1) "+(pageIndex+1)+" == this.allContentIndex[chapIndex].sections.length  "+this.allContentIndex[chapIndex].sections.length );
            // console.log("swag-data.service thinks that "+this.allPages.length+" page data files have loaded");
            // this is for the subscribers
            this.sendPageData(this.allPages);
          }
         
        },
        error: error => {
            console.error("There was an error loading data from ./assets/data/html/"+ pageID +".html", error);
        }
    }) 
  }
  
  sendPageData(pageData:any) {
    // console.log("2 swag-data.service got loaded page data for "+pageData.length+" pages");
    // this is for our subscribers 
    this.pagesDataHolder.next(this.allPages);
  }
  
  public pushChaptersIndex( chap:SwagChapter ) {
    this.allContentIndex.push(chap);
  }
  
  public getPageContent( pageID: string ) {
    // console.log("swag-data.service is being asked for page  "+pageID);
    // iterating through the loaded files
    for (let h = 0; h < this.allPages.length; h++) {
      if ( this.allPages[h]._id ==  pageID) {
        return this.allPages[h].pageHtml;
      }
    }
  }
  
  public getSectionHeader( pageID: string ) {
    // iterating through the loaded files
    // iterating through the chapters
    for (let c = 0; c < this.allContentIndex.length; c++) {
      // iterating through the sections
      for (let p = 0; p < this.allContentIndex[c].sections.length; p++) {
        if ( pageID == this.allContentIndex[c].sections[p]['_id'] ) {
          return this.allContentIndex[c].sections[p]['section'];
        }
      }
    }
  }
  
  
}
