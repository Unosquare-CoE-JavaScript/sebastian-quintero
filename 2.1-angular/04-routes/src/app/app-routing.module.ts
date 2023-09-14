import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { IdlePreloadService } from './services/idle-preload.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./web/web.module').then((mod) => mod.WebModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((mod) => mod.DashboardModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: IdlePreloadService,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
