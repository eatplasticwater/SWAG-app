import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/walkthrough',
    pathMatch: 'full'
  },
  {
    path: 'swag-index',
    redirectTo: '/walkthrough',
    pathMatch: 'full'
  },
  {
    path: 'swag-index/:section',
    loadChildren: () => import('./swag-index/swag-index.module').then( m => m.SwagIndexPageModule)
  },
  {
    path: 'swag-content',
    redirectTo: '/walkthrough',
    pathMatch: 'full'
  },
  {
    path: 'swag-content/:chapter',
    loadChildren: () => import('./swag-content/swag-content.module').then( m => m.SwagContentPageModule)
  },
  {
    path: 'swag-search',
    redirectTo: '/walkthrough',
    pathMatch: 'full'
  },
  {
    path: 'swag-search/:searchString',
    loadChildren: () => import('./swag-search/swag-search.module').then( m => m.SwagSearchPageModule)
  },
  {
    path: 'walkthrough',
    loadChildren: () => import('./walkthrough/walkthrough.module').then(m => m.WalkthroughPageModule)
  },
  {
    path: 'app',
    redirectTo: '/walkthrough',
    pathMatch: 'full'
  },
  {
    path: 'page-not-found',
    loadChildren: () => import('./page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)
  },
  {
    path: '**',
    redirectTo: 'page-not-found'
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
