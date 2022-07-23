import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';



const routes: Routes = [
  {
    path: 'private',
    canActivate:[AuthGuard],
    loadChildren: () => import('./private/private.module').then(m => m.PrivateModule),
   

  },
  {
    path: 'public',
    loadChildren: () => import('./public/public.module').then(m => m.PublicModule)

  }, {
    path: '**', //if theres no path redirect again to public
    redirectTo: 'public',  //public
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
