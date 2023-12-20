import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { SwagDataService } from '../services/swag-data.service';
import { SwagChapter } from '../interfaces/swag-chapter';
import { SwagPage } from '../interfaces/swag-page';
import { MenuController } from '@ionic/angular'; //import MenuController to access toggle() method.

@Component({
  selector: 'app-swag-search',
  templateUrl: './swag-search.page.html',
  styleUrls: ['./swag-search.page.scss']
})
export class SwagSearchPage implements OnInit {
  
  searchTerm:string = "";
  
  allContentIndex:SwagChapter[] = [];
  
  // arrays for our filtered search results
  allPages: SwagPage[] = [];
  filteredSearchResults: SwagPage[] = [];
  finalSearchResults = [];
  
  constructor(
    public route:ActivatedRoute,
    private swagDataService: SwagDataService,
    private menuCtrl: MenuController,
  ) { }

  ngOnInit() {
    // getting the object passed by the router in our URL
    this.searchTerm = this.route.snapshot.paramMap.get('searchString');
    console.log("swag-search.page received "+this.searchTerm);
    
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
  
  // html stripper (vavoom!) https://dev.to/alvisonhunter/removing-html-tags-in-javascript-using-regex-9h3
  clearHTMLTags(strToSanitize) {
    let myHTML = new DOMParser()
      .parseFromString(strToSanitize, 'text/html');
      return myHTML.body.textContent || '';
  }
  
  checkForPagesData() {
    this.allPages = this.swagDataService.findPageData();
    if ( this.allPages.length > 0 ) {
      console.log("1 swag-search found loaded pages data and is gonna go ahead");
      this.executeSearch();
    } else {
      console.log("1 swag-search couldn't find loaded pages data and is waiting for swag-data.service to load them");
      // this.swagDataService.loadAllPages();
      this.swagDataService.pagesData$.subscribe(data => {
        this.allPages = data;
        console.log("3 swag-search waited for swag-data.service to load page data and got a return");
        this.executeSearch();
      })
    }
  }
  
  executeSearch() {
    console.log("swag-search.page.executeSearch() received "+this.searchTerm);
    
    this.menuCtrl.close();
    // empty our local array
    this.finalSearchResults = [];
    
    // stripping the html tags out before we search
    for (let h = 0; h < this.allPages.length; h++) {
      
      var filteredPage: SwagPage = {
          _id: this.allPages[h]._id,
          pageHtml: this.clearHTMLTags(this.allPages[h].pageHtml)
      }
      this.filteredSearchResults.push(filteredPage);
      
    }
    
    // finding the search term
    this.filteredSearchResults = this.filteredSearchResults.filter(
      swagPage => swagPage?.pageHtml.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    
    // trim our results
    for (let i = 0; i < this.filteredSearchResults.length; i++) {
        let searchString = this.filteredSearchResults[i].pageHtml;
        // Regular expression to identify HTML tags in
        // the input string. Replacing the identified
        // HTML tag with a null string.
        searchString = searchString.replace( /(<([^>]+)>)/ig, '');
        searchString = searchString.replace(/\s\s/g, "");
        // find how many times this terms appears
        let searchOccurs:number = searchString.split(this.searchTerm).length-1;
        // find a start and end point for our new string
        let sliceStart:number = searchString.toLowerCase().indexOf(this.searchTerm.toLowerCase()) - 10;
        if (sliceStart < 0 ) {
          sliceStart = 0
        };
        let sliceEnd:number = searchString.toLowerCase().indexOf(this.searchTerm.toLowerCase()) + this.searchTerm.length + 90;
        if (sliceEnd > searchString.length ) {
          sliceEnd = (searchString.length-2);
        };
        searchString = searchString.slice(sliceStart,sliceEnd);
        // add a space and styling around the search term
        // reusing these variables
        sliceStart = searchString.toLowerCase().indexOf(this.searchTerm.toLowerCase());
        sliceEnd = (searchString.toLowerCase().indexOf(this.searchTerm.toLowerCase()) + this.searchTerm.length);

        searchString = searchString.slice(0,sliceStart) 
        + "<span class='bg-danger'> "
        +searchString.slice(sliceStart,sliceEnd)
        +" </span>" 
        + searchString.slice(sliceEnd,(searchString.length));
        
        let formattedSearchResult:string = 
        // "<i>Found "+searchOccurs+" instances of "+this.searchTerm+" in:</i><br /> " +
        this.swagDataService.getSectionHeader( this.filteredSearchResults[i]._id ) + "<br />" +
        "<span class='search-body'>&quot;..."+searchString+"...&quot;</span>";
      
        this.finalSearchResults.push({ _id : "/swag-content/" + this.filteredSearchResults[i]._id, result: formattedSearchResult  });
        
    }
    
    // a catch for no results
    if (this.finalSearchResults.length == 0) {
      this.finalSearchResults.push({ _id : "/walkthrough", result: "There are no search results for <i>" +this.searchTerm + "</i>.<br /><span class='search-result'>Check your spelling or try another search term.</span>" });
      console.log(this.finalSearchResults[0]);
    }
    
  }
  

}
