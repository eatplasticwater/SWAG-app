import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SwagDataService } from '../services/swag-data.service';

@Component({
  selector: 'app-swag-index',
  templateUrl: './swag-index.page.html',
  styleUrls: ['./swag-index.page.scss', './swag-index.shell.scss']
})
export class SwagIndexPage implements OnInit {
  
  // an array for the menu
  allContentIndex = [];
  sectionIndex:number;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private swagDataService: SwagDataService
  ) {}
  
  ngOnInit(): void {
    
    console.log("swag-index.page initialized");
    
    // getting the object passed by the router in our URL, need the + to make it a number
    this.sectionIndex = +this.route.snapshot.paramMap.get('section');
    
    
    // checking for loaded data, if it's not there we subscribe to wait for it
    this.allContentIndex = this.swagDataService.findContentData();
    if ( this.allContentIndex.length > 0 ) {
      console.log("3 swag-index.page got loaded data from the swag-data.service ");
    } else {
      this.swagDataService.contentData$.subscribe(data => {
        this.allContentIndex = data;
        console.log("3 swag-index waited for swag-data.service to load data and got a return: "+this.allContentIndex);
      });
    }
     
  }
  
  

}