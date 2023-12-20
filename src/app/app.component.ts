import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { App, URLOpenListenerEvent } from '@capacitor/app';
import { Storage } from '@ionic/storage-angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { PagesIndex } from './pages-index';
import { PreferencesService } from './preferences.service';
import { FontSizeService } from './font-size.service';
import { SwagDataService } from './services/swag-data.service';
import { SwagChapter } from './interfaces/swag-chapter';
import { SwagPage } from './interfaces/swag-page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: [
    './side-menu/styles/side-menu.scss',
    './side-menu/styles/side-menu.shell.scss',
    './side-menu/styles/side-menu.responsive.scss'
  ]
})

export class AppComponent {
  // an array for the menu
  allContentIndex:SwagChapter[] = [];
  
  // arrays for our filtered search results
  allPages: SwagPage[] = [];
  filteredSearchResults: SwagPage[] = [];
  formattedSearchResult:string = "";
  finalSearchResults = [];
  
  
  // variables for our text size prefs
  storedFontSize:string;
  fontSize:string;
  textSizePrefs:string;
  contentURL: string;
  
  constructor(
    private preferencesService: PreferencesService,
    private router: Router,
    private zone: NgZone,
    private swagDataService: SwagDataService,
    private fontSizeService: FontSizeService,
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    
    this.textPrefsCheck();
    
    // the initial Content Index data load
    // I don't think I should be loading and parsing data here
    this.swagDataService.loadContentIndex("/assets/data/allContentIndex.json")
      .subscribe(swagIndexData => {
        
        // parse the Content Index data
        const keys = Object.keys(swagIndexData);
        // iterating over chapters
        for (let chap = 0; chap < swagIndexData.length; chap++) { 
          // getting chapter data
          var chapter:SwagChapter = {
            title: swagIndexData[chap].chapter.title,
            url: swagIndexData[chap].chapter.url,
            ionicIcon: swagIndexData[chap].chapter.ionicIcon,
            sections: swagIndexData[chap].chapter.sections,
          }
          this.allContentIndex.push(chapter);
        }
        this.swagDataService.sendContentData(this.allContentIndex);
        this.loadPagesData();
      })
      
  }
  
  loadPagesData() {
    // getting all of our page data for search
    if ( this.allPages.length > 0 ) {
        console.log("1 app-component.page found loaded pages data and is gonna go ahead");
        // populating our search array
        this.filteredSearchResults = this.allPages;
      } else {
        console.log("1 app-component.page couldn't find loaded pages data and is telling swag-data.service to load them");
        this.swagDataService.loadAllPages();
        this.swagDataService.pagesData$.subscribe(data => {
          console.log("3 app-component.page waited for swag-data.service to load page data and got a return");
          this.allPages = data;
          // populating our search array
          //console.log("!!! this.allPages.length = "+this.allPages.length);
          this.filteredSearchResults = this.allPages; 
        })
    }
  }
  
  textPrefsChange() {
    console.log("textSizePrefs changed to "+this.textSizePrefs);
    this.fontSize = this.textSizePrefs;
    this.preferencesService.setPrefs('storedFontSize', this.textSizePrefs);
    this.fontSizeService.sendData(this.textSizePrefs);
  }
  
  async textPrefsCheck() {
    if ( await this.preferencesService.getPrefs('storedFontSize') ) {
      this.fontSize = await this.preferencesService.getPrefs('storedFontSize');
    } 
  }
  
  // called by search bar
  search(searchTerm: string) {
    
    this.router.navigate(['/swag-search/'+searchTerm]);
    // this.router.navigate(['/swag-search/12']);
    
  }
  
}
