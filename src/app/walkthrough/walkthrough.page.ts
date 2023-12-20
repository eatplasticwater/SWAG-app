import { Component, AfterViewInit, ViewChild, HostBinding, OnInit, NgZone } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { MenuController, IonicSwiper } from '@ionic/angular';
import SwiperCore, { Pagination } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

SwiperCore.use([Pagination, IonicSwiper]);

@Component({
  selector: 'app-walkthrough',
  templateUrl: './walkthrough.page.html',
  styleUrls: [
    './styles/walkthrough.page.scss',
    './styles/walkthrough.shell.scss',
    './styles/walkthrough.responsive.scss'
  ]
})
export class WalkthroughPage implements AfterViewInit, OnInit {
  swiperRef: SwiperCore;

  @ViewChild(SwiperComponent, { static: false }) swiper?: SwiperComponent;

  @HostBinding('class.first-slide-active') isFirstSlide = true;

  @HostBinding('class.last-slide-active') isLastSlide = false;

  constructor(
    public menu: MenuController,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    // save key to mark the walkthrough as visited so the next time the user visits the app, he would be redirected to log in
    Preferences.set({
      key: 'visitedWalkthrough',
      value: 'true'
    });
  }

  // Disable side menu for this page
  ionViewDidEnter(): void {
    // this.menu.enable(false);
  }

  // Restore to default when leaving this page
  ionViewDidLeave(): void {
    this.menu.enable(true);
  }

  ngAfterViewInit(): void {
    // Accessing slides in server platform throw errors
    this.swiperRef = this.swiper.swiperRef;

    this.swiperRef.on('slidesLengthChange', () => {
      // ? We need to use ngZone because the change happens outside Angular
      // (see: https://swiperjs.com/angular#swiper-component-events)
      this.ngZone.run(() => {
        this.markSlides(this.swiperRef);
      });
    });

    this.swiperRef.on('slideChange', () => {
      // ? We need to use ngZone because the change happens outside Angular
      // (see: https://swiperjs.com/angular#swiper-component-events)
      this.ngZone.run(() => {
        this.markSlides(this.swiperRef);
      });
    });
  }

  public setSwiperInstance(swiper: SwiperCore): void {
    // console.log('setSwiperInstance');
  }

  public swiperInit(): void {
    // console.log('swiperInit');
  }

  public slideWillChange(): void {
    // console.log('slideWillChange');
  }

  public markSlides(swiper: SwiperCore): void {
    this.isFirstSlide = (swiper.isBeginning || swiper.activeIndex === 0);
    this.isLastSlide = swiper.isEnd;
  }

  public skipWalkthrough(): void {
    // Skip to the last slide
    this.swiperRef.slideTo(this.swiperRef.slides.length - 1);
  }
}
