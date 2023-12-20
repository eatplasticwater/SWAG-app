import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { PagesIndex } from '../pages-index';
import { SafePipe } from '../safe.pipe';
import { SummaryPipe } from '../summary.pipe';
import { PreferencesService } from '../preferences.service';
import { FontSizeService } from '../font-size.service';
import { SwagDataService } from '../services/swag-data.service';
import { SwagPage } from '../interfaces/swag-page';
import { SwagChapter } from '../interfaces/swag-chapter';
import { MenuController, IonicSwiper } from '@ionic/angular';


@Component({
  selector: 'app-swag-content',
  templateUrl: './swag-content.page.html',
  styleUrls: ['./swag-content.page.scss', './swag-content.shell.scss'],
  providers: [ SafePipe, SummaryPipe ]
})

export class SwagContentPage implements OnInit {
    
    constructor(
      private preferencesService: PreferencesService,
      private safePipe: SafePipe,
      private summaryPipe: SummaryPipe,
      private router: Router, 
      private route: ActivatedRoute, 
      private fontSizeService: FontSizeService,
      public swagDataService: SwagDataService,
      public menu: MenuController
    ) {}
    
    @Input() updatedFontSize: string;
    pageContent: string;
    pageIndexFrRouter: string;
    allContentIndex = [];
    allPages = [];
    chapterIndex: number;
    sectionIndex: number;
    
    searchTerm:string = '';
     
    // variables for our text size prefs
    storedFontSize:string;
    fontSize:string;
    textSizePrefs:string;
    passedValue = '';
    
    async ngOnInit() {
      // ghetto hack to catch search terms
      
      this.router.events.subscribe((e: any) => {
        if (e.type == 15) {
          this.highlightSearchTerms();
        }
      });

      this.textPrefsCheck();
      
      this.fontSizeService.fontSize$.subscribe(fontSize => {
        this.textPrefsCheck();
      });
      
      // getting the object passed by the router in our URL
      this.pageIndexFrRouter = this.route.snapshot.paramMap.get('chapter');
      this.chapterIndex = +this.pageIndexFrRouter.charAt(0);
      var n = this.pageIndexFrRouter.lastIndexOf('-');
      this.sectionIndex = +this.pageIndexFrRouter.substring(n + 1) - 1;
      
      // getting the query string param from the router
      
      
      // checking for loaded page index data, if it's not there we subscribe to wait for it
      this.allContentIndex = this.swagDataService.findContentData();
      if ( this.allContentIndex.length > 0 ) {
        // we check for loaded page data
        this.checkForPagesData();
      } else {
        this.swagDataService.contentData$.subscribe(data => {
          this.allContentIndex = data;
          // we check for loaded page data
          this.checkForPagesData();
        });
      }
    }
    
    checkForPagesData() {
      this.allPages = this.swagDataService.findPageData();
      if ( this.allPages.length > 0 ) {
        console.log("1 swag-content.page found loaded pages data and is gonna go ahead");
        this.setPageContent();
      } else {
        console.log("1 swag-content.page couldn't find loaded pages data and is waiting for swag-data.service to load them");
        // this.swagDataService.loadAllPages();
        this.swagDataService.pagesData$.subscribe(data => {
          this.allPages = data;
          console.log("3 swag-content.page waited for swag-data.service to load page data and got a return");
          this.setPageContent();
        })
      }
    }
    
    setPageContent() {
      console.log("setPageContent()");
      this.pageContent = this.swagDataService.getPageContent(this.pageIndexFrRouter);
      if ( this.pageContent == undefined || this.pageContent == null ) {
        this.pageError();
      }
    }
    
    highlightSearchTerms() {
      // resetting to no highlight
      this.setPageContent();
      this.searchTerm = this.route.snapshot.queryParams['searchTerm'];
      // console.log("RESETTING this.searchTerm TO "+ this.searchTerm );
      
      //tried to do this in a pipe but couldn't get it to refresh consistently
      if (this.searchTerm != undefined && this.pageContent ) {
        
        // looks for anything between html tags and escape characters
        // (?![^<]*>) excludes matches that are in between <>
        // excludes matches preceded by an &
        let searchRegEx = new RegExp("(?![^<]*>)(?<!&)"+this.searchTerm, 'gi');
        this.pageContent = this.pageContent.replace(searchRegEx,(match) => `<span class="bg-danger">${match}</span>`);

      }
    }
    
    async textPrefsCheck() {
      
      if ( await this.preferencesService.getPrefs('storedFontSize') ) {
        this.fontSize = await this.preferencesService.getPrefs('storedFontSize');
        // console.log("Reading stored fontSize as: "+this.fontSize);
      } else {
        this.fontSize = "1rem";
        this.preferencesService.setPrefs('storedFontSize', "1rem");
        // console.log("No stored fontSize, setting default as 1rem");
      }
      
    }
    
    pageError() {
      console.log("ERROR - Page data undefined");
      this.pageContent = "<h1>ERROR: Page data undefined</h1>Please navigate to another page."
      // this.router.navigate(['/page-not-found']);
    }
    
}




