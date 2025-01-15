import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileCompanyRoutingModule } from './profile-company-routing.module';
import { ProfileCompanyComponent } from './profile-company.component';


@NgModule({
  declarations: [
    ProfileCompanyComponent
  ],
  imports: [
    CommonModule,
    ProfileCompanyRoutingModule
  ]
})
export class ProfileCompanyModule { }
