import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/registration', pathMatch: 'full' },
  { path: 'registration', loadChildren: () => import('./features/registration/registration.module').then(m => m.RegistrationModule) },
  { path: 'otp', loadChildren: () => import('./features/otp/otp.module').then(m => m.OtpModule) },
  { path: 'complete', loadChildren: () => import('./features/complete/complete.module').then(m => m.CompleteModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
