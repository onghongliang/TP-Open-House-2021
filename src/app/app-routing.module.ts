import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { KnowAbtYouGuard } from './guards/know-abt-you.guard';

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then( m => m.MainPageModule),
    canActivate: [KnowAbtYouGuard]
  },
  {
    path: 'guestmain',
    loadChildren: () => import('./pages/main/main.module').then( m => m.MainPageModule),
  },
  {
    path: '',
    redirectTo: 'intro-page',
    pathMatch: 'full'
  },
  {
    path: 'schedule',
    loadChildren: () => import('./pages/schedule/schedule.module').then( m => m.SchedulePageModule)
  },
  {
    path: 'courses',
    loadChildren: () => import('./pages/courses/courses.module').then( m => m.CoursesPageModule)
  },
  {
    path: 'makan-time',
    loadChildren: () => import('./pages/makan-time/makan-time.module').then( m => m.MakanTimePageModule)
  },
  {
    path: 'hunt-n-win',
    loadChildren: () => import('./pages/hunt-n-win/hunt-n-win.module').then( m => m.HuntNWinPageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./pages/map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'campus-tour',
    loadChildren: () => import('./pages/campus-tour/campus-tour.module').then( m => m.CampusTourPageModule)
  },
  {
    path: 'for-the-gram',
    loadChildren: () => import('./pages/for-the-gram/for-the-gram.module').then( m => m.ForTheGramPageModule)
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./pages/contact-us/contact-us.module').then( m => m.ContactUsPageModule)
  },
  {
    path: 'developers',
    loadChildren: () => import('./pages/developers/developers.module').then( m => m.DevelopersPageModule)
  },
  {
    path: 'gettin-there',
    loadChildren: () => import('./pages/gettin-there/gettin-there.module').then( m => m.GettinTherePageModule)
  },
  {
    path: 'what-else',
    loadChildren: () => import('./pages/what-else/what-else.module').then( m => m.WhatElsePageModule)
  },
  {
    path: 'c-by-school',
    loadChildren: () => import('./details/c-by-school/c-by-school.module').then( m => m.CBySchoolPageModule)
  },
  {
    path: 'c-search',
    loadChildren: () => import('./details/c-search/c-search.module').then( m => m.CSearchPageModule)
  },
  {
    path: 'c-details/:key',
    loadChildren: () => import('./details/c-details/c-details.module').then( m => m.CDetailsPageModule)
  },
  {
    path: 'dev-info',
    loadChildren: () => import('./modal/dev-info/dev-info.module').then( m => m.DevInfoPageModule)
  },
  {
    path: 'direction',
    loadChildren: () => import('./details/direction/direction.module').then( m => m.DirectionPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'resetpasswordemaillink',
    loadChildren: () => import('./pages/resetpasswordemaillink/resetpasswordemaillink.module').then( m => m.ResetpasswordemaillinkPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'favourites',
    loadChildren: () => import('./pages/favourites/favourites.module').then( m => m.FavouritesPageModule)
  },
  {
    path: 'leaderboard',
    loadChildren: () => import('./pages/leaderboard/leaderboard.module').then( m => m.LeaderboardPageModule)
  },
  {
    path: 'know-abt-you',
    loadChildren: () => import('./pages/know-abt-you/know-abt-you.module').then( m => m.KnowAbtYouPageModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./pages/faq/faq.module').then( m => m.FaqPageModule)
  },
  {
    path: 'faqdetails/:key',
    loadChildren: () => import('./pages/faqdetails/faqdetails.module').then( m => m.FaqdetailsPageModule)
  },
  {
    path: 'game-quiz',
    loadChildren: () => import('./modal/game-quiz/game-quiz.module').then( m => m.GameQuizPageModule)
  },
  {
    path: 'intro-page',
    loadChildren: () => import('./pages/intro-page/intro-page.module').then( m => m.IntroPagePageModule)
  },
  {
    path: 'ccalist',
    loadChildren: () => import('./pages/ccalist/ccalist.module').then( m => m.CcalistPageModule)
  },
  {
    path: 'categorycca',
    loadChildren: () => import('./pages/categorycca/categorycca.module').then( m => m.CategoryccaPageModule)
  },
  {
    path: 'detailscca/:key',
    loadChildren: () => import('./pages/detailscca/detailscca.module').then( m => m.DetailsccaPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/profile/setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./pages/main/notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'schedulenoti',
    loadChildren: () => import('./pages/schedule/saved-schedule/saved-schedule.module').then( m => m.SavedSchedulePageModule)
  },
  {
    path: 'saved-courses',
    loadChildren: () => import('./pages/courses/saved-courses/saved-courses.module').then( m => m.SavedCoursesPageModule)
  },
  {
    path: 'poly-webinar',
    loadChildren: () => import('./pages/poly-webinar/poly-webinar.module').then( m => m.PolyWebinarPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
